export function printError(msg, err=""){
    let errMsg = "";
    if (msg instanceof Error || err.name !== undefined){
        errMsg += `[${msg.name}]: ${msg.message}`;
        if (msg.stack !== undefined)
            errMsg += `\n${msg.stack}`;
    } else if (msg.constructor instanceof String){
        errMsg = msg;
    } else {
        try { 
            errMsg = JSON.stringify(err);
        } catch {
            errMsg = "";
        }
    }
    console.error(errMsg);
}
