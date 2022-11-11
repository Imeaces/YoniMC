import { Event, EventTypes, getIdentifierInfo } from "./EventTypes.js";

class EventSignalBuilder {
    
    #eventSignalClass = EventSignal;
    
    #idInfo = null;
    #eventType = null;
    
    #eventClass = null;
    
    #firebug = null;
    static defaultFirebug(callbacks /* Array<Object{callback: <Function>, filters: <Array> }> */, eventClass /* any */, eventValues/* Array[any] */){
        callbacks.forEach((f)=>{
            f(new eventClass(...eventValues));
        });
    }
    
    #filterResolver = null;
    static defaultFilterResolver(eventValue /* Array[any] */, filters, /* Array[any] */){
        return true;
    };
    
    constructor(identifier, eventSignalClass){
        if (identifier !== undefined){
            this.#idInfo = getIdentifierInfo(identifier);
        }
        if (eventSignalClass !== undefined){
            this.#eventSignalClass = eventSignalClass;
        }
    }
    id(identifier){
        if (this.#idInfo !== null){
            throw new Error("Already setup identifier");
        }
        this.#idInfo = getIdentifierInfo(identifier);
        return this;
    }
    identifier(){
        if (this.#idInfo !== null){
            throw new Error("Already setup identifier");
        }
        this.#idInfo = getIdentifierInfo(identifier);
        return this;
    }
    namespace(){
        if (this.#idInfo === null){
            throw new Error("Set a identifier first");
        }
        if (EventTypes.hasNamespace(n)){
            this.#idInfo.namespace = n;
        } else {
            throw new Error("Namespace not found");
        }
        return this;
    }
    eventClass(n){
        if (this.#eventType !== null){
            throw new Error("Already setup eventType, cannot setup others");
        }
        if (this.#eventClass !== null){
            throw new Error("Already setup eventClass");
        }
        this.#eventClass = n;
        return this;
    }
    eventType(n){
        if (this.#eventType !== null){
            throw new Error("Already setup eventType");
        }
        this.#eventType = n;
        return this;
    }
    filterResolver(n){
        if (this.#eventType !== null){
            throw new Error("Already setup eventType, cannot setup others");
        }
        if (this.#filterResolver !== null){
            throw new Error("Already setup filterResolver");
        }
        this.#filterResolver = n;
        return this;
    }
    build(){
        let idInfo = this.#idInfo;
        if (this.#idInfo === null){
            throw new Error("Build failed, require identifier to set");
        }
        let eventType = this.#eventType;
        let eventClass = this.#eventClass;
        let filterResolver  = this.#filterResolver;
        let firebug = this.#firebug;
        eventClass = (eventClass) ? eventClass : Event;
        filterResolver = (filterResolver) ? filterResolver : EventSignalBuilder.defaultFilterResolver;
        firebug = (firebug) ? firebug : EventSignalBuilder.defaultFirebug;
        
        let eventSignal;
        if (eventType === null)
            eventSignal = new this.#eventSignalClass({
                identifier: idInfo.id,
                eventClass,
                firebug,
                filterResolver
            });
        else
            eventSignal = new this.#eventSignalClass({
                eventType,
                identifier: idInfo.id
            });
        
        return eventSignal;
    }
}

export class EventSignal {
    static builder(identifier){
        return new EventSignalBuilder(identifier);
    }
    static getBuilder(identifier, eventSignalClass){
        return new EventSignalBuilder(identifier, eventSignalClass);
    }
    
    #onSubscribeCallbacks = [];
    #onUnsubscribeCallbacks = [];
    #whenFirstSubscribe = [];
    #whenLastUnsubscribe = [];
    
    #identifier;
    get identifier(){
        return this.#identifier;
    }
    
    get namespace(){
        return getIdentifierInfo(this.#identifier).namespace;
    }
    
    get eventName(){
        return getIdentifierInfo(this.#identifier).name;
    }
    
    constructor(options){
        let {
            identifier,
            eventClass,
            firebug,
            eventType,
            filterResolver
        } = options;
        this.#identifier = identifier;
        
        if (eventType !== undefined){
            this.subscribe = (...args)=>{
                eventType.subscribe(...args);
            };
            this.unsubscribe = (...args)=>{
                eventType.unsubscribe(...args);
            };
            return {
                eventSignal: this
            }
        }
        
        const fireEvent = (...args)=>{
            let callbacks = this.#callbacks.map(e=>{
                if (e.filters === undefined)
                    return e.callback;
                else if (filterResolver(args, e.filters))
                    return e.callback;
                else
                    return;
            });
            firebug(callbacks, eventClass, args);
            return rt;
        };
        const getCallbackCount = (...args)=>{
            return this.#callbacks.length;
        }
        const whenSubscribe = (callback)=>{
            this.#onSubscribeCallbacks.push(callback);
            return rt;
        };
        const whenUnsubscribe = (callback)=>{
            this.#onUnsubscribeCallbacks.push(callback);
            return rt;
        };
        const registerEvent = ()=>{
            EventTypes.register(identifier, this);
            return rt;
        };
        const unregisterEvent = ()=>{
            EventTypes.unregister(identifier);
            return rt;
        };
        const whenFirstSubscribe = (cb) =>{
            this.#whenFirstSubscribe.push(cb);
            return rt;
        };
        const whenLastUnsubscribe = (cb) =>{
            this.#whenLastUnsubscribe.push(cb);
            return rt;
        };
        const rt = {
            eventSignal: this,
            fireEvent,
            triggerEvent: fireEvent,
            getCallbackCount,
            whenSubscribe,
            whenUnsubscribe,
            registerEvent,
            unregisterEvent,
            whenFirstSubscribe,
            whenLastUnsubscribe
        }
        return rt;
    }
    
    #callbacks = [];
    
    subscribe(callback, ...filters){
        if (typeof callback !== "function")
            throw new Error("not a function in arguments[0]");
        
        if (filters.length === 1)
            this.#callbacks.push({callback, filters: filters[0]});
        else if (filters.length === 0)
            this.#callbacks.push({callback});
        else
            this.#callbacks.push({callback, filters});
        
        if (this.#callbacks.length === 1){
            this.#whenFirstSubscribe.forEach(f=>f(callback, filters));
        }
        this.#onSubscribeCallbacks.forEach(f=>f(callback, filters));
    }
    unsubscribe(callback){
        if (typeof callback !== "function")
            throw new Error("not a function in arguments[0]");
        
        this.#callbacks = this.#callbacks.filter((e)=>{
            if (e.callback === callback){
                return false;
            }
            return true;
        });
        
        if (this.#callbacks.length === 0){
            this.#whenLastUnsubscribe.forEach(f=>f(callback, filters));
        }
        this.#onUnsubscribeCallbacks.forEach(f=>f(callback));
    }
}
