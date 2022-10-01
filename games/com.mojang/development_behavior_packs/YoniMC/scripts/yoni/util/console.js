export function printError(msg, err=""){
    let errMsg = "";
    if (err instanceof Error){
        errMsg += `${err.name}: ${err.message}`;
        if (err.stack !== undefined)
            errMsg += `\n${err.stack}`;
    } else if (err.constructor instanceof String){
        errMsg = err;
    } else if (err instanceof Object) {
        try { 
            errMsg += "\n" + JSON.stringify(err);
        } catch {
            errMsg = "未知错误";
        }
    }
    console.error(msg+"\n"+errMsg);
}
