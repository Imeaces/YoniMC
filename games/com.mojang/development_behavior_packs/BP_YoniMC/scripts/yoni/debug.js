import { debug } from "./config.js";

export function runTaskIfDebug(callback){
    if (debug) callback();
}

export function isDebug(){
    return debug;
}


//导入debug用函数
import("./debug_func.js");
