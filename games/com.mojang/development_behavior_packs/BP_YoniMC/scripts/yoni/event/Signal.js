import { getIdentifierInfo } from "./Types.js";

class Signal {
    #trigger;
    #callbacks = [];
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
    constructor(identifier, trigger){
        if (identifier){
            this.#identifier = getIdentifierInfo(identifier).id;
        }
        this.#trigger = trigger;
        trigger.getCallbacks = () =>{
            return Array.from(this.#callbacks);
        };
    }
    subscribe(callback, ...filters){
        if (typeof callback !== "function")
            throw new Error("not a function in arguments[0]");
        const trigger = this.#trigger;
        
        if (trigger.onSubscribe !== undefined)
            trigger.onSubscribe(callback, filters); //触发
        
        if (filters.length === 1)
            this.#callbacks.push({callback, filters: filters[0]});
        else if (filters.length === 0)
            this.#callbacks.push({callback});
        else
            this.#callbacks.push({callback, filters});
        
        if (this.#callbacks.length === 1
        && trigger.whenFirstSubscribe !== undefined){
            trigger.whenFirstSubscribe();
        }
    }
    unsubscribe(callback){
        if (typeof callback !== "function") //检查参数是否为函数
            throw new Error("not a function in arguments[0]");
        
        const trigger = this.#trigger;
        
        if (trigger.onUnsubscribe !== undefined)
            trigger.onUnsubscribe(callback); //触发
        
        this.#callbacks = this.#callbacks.filter((e)=>{ //找到回调中含有此函数的回调并删除
            if (e.callback === callback){
                return false;
            }
            return true;
        });
        
        if (this.#callbacks.length === 0
        && trigger.whenLastUnsubscribe !== undefined){
            trigger.whenLastUnsubscribe(); //触发
        }
        
    }
}
export default Signal;
export { Signal };
export { Signal as EventSignal };
