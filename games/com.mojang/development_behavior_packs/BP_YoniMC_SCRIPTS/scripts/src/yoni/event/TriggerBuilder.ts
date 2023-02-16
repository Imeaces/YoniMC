// @ts-nocheck
import { Types, getIdentifierInfo } from "./Types.js";
import { Event } from "./Event.js";
import { EventTrigger } from "./Trigger.js";
import { EventSignal } from "./Signal.js";

class TriggerBuilder {
    
    #idInfo = null;
    constructor(identifier?){
        if (identifier !== undefined){
            this.#idInfo = getIdentifierInfo(identifier);
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
        if (Types.hasNamespace(n)){
            this.#idInfo.namespace = n;
        } else {
            throw new Error("Namespace not found");
        }
        return this;
    }
    
    #eventSignalClass = null;
    eventSignalClass(n){
        if (this.#eventSignalClass !== null){
            throw new Error("Already setup eventClass");
        }
        this.#eventSignalClass = n;
        return this;
    }
    
    #eventClass = null;
    eventClass(n){
        if (this.#eventClass !== null){
            throw new Error("Already setup eventClass");
        }
        this.#eventClass = n;
        return this;
    }
    
    #filterResolver = null;
    filterResolver(n){
        if (this.#filterResolver !== null){
            throw new Error("Already setup filterResolver");
        }
        this.#filterResolver = n;
        return this;
    }
    
    #firebug = null;
    firebug(n){
        if (this.#firebug !== null){
            throw new Error("Already setup firebug");
        }
        this.#firebug = n;
        return this;
    }
    
    #firebugAsync = null;
    firebugAsync(n){
        if (this.#firebugAsync !== null){
            throw new Error("Already setup firebugAsync");
        }
        this.#firebugAsync = n;
        return this;
    }
    
    #onSubscribeCallbacks = [];
    onSubscribe(n){
        this.#onSubscribeCallbacks.push(n);
        return this;
    }
    
    #onUnsubscribeCallbacks = [];
    onUnsubscribe(n){
        this.#onUnsubscribeCallbacks.push(n);
        return this;
    }
    
    #whenFirstSubscribeCallbacks = [];
    whenFirstSubscribe(n){
        this.#whenFirstSubscribeCallbacks.push(n);
        return this;
    }
    get onFirstSubscribe(){
        this.whenFirstSubscribe;
    }
    #whenLastUnsubscribeCallbacks = [];
    whenLastUnsubscribe(n){
        this.#whenLastUnsubscribeCallbacks.push(n);
        return this;
    }
    get onLastUnsubscribe(){
        this.whenLastUnsubscribe;
    }
    
    build(){
        let idInfo = this.#idInfo;
        if (idInfo === null){
            throw new Error("Build failed, require identifier to set");
        }
        let eventSignalClass = (null === this.#eventSignalClass) 
            ? EventSignal 
            : this.#eventSignalClass;
            
        let eventClass = (null === this.#eventClass)
            ? Event
            : this.#eventClass;
        
        let trigger = new EventTrigger(idInfo.id, eventSignalClass);
        
        trigger.eventClass = eventClass;
        trigger.signal = new eventSignalClass(idInfo.id, trigger);
        
        if (this.#filterResolver !== null)
            trigger.filterResolver = this.#filterResolver;
        
        if (this.#firebug !== null)
            trigger.firebug = this.#firebug;
        
        if (this.#firebugAsync !== null)
            trigger.firebugAsync = this.#firebug;
        
        if (this.#onSubscribeCallbacks.length !== 0){
            const callbacks = this.#onSubscribeCallbacks;
            trigger.onSubscribe = function (...args){
                callbacks.forEach(f => f(...args) );
            }
        }
        
        if (this.#onUnsubscribeCallbacks.length !== 0){
            const callbacks = this.#onUnsubscribeCallbacks;
            trigger.onUnsubscribe = function (...args){
                callbacks.forEach(f => f(...args) );
            }
        }
        
        if (this.#whenFirstSubscribeCallbacks.length !== 0){
            const callbacks = this.#whenFirstSubscribeCallbacks;
            trigger.whenFirstSubscribe = function (...args){
                callbacks.forEach(f => f(...args) );
            }
        }
        
        if (this.#whenLastUnsubscribeCallbacks.length !== 0){
            const callbacks = this.#whenLastUnsubscribeCallbacks;
            trigger.whenLastUnsubscribe = function (...args){
                callbacks.forEach(f => f(...args) );
            }
        }
        
        return trigger;
    }
}

export default TriggerBuilder;
export { TriggerBuilder };
export { TriggerBuilder as EventTriggerBuilder };
