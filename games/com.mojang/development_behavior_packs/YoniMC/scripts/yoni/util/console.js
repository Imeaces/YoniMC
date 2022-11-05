export function getErrorMsg(msg="", err=msg){
    let errMsg = "";
    if (err instanceof Error){
        errMsg += `${err.name}: ${err.message}`;
        if (err.stack !== undefined)
            errMsg += `\n${err.stack}`;
    } else {
        errMsg = String(err);
    }
    return { msg: msg, errMsg: errMsg };
}
export function printError(...args){
    let { msg, errMsg } = getErrorMsg(...args);
    console.error(msg+"\n"+errMsg);
}
/*
URIError
TypeError
SyntaxError
RangeError
ReferenceError
InternalError
EvalError
AggregateError*/