import { VanillaWorld } from "scripts/yoni/basis.js";
import { getErrorMsg } from "./console.js";
import { say } from "./utils.js";
import { YoniEntity } from "scripts/yoni/entity.js";

import { outputContentLog, debug, logLevel as configLogLevel } from "scripts/yoni/config.js";

let isNoticeLoggerUsage = false;

let specificTag = "yonimc:console";

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
    log: "info"
}

function getLevelName(level=4){
    let c = 0;
    let o = level;
    while (level in levels && !isNaN(Number(level))){
        if (c++ > 5){
            return o;
        }
        level = levels[level];
    }
    return level;
}

function getLevelCode(level="debug"){
    let c = 0;
    while (isNaN(Number(level))){
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

export class Logger {
    static LEVEL_FATAL = 0;
    static LEVEL_ERROR = 1;
    static LEVEL_WARN = 2;
    static LEVEL_INFO = 3;
    static LEVEL_DEBUG = 4;
    static LEVEL_TRACE = 5;
    
    static log(name, level, msg, ...rps){
        let consoles = [...VanillaWorld.getPlayers({tags:[specificTag]})]
            .map(e=>new YoniEntity(e));
            
        //没人接收的话干嘛要输出
        if (consoles.length === 0 && !outputContentLog){
            if (!isNoticeLoggerUsage){
                isNoticeLoggerUsage = true;
                say(`添加标签 ${specificTag} 以获得日志输出`);
            }
            return;
        }
        let time = getTimeString();
        let levelName = getLevelName(level);
        
        msg = transferHolder(msg, ...rps);
        let outputText = "[{} {}][{}]: {}";
        outputText = transferHolder(outputText, time, levelName, name, msg);
        
        if (outputContentLog){
            console.warn(outputText);
        }
        consoles.forEach(pl=>pl.sendMessage(outputText));
        
    }
    
    constructor(name){
        this.name = name;
        Object.freeze(this);
        return new Proxy(this, {
            get: (target, prop)=>{
                if (prop === "log") return (...args)=>{this.log("LOG", ...args);};
                
                let lv = getLevelCode(prop);
                
                if (lv > logLevel) return ()=>{};
                
                let levelName = getLevelName(prop);
                
                return (...args)=>{
                    target.log(lv, ...args);
                };
            }
        });
    }
    log(...args){
        Logger.log(this.name, ...args);
    }
}

export default Logger;

export function log(...args){
    Logger.log("LOG", "LOG", ...args);
}

if (debug)
import("scripts/yoni/command/ChatCommand.js")
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