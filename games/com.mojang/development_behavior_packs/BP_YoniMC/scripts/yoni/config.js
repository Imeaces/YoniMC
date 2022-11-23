export const debug = true;
export const logLevel = 5;
//是否输出到ContentLog
export const outputContentLog = true;

//是否覆盖默认的console
export const overrideDefaultConsole = true;

export function isDebug(){
    return debug;
}

//导入debug用函数
if (debug)
    import("./debug.js");
