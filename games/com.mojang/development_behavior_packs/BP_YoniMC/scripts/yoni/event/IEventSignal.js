import { IEventTrigger } from "./IEventTrigger.js";

/**
 * @interface
 */
export class IEventSignal {
    
    /**
     * @param {string} identifier
     * @param {IEventTrigger} trigger
     */
    constructor(identifier, trigger){
        if (Object.getPrototypeOf(this) === IEventSignal.prototype){
            throw new TypeError("not implemented yet.");
        }
    }
    
    /**
     * 为事件添加指定的回调函数，并传入可选的过滤器
     * @param {(arg) => void} callback - 回调函数
     * @param {...any} filters
     * @returns {(arg) => void} 传入的回调函数
     */
    subscribe(callback, ...filters){
        throw new TypeError("not implemented yet.");
    }
    
    /**
     * 从订阅中移除指定的回调函数
     * @param {(arg) => void} callback - 指定的回调函数
     * @returns {(arg) => void}
     */
    unsubscribe(callback){
        throw new TypeError("not implemented yet.");
    }
}
