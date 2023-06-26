import { IEventTrigger } from "./IEventTrigger.js";

export interface IEventSignal {
    
    /**
     * 为事件添加指定的回调函数，并传入可选的过滤器
     * @param {(arg: any[]) => void} callback - 回调函数
     * @param {...any} [filters]
     * @returns {(arg: any[]) => void} 传入的回调函数。
     */
    subscribe(
        callback: (arg: any[]) => void,
        ...filters: any[]
    ): (arg: any[]) => void;
    
    /**
     * 从订阅中移除指定的回调函数
     * @param callback - 指定的回调函数
     */
    unsubscribe(callback: (arg: any[]) => void): void;
}
