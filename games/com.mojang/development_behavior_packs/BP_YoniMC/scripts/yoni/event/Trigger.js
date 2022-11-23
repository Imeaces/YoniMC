import { Types, getIdentifierInfo } from "./Types.js";
import { Event, EventRemover } from "./Event.js";
import { runTask } from "yoni/basis.js";

async function callAsyncFunction(func, ...args){
    return func(...args);
}

class Trigger {
    
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
    
    signal;
    
    /**
     * 同步的事件回调
     * @param {Function[]} callbacks
     * @param {*} eventClass
     * @param {any[]} eventValues
     */
    firebug(callbacks, eventClass, eventValues){
        let proxy = Proxy.revocable(new eventClass(...eventValues), {});
        let event = proxy.proxy;
        runTask(proxy.revoke);
        callbacks.forEach(f => f(event) );
        proxy.revoke();
    }
    /**
     * 异步的事件回调
     * @param {AsyncFunction[]} callbacks
     * @param {*} eventClass
     * @param {any[]} eventValues
     */
    async firebugAsync(callbacks, eventClass, eventValues){
        return Promise.allSettled(
            callbacks.map(async (f)=>{
                let proxy = Proxy.revocable(new eventClass(...eventValues), {});
                let event = proxy.proxy;
                return callAsyncFunction(f, event)
                .finally(proxy.revoke);
            })
        );
    }
    
    getCallbacks(){
        return [];
    }
    
    /**
     * @param {any[]} eventValues
     * @param {any[]} filters
     * @return {boolean}
     */
    filterResolver(eventValues, filters){
        return true;
    };
    
    constructor(identifier, signal=null){
        this.#identifier = getIdentifierInfo(identifier).id;
        this.signal = signal;
    }
    
    getCallbacksByFilter(...args){
        return this.getCallbacks().map(e=>{
            if (e.filters === undefined)
                return e.callback;
            else if (this.filterResolver(args, e.filters))
                return e.callback;
            else
                return;
        }).filter(e => e !== undefined);
    }
    
    fireEvent(...args){
        let callbacks = this.getCallbacksByFilter(...args);
        this.firebug(callbacks, this.eventClass, args);
    };
    async fireEventAsync(...args){
        let callbacks = this.getCallbacksByFilter(...args);
        return this.firebugAsync(callbacks, this.eventClass, args);
    }
    get triggerEvent(){
        return this.fireEvent;
    }
    set triggerEvent(v){
        this.fireEvent = v;
    }
    get triggerEventAsync(){
        return this.fireEventAsync;
    }
    set triggerEventAsync(v){
        this.fireEventAsync = v;
    }
    
    registerEvent(){
        Types.register(this.identifier, this.signal);
        return this;
    }
    unregisterEvent(){
        Types.unregister(this.identifier);
        return this;
    }
    
    onSubscribe(){
    }
    onUnsubscribe(){
    }
    whenFirstSubscribe(){
    }
    whenLastUnsubscribe(){
    }
}

export default Trigger;
export { Trigger };
export { Trigger as EventTrigger };
