import "scripts/WatchBird.js";
/*
import { say } from "scripts/yoni/util/yoni-lib.js";
import('scripts/main.js').catch((e=null)=>{
    let errMsg = "";
    if (e instanceof Error || e.name !== undefined){
        errMsg += `[${e.name}]: ${e.message}`;
        if (e.stack !== undefined)
            errMsg += `\n${e.stack}`;
    } else if (msg.constructor instanceof String){
        errMsg = e;
    } else {
        try { 
            errMsg = JSON.stringify(e);
        } catch {
            errMsg = `未知错误\n${e}\n${e.name}: ${e.message}\n${e.stack}`;
        }
    }
    say(errMsg);
});
*/
import('scripts/main.js');
