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
export const formatStr = {
    black: "§0",
    dark_blue: "§1",
    dark_green: "§2",
    dark_aqua: "§3",
    dark_red: "§4",
    dark_purple: "§5",
    gold: "§6",
    gray: "§7",
    dark_gray: "§8",
    blue: "§9",
    green: "§a",
    aqua: "§b",
    red: "§c",
    light_purple: "§d",
    yellow: "§e",
    white: "§f",
    minecoin_gold: "§g",
    obfuscated: "§k",
    bold: "§l",
    italic: "§o",
    reset: "§r",
    unknownVal: "§c[unknown]",
};
export function visualizeFunction(func){
}
export function visualizeValue(any){
}
export function visualizeObject(object){
    let str = "";
    try {
        let keys = Object.keys(object);
        let entries = keys.map(k => {
            let keyStr = ((typeof k === "symbol") ? `[${k.toString()}]` : key);
            let valStr = "";
            try {
                valStr = visualizeValue(object[k]);
            } catch {
                valStr = "§c[unknown]§r";
            }
            return `${keyStr}: ${valStr}`;
        });
    } catch {
        str = "§f{§r §c[unknown]§r §f}§r";
    }
}
export function visualizeError(){
}
export function visualizeArray(){
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
