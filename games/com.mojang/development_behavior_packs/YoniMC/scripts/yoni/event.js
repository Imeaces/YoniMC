import StatusCode from "scripts/yoni/StatusCode.js";
import { MinecraftEvents } from "scripts/basis.js";

export class EventListener {
    static #callbacks = [];
    
    /**
     * add a new callback function for specific event
     * @param {EventIdentity} caller - the event identify 
     * @param {Function} callback - callback function
     * @params args - any arguments you want, they will be transmitted directly 
     * @return {number} - id of the callback
     */
    static register(eventType, callback, ...eventFilters){
        let idx = this.#callbacks.push(callback);
        if (MinecraftEvents[eventType]) eventType = MinecraftEvents[eventType];
        eventType.subscribe((...args) => {
            let func = this.#callbacks[idx-1];
            if (func != null){
                try {
                    return func(...args);
                } catch(err){
                    console.error("尝试对事件进行ID为"+idx+"的回调时发生错误");
                    console.error(err.stack);
                }
            }
            return;
        }, ...eventFilters);
        return idx - 1;
    }
    
    static unregister(id){
        if (this.#callbacks[id] != null){
            this.#callbacks[id] = null;
            console.warning("移除了ID为"+(id+1)+"的回调");
        } else {
            for (let idx = 0; idx < this.#callbacks.length; idx++){
                if (this.#callbacks[idx] === id){
                    this.#callbacks[idx] = null;
                    console.warning("移除了ID为"+(idx+1)+"的回调");
                    break;
                }
            }
        }
    }
}
