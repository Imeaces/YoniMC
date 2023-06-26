import { isDebug } from "./config.js";
import { load } from "./loader.js";

export async function setDebugFunction(fn: (...args: any[]) => void, ...args: Parameters<typeof fn>){
  if (isDebug())
     fn(...args);
}

export async function runTaskIfDebug(callback: () => void){
    setDebugFunction(callback);
}

export { isDebug };

setDebugFunction(() => load("./debug_func.js"));
