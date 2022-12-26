import { debug } from "./config.js";
import { load } from "./loader.js";

export async function runTaskIfDebug(callback){
    if (debug) callback();
}

export function isDebug(){
    return debug;
}


runTaskIfDebug(()=>load("./debug_func.js"));

289293n
9299191.929292m

29929292.9292929
91919
-28828292282