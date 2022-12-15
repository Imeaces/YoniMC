import { Types, getIdentifierInfo } from "./Types.js";
import { Event } from "./Event.js";
import { runTask } from "yoni/basis.js";

async function callAsyncFunction(func, ...args){
    return func(...args);
}

/**
 * @interface
 */
class Trigger {
    
    constructor(identifier, signal=null){
        this.#identifier = getIdentifierInfo(identifier).id;
        this.signal = signal;
    }
    
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
    
    getCallbacks;
    
    /**
     * 同步的事件回调
     * @param {Function[]} callbacks
     * @param {*} eventClass
     * @param {any[]} eventValues
     */
    firebug(callbacks, eventClass, eventValues){
        let proxy = Proxy.revocable(new eventClass(...eventValues), {
            get(t, k){
                let v = t[k];
                if ("function" === typeof v){
                    return function proxyCallFunction(...args){ return t[k](...args); };
                } else {
                    return v;
                }
            }
        });
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
    
    /**
     * @param {any[]} eventValues
     * @param {any[]|any} filters
     * @return {boolean}
     */
    filterResolver(eventValues, filters){
        return true;
    };
    
    getCallbacksByFilter(...args){
        return this.getCallbacks().filter(e=>{
            if (e.filters === undefined)
                return true;
            else if (this.filterResolver(args, e.filters))
                return true;
            else
                return false;
        }).map(e => e.callback );
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
    
    defineCallbacksGetter(getter){
        this.getCallbacks = getter;
    }
}

export default Trigger;
export { Trigger };
export { Trigger as EventTrigger };
