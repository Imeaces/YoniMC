import {World, Commands} from "Minecraft";

// var Callback = {
//     callbacks: [],
//     addCallback(name, func) {
//         !this.callbacks[name] && (this.callbacks[name] = []);
//         this.callbacks[name].push(func);
//     },
//     invokeCallback(name, ...args) {
//         if (!this.callbacks[name])
//             return;
//         for (let func in this.callbacks[name]) {
//             try {
//                 this.callbacks[name][func](...args);
//             } catch (error) {
//                 Commands.run(`say §4ERROR: §r${JSON.stringify(error).replace(/\[|\]/g, "")}`);
//             }
//         }
//     }
// }

var Callback = (function (){
    let callbacks = [];
    /**
     * @param {string} name 
     * @param {(...args:any) => void} func
     */
    function addCallback(name, func) {
        callbacks[name] && callbacks[name].push(func) || (callbacks[name] = [func]);
    }
    /**
     * @param {string} name 
     * @param {(...args:any) => void} [func] 
     */
    function removeCallback(name, func) {
        if (!func) return callbacks[name] = null;
        callbacks[name].forEach((hl, i, arr) => {
            if(hl == func) arr[i] = null;
        });
    }
    function invokeCallback(name, ...args) {
        if (!callbacks[name]) return;
        for (const callback of callbacks[name]) {
            try {
                callback(...args);
            } catch (er) {
                Commands.run(`say §4ERROR: §r${JSON.stringify(er).replace(/\[|\]/g, "")}`);
            }
        }
    }
    return {
        addCallback, removeCallback, invokeCallback
    }
})();

const events = ["beforeChat", "beforeExplosion", "beforePistonActivate", "blockExplode", "chat", "effectAdd", "entityCreate", "explosion", "pistonActivate", "tick", "weatherChange"];
events.forEach(event => World.events[event] && World.events[event].subscribe((eventData) => Callback.invokeCallback(event, eventData)));

export {Callback};