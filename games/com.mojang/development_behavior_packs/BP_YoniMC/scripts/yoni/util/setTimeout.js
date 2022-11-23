import { runTask } from "yoni/basis.js";

export function setTimeout(callback, timeMs, ...args){
    let time = timeMs / 50;
    let resolve;
    let reject;
    let promise = new Promise ((re, rj)=>{
        resolve = re;
        reject = rj;
    });
    let tick;
    if (typeof callback === "function"){
        promise.then(()=>callback(...args));
        if (isNaN(time) || time < 1){
            resolve();
            return promise;
        }
    } else if (typeof callback === "string"){
        promise.then(()=>{
            let geval = eval;
            return geval(callback);
        });
        if (isNaN(time) || time < 1){
            resolve();
            return promise;
        }
    } else {
        throw new TypeError("not a function");
    }
    tick = ()=>{
        time -= 1;
        if (time < 1){
            resolve();
        } else {
            runTask(tick);
        }
    };
    runTask(tick);
    return promise;
}
export default setTimeout;

//如果你需要的话
globalThis.setTimeout = setTimeout;
