import { VanillaWorld } from "yoni/basis.js";
import { getErrorMsg } from "./console.js";
import { Command } from "yoni/command.js";
import { dealWithCmd } from "yoni/lib/utils.js";

import {
    outputContentLog,
    debug,
    logLevel as configLogLevel,
    overrideDefaultConsole
} from "yoni/config.js";

async function send(receiver, message){
    let rawtext = JSON.stringify({rawtext:[{translate: String(message)}]}, dealWithCmd)
    Command.addExecute(Command.PRIORITY_HIGH, receiver, `tellraw @s ${rawtext}`);
}

let isNoticeLoggerUsage = false;

let specificTag = "yoni:console";

let outputToConsole = (()=>{
    const console = globalThis.console;
    return function (...args){
        console.warn(...args);
    };
})();

export let logLevel = configLogLevel;

function getTimeString(){
    let now = new Date();
    let H = now.getHours();
    let M = now.getMinutes();
    let S = now.getSeconds();
    let MS = now.getMilliseconds();
    
    let str = "";
    for (let s of [H, M, S]){
        if (str!=="") str+=":";
        str += ("00"+s).substring((""+s).length);
    }
    str += "." + (MS+"00").slice(0, 3);
    return str;
}

const levels = {
    0: "FATAL",
    1: "ERROR",
    2: "WARNING",
    3: "INFO",
    4: "DEBUG",
    5: "TRACE",
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
    f: "fatal",
    e: "error",
    w: "warn",
    i: "info",
    d: "debug",
    t: "trace",
    warning: "warn",
    err: "error",
    fail: "error",
    ex: "error",
    notice: "warn",
    log: "info",
    severe: "error"
}

function getLevelName(level=4){
    let c = 0;
    let o = level;
    while (level in levels || isFinite(level)){
        if (c++ > 5){
            return o;
        }
        level = levels[level];
    }
    return level;
}

function getLevelCode(level="debug"){
    let c = 0;
    while (!isFinite(level)){
        if (c++ > 5){
            return 6;
        }
        level = levels[level];
    }
    return level;
}

function transferHolder(msg, ...replacer){
    replacer.forEach((r)=>{
        msg = msg.replace(/\{\}/, getErrorMsg(r).errMsg);
    });
    return msg;
}

async function printLog(time, level, msg, ...rps){
    let consoles = [...VanillaWorld.getPlayers({tags:[specificTag]})];
    //没人接收的话干嘛要输出
    //如果输出等级设置为LOG，则可能是通过console.log输出的日志，所以会输出到日志
    if (consoles.length === 0 && !outputContentLog && level !== "LOG"){
        if (debug && !isNoticeLoggerUsage){
            isNoticeLoggerUsage = true;
            say(`添加标签 ${specificTag} 以获得日志输出`);
        }
        return;
    }
    let levelName = getLevelName(level);
    
    msg = transferHolder(msg, ...rps);
    let outputText = "[{} {}]{}";
    outputText = transferHolder(outputText, time, levelName, msg);
    
    if (outputContentLog || level === "LOG"){
        outputToConsole(outputText);
    }
    consoles.forEach(pl=>send(pl, outputText));
    
}
    
export class Logger {
    static LEVEL_FATAL = 0;
    static LEVEL_ERROR = 1;
    static LEVEL_WARN = 2;
    static LEVEL_INFO = 3;
    static LEVEL_DEBUG = 4;
    static LEVEL_TRACE = 5;
    
    static log(...args){
        let time = getTimeString();
        printLog(time, "LOG", ...args);
    }
    
    name;
    constructor(name){
        this.name = name;
        const log = (lv, msg="", ...rps)=>{
            let time = getTimeString();
            if (msg !== "" && rps.length === 0){
                msg = transferHolder("{}", msg);
            }
            msg = "[{}]: " + msg;
            printLog(time, lv, msg, this.name, ...rps);
        };
        const levelOutputs = {};
        const getOutput = (prop)=>{
            
            let lv = getLevelCode(prop);
                
            if (lv > logLevel) return ()=>{};
            
            return (...args)=>{
                log(lv, ...args);
            };
        };
        Object.keys(levels).forEach((key)=>{
            levelOutputs[key] = getOutput(key);
        });
        return new Proxy(levelOutputs, {
            get: (levelOutputs, prop)=>{
                if (typeof prop === "symbol"){
                    if (prop === Symbol.iterator){
                        return function*(){
                            for (let key of Object.keys(levelOutputs)){
                                yield levelOutputs[key];
                            }
                        };
                    }
                    return;
                }
                
                if (Object.prototype.hasOwnProperty.call(levelOutputs, prop)){
                    return levelOutputs[prop];
                }
                
                return getOutput(prop);
                
            }
        });
    }
}

export default Logger;

export function log(...args){
    Logger.log(...args);
}

if (overrideDefaultConsole){
    //修改原本的console
    globalThis.console = new Logger("LOG");
    globalThis.print = log;
}

if (debug)
import("yoni/command/ChatCommand.js")
.then(m=>{
    m.ChatCommand.registerPrefixCommand("$", "log", (sender, rawCommand, label, args)=>{
        if (!debug) return;
        let action;
        if (args.length === 0){
            if (sender.hasTag(specificTag))
                action = "off";
            else action = "on";
        } else if (args[0] === "level"){
            if (Number.isInteger(Number(args[1]))){
                logLevel = args[1];
                sender.sendMessage("输出等级已调整为 "+logLevel);
            } else {
                sender.sendMessage("不是整数");
            }
            return;
        } else if (args[0] === "off" || !args[0]){
            action = "off";
        } else {
            action = "on";
        }
        
        if (action === "on"){
            sender.sendMessage("日志输出开启");
            sender.addTag(specificTag);
        } else {
            sender.sendMessage("日志输出关闭");
            sender.removeTag(specificTag);
        }
                
    });
});
