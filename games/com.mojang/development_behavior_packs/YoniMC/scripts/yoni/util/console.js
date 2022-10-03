export function getErrorMsg(msg="", err=msg){
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
    return { msg: msg, errMsg: errMsg };
}
export function printError(...args){
    let { msg, errMsg } = getErrorMsg(...args);
    console.error(msg+"\n"+errMsg);
}