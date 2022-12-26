import { debug } from "../config.js";
import { Logger } from "../util/Logger.js";

import { EventTypes, EventRegisterListener, getIdentifierInfo } from "./Types.js";

const logger = new Logger("Event");
/**
 * 事件监听管理
 * 不建议移除事件，由于移除事件的机制为设空回调，导致移除事件并不是真正的移除，大量移除事件导致事件遗留，可能影响性能
 * 可能会在以后优化
 */

class Listener {
    static #callbacks = [];
    static #index = 0;
    
    //这个方法不推荐使用，但是调试用起来是很方便
    static _getCallback(id){
        if (debug)
            return this.#callbacks[id];
    }
    
    //static #callbackInterrupttedCount = (debug) ? new Map() : undefined;
    /*
    static #checkIsFireInterrupted(oid){
        if (oid !== -1){
            if (debug){
                let s = this.#callbackInterrupttedCount.get(oid);
                s = (s !== undefined) ? s+1 : 1;
                this.#callbackInterrupttedCount.set(oid, s);
                logger.warning("在回调{}时意外终止，已发生{}次", oid, s);
            } else {
                logger.warning("在回调时意外终止");
            }
        }
    }
    static #fireingCallbackId = -1;
    */
    static #fireCallback(id, ...args){
        //this.#checkIsFireInterrupted(this.#fireingCallbackId);
        let func = this.#callbacks[id];
        if (func === null){
            return;
        }
        //this.#fireingCallbackId = id;
        if (Object.prototype.toString.call(func) === "[object AsyncFunction]"){
            func(...args)
                .then(()=>{
                    logger.trace("完成了ID为 {} 的事件异步回调", id);
                })
                .catch((err)=>{
                    logger.error("尝试对事件进行ID为 {} 的异步回调时发生错误 {}", id, err);
                });
            //this.#fireingCallbackId = -1;
            return;
        }
        try {
            return func(...args);
        } catch(err){
            logger.error("尝试对事件进行ID为 {} 的回调时发生错误 {}", id, err);
        }
        //this.#fireingCallbackId = -1;
        return;
    }
    
    static #delayRegister(idx, eventType, callback, ...eventFilters){
        let idInfo = getIdentifierInfo(eventType);
        let eventName = idInfo.id;
        EventRegisterListener.add(idInfo.id, async ()=>{
            eventType = EventTypes.get(eventType);
            this.#doDelayRegister({
                eventName, idx,
                args: [ idx, eventType, callback, eventFilters]
            });
        });
        return idx;
    }
    
    static #doDelayRegister(options){
        let { eventName, idx, args } = options;
        try {
            this.#doRegister(...args);
            logger.debug("已完成对事件{}的回调{}的注册", eventName, idx);
        } catch {
            logger.error("未能完成对事件{}的延迟注册回调{}", eventName, idx);
        }
    }
    
    static #doRegister(idx, eventType, callback, ...eventFilters){
        if (!(eventType?.subscribe instanceof Function)){
            const error = new Error("require a subscribe() to register event");
            logger.error("在注册id为{}的回调时发生错误 {}", idx, error);
            throw error;
        }
        if (!(callback instanceof Function)){
            const error = new TypeError("not a function");
            logger.error("在注册id为{}的回调时发生错误 {}", idx, error);
            throw error;
        }
        let fireCallback = (...args) => {
            this.#fireCallback(idx, ...args);
        };
        try {
            this.#callbacks[idx] = callback;
            eventType.subscribe(fireCallback, ...eventFilters);
            //logger.trace("已成功注册id为{}的回调", idx);
        } catch (e){
            this.#callbacks[idx] = null;
            logger.error("在注册id为{}的回调时发生错误 {}", idx, e);
            throw e;
        }
    }
    
    /**
     * add a new callback function for specific event
     * @param {EventIdentity} caller - the event identify 
     * @param {Function} callback - callback function
     * @params args - any arguments you want, they will be transmitted directly 
     * @return {number} - id of the callback
     */
    static register(eventType, callback, ...eventFilters){
        let idx = this.#index;
        
        if (eventType?.constructor === String){
            if (EventTypes.has(eventType)){
                eventType = EventTypes.get(eventType);
            } else {
                logger.debug("延迟id为{}的{}事件注册", this.#index, eventType);
                this.#delayRegister(this.#index, eventType, callback, ...eventFilters);
                return this.#index ++;
            }
        }
        
        this.#doRegister(idx, eventType, callback, ...eventFilters);

        return this.#index ++;
    }
    
    static unregister(id){
        if (this.#callbacks[id] !== null){
            this.#callbacks[id] = null;
            logger.debug("移除了ID为{}的回调", id);
        } else {
            let idx = this.#callbacks.indexOf(id);
            if (idx !== -1){
                this.#callbacks[idx] = null;
                logger.debug("移除了ID为{}的回调", idx);
            }
        }
    }
}

export default Listener;
export {
    Listener,
    Listener as EventListener
};