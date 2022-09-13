import { VanillaEvents as MinecraftEvents } from "scripts/yoni/basis.js";

export class Events {
}

export class EventListener {
    static #callbacks = [];
    
    //这个方法不推荐使用，但是用起来是很方便
    static _getCallback(id){
        return this.#callbacks[id];
    }
    
    /**
     * add a new callback function for specific event
     * @param {EventIdentity} caller - the event identify 
     * @param {Function} callback - callback function
     * @params args - any arguments you want, they will be transmitted directly 
     * @return {number} - id of the callback
     */
    static register(eventType, callback, ...eventFilters){
        let idx = this.#callbacks.push(callback);
        
        if (Events[eventType]) eventType = Events[eventType];
        else if (MinecraftEvents[eventType]) eventType = MinecraftEvents[eventType];
        
        eventType.subscribe((...args) => {
            let func = this.#callbacks[idx-1];
            if (func != null){
                try {
                    return func(...args);
                } catch(err){
                    console.error("尝试对事件进行ID为"+idx+"的回调时发生错误");
                    console.error(err.name+": "+err.message+"\n"+err.stack);
                }
            }
            return;
        }, ...eventFilters);
        return idx - 1;
    }
    
    static unregister(id){
        if (this.#callbacks[id] != null){
            this.#callbacks[id] = null;
            console.warn("移除了ID为"+(id+1)+"的回调");
        } else {
            for (let idx = 0; idx < this.#callbacks.length; idx++){
                if (this.#callbacks[idx] === id){
                    this.#callbacks[idx] = null;
                    console.warn("移除了ID为"+(idx+1)+"的回调");
                    break;
                }
            }
        }
    }
}
