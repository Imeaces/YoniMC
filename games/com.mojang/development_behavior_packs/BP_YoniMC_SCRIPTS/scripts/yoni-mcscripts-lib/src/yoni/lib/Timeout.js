
let cfid = 1;
const taskMap = new Map();

/**
 * @param {()=>void} func
 * @param {number} delay
 * @param {...any} [args]
 * @returns {number} timeoutId
 */
export function setTimeout(func, delay=0, ...args){
    if (typeof func !== "function")
        throw new TypeError("not a function in arguments[0]");
    const fid = cfid++;
    taskMap.set(fid, func);
    countTimeAndRun(fid, delay, args);
    return fid;
}

/**
 * @param {number} timeoutId
 */
export function clearTimeout(timeoutId){
    taskMap.delete(timeoutId);
}

/**
 * @param {()=>void} func
 * @param {number} delay
 * @param {...any} [args]
 * @returns {number} intervalId
 */
export function setInterval(func, delay=4, ...args){
    if (typeof func !== "function")
        throw new TypeError("not a function in arguments[0]");
    if (delay < 4) throw new Error("delay below 4 is not allowed");
    const fid = cfid++;
    taskMap.set(fid, func);
    countIntervalTimeAndRun(fid, delay, args).catch(printError);
    return fid;
}
/**
 * @param {number} intervalId
 */
export function clearInterval(intervalId){
    taskMap.delete(intervalId);
}

async function hasTask(fid){
    return taskMap.has(fid);
}
function getTimeMs(){
    return Date.now();
}
async function countTimeAndRun(fid, i, args){
    const startTime = Date.now();
    while (await hasTask(fid)){
        const currentTime = getTimeMs();
        let f = null;
        if (currentTime - startTime >= i
        || currentTime < startTime){
            f = taskMap.get(fid);
            clearTimeout(fid);
        }
        if (f){
            f(...args);
            return;
        }
    }
}
async function countIntervalTimeAndRun(fid, i, args){
    const startTime = Date.now();
    while (await hasTask(fid)){
        const currentTime = getTimeMs();
        let f = null;
        if (currentTime - startTime >= i
        || currentTime < startTime){
            countIntervalTimeAndRun(fid, i, args).catch(printError);
            f = taskMap.get(fid);
        }
        if (f){
            f(...args);
            return;
        }
    }
}
let printError = (()=>{
    let printFunc;
    if (console.error){
        printFunc = async (e) =>
            console.error(`${e.name}: ${e.message}\n${e.stack}`);
    } else if (console.log){
        printFunc = async (e) =>
            console.log(`${e.name}: ${e.message}\n${e.stack}`);
    } else if (print){
        printFunc = async (e) =>
            print(`${e.name}: ${e.message}\n${e.stack}`);
    } else {
        printFunc = async () => {};
    }
    return printFunc;
})();
