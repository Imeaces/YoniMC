import { debug } from "./config.js";
import { load } from "./loader.js";

export async function runTaskIfDebug(callback){
    if (debug) callback();
}

export function isDebug(){
    return debug;
}


runTaskIfDebug(()=>load("./debug_func.js"));
