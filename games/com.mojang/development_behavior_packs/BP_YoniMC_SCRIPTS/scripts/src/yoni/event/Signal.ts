// @ts-nocheck
import { getIdentifierInfo } from "./Types.js";
import { IEventTrigger } from "./IEventTrigger.js";
import { IEventSignal } from "./IEventSignal.js";
import { Trigger } from "./Trigger.js";
import { EventCallbacks } from "./Event.js";

class Signal implements IEventSignal {
    #trigger: IEventTrigger | Trigger;
    #callbacks = [];
    #identifier: string;
    
    get identifier(): string {
        return this.#identifier;
    }
    
    get namespace(): string{
        return getIdentifierInfo(this.#identifier).namespace;
    }
    
    get eventName(): string{
        return getIdentifierInfo(this.#identifier).name;
    }
    
    constructor(identifier, trigger: IEventTrigger | Trigger){
        if (identifier){
            this.#identifier = getIdentifierInfo(identifier).id;
        }
        this.#trigger = trigger;
        trigger.getCallbacks = (()=>{
            const f = () => this.#callbacks;
            return function getCallbacks(){
                if (this !== trigger){
                    throw new Error("invalid access");
                }
                return f();
            }
        })();
    }
    
    subscribe(callback, ...filters){
        if (typeof callback !== "function")
            throw new Error("not a function in arguments[0]");
        const trigger = this.#trigger;
        
        if ("onSubscribe" in trigger)
            // @ts-ignore
            trigger.onSubscribe(callback, filters); //触发
        
        if (filters.length === 1)
            this.#callbacks.push({callback, filters: filters[0]});
        else if (filters.length === 0)
            this.#callbacks.push({callback});
        else
            this.#callbacks.push({callback, filters});
        
        if (this.#callbacks.length === 1
        && "whenFirstSubscribe" in trigger){
            // @ts-ignore
            trigger.whenFirstSubscribe();
        }
        
        return callback;
    }
    
    unsubscribe(callback){
        if (typeof callback !== "function") //检查参数是否为函数
            throw new Error("not a function in arguments[0]");
        
        const trigger = this.#trigger;
        
        if ("onUnsubscribe" in trigger)
            // @ts-ignore
            trigger.onUnsubscribe(callback); //触发
        
        this.#callbacks = this.#callbacks.filter((e)=>{ //找到回调中含有此函数的回调并删除
            return e.callback !== callback;
        });
        
        if (this.#callbacks.length === 0
        && "whenLastUnsubscribe" in trigger){
            // @ts-ignore
            trigger.whenLastUnsubscribe(); //触发
        }
        
        return callback;
    }
}

export default Signal;
export { Signal };
export { Signal as EventSignal };
