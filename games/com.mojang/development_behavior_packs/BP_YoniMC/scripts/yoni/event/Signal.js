import { getIdentifierInfo } from "./Types.js";

/**
 * @interface
 * @typedef IEventSignal
 * @property {(callback: (arg) => void, options?: any) => (arg) => void} subscribe
 * @property {(callback: (arg) => void) => (arg) => void} unsubscribe
 */

/**
 * @typedef {Array<{callback: EventCallback, filter?: any}>} EventCallbacks
 */

/**
 * @impletments IEventSignal
 */
class Signal {
    /**
     * @type {IEventSignalTrigger}
     */
    #trigger;
    /**
     * @type {EventCallbacks}
     */
    #callbacks = [];
    /**
     * @type {string}
     */
    #identifier;
    
    /**
     * @returns {string}
     */
    get identifier(){
        return this.#identifier;
    }
    
    /**
     * @returns {string}
     */
    get namespace(){
        return getIdentifierInfo(this.#identifier).namespace;
    }
    
    /**
     * @returns {string}
     */
    get eventName(){
        return getIdentifierInfo(this.#identifier).name;
    }
    
    /**
     * @param {string} identifier
     * @param {IEventSignalTrigger} trigger
     */
    constructor(identifier, trigger){
        if (identifier){
            this.#identifier = getIdentifierInfo(identifier).id;
        }
        this.#trigger = trigger;
        trigger.defineCallbacksGetter(function getCallbacks(){
            if (this !== trigger){
                throw new Error("invalid access");
            }
            return Array.from(this.#callbacks);
        });
    }
    
    /**
     * 为事件添加指定的回调函数，并传入可选的过滤器
     * @param {(arg) => void} callback - 回调函数
     * @param {...any} filters
     * @returns {(arg) => void} 传入的回调函数
     */
    subscribe(callback, ...filters){
        if (typeof callback !== "function")
            throw new Error("not a function in arguments[0]");
        const trigger = this.#trigger;
        
        if ("onSubscribe" in trigger.onSubscribe)
            trigger.onSubscribe(callback, filters); //触发
        
        if (filters.length === 1)
            this.#callbacks.push({callback, filters: filters[0]});
        else if (filters.length === 0)
            this.#callbacks.push({callback});
        else
            this.#callbacks.push({callback, filters});
        
        if (this.#callbacks.length === 1
        && "whenFirstSubscribe" in trigger){
            trigger.whenFirstSubscribe();
        }
        
        return callback;
    }
    
    /**
     * 从订阅中移除指定的回调函数
     * @param {(arg) => void} callback - 指定的回调函数
     * @returns {(arg) => void}
     */
    unsubscribe(callback){
        if (typeof callback !== "function") //检查参数是否为函数
            throw new Error("not a function in arguments[0]");
        
        const trigger = this.#trigger;
        
        if ("onUnsubscribe" in trigger)
            trigger.onUnsubscribe(callback); //触发
        
        this.#callbacks = this.#callbacks.filter((e)=>{ //找到回调中含有此函数的回调并删除
            return e.callback !== callback;
        });
        
        if (this.#callbacks.length === 0
        && "whenLastUnsubscribe" in trigger){
            trigger.whenLastUnsubscribe(); //触发
        }
        
        return callback;
    }
}
export default Signal;
export { Signal };
export { Signal as EventSignal };
