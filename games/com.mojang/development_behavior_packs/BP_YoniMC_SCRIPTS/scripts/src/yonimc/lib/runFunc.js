import { Logger } from "yoni-mcscripts-lib";

const logger = new Logger();

export function runFunc(func, ...args){
    try {
        return func(...args);
    }
    catch (e) {
        logger.error("[{}]: {}", func.name, e);
    }
}

export function runFuncAsync(func, ...args){
    return (async function(){
        return func(...args);
    })()
    .catch((e)=>{ logger.error("[{}]: {}", func.name, e); });
}


export function makeFunc(func, ...args){
    return function f(){
        return runFunc(func, ...args);
    }
}

export function makeAsyncFunc(func, ...args){
    return async function f(){
        return await runFuncAsync(func, ...args);
    }
}
