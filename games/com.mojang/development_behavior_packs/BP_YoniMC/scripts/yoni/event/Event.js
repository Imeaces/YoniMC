import { YoniScheduler } from "yoni/schedule.js";

class Event {
    constructor(...values){
        if (values.length !== 0){
            values.forEach((vals)=>{
                for (let key in vals){
                    Object.defineProperty(this, key, {
                        configurable: false,
                        enumerable: false,
                        get: function (){
                            return vals[key];
                            
                        },
                        set: function (val){
                            vals[key] = val;
                        }
                    });
                }
            });
        }
    }
}

const objectToDestroy = [];
const objectWillDestroy = [];
const revokeCallbacks = new Map();

YoniScheduler.runCycleTickTask(()=>{
    if (objectToDestroy.length !== 0){
        let arr = Array.from(objectToDestroy);
        objectToDestroy.length = 0;
        arr.forEach(obj=>{
            let f = revokeCallbacks.get(obj);
            revokeCallbacks.delete(obj);
            f();
        });
    }
    if (objectWillDestroy.length !== 0){
        objectToDestroy.push.apply(objectToDestroy, objectWillDestroy);
        objectWillDestroy.length = 0;
    }
}, 0, 0, false);

const EventRemover = (e)=>{
    let proxyOpt = Proxy.revocable(e, {
        get: (t, k)=>{
            let v = t[k];
            if (typeof v === "function"){
                return (...args)=>{ t[k](...args); };
            } else {
                return v;
            }
        },
        set: (t, k, v)=>{
            t[k] = v;
            return true;
        }
    });
    objectWillDestroy.push(proxyOpt.proxy);
    revokeCallbacks.set(proxyOpt.proxy, proxyOpt.revoke);
    return proxyOpt.proxy;
}

export {
    Event,
    EventRemover
}