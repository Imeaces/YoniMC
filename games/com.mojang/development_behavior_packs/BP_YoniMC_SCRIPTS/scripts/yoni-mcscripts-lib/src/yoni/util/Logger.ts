import { VanillaWorld } from "../basis.js";
import { Command, AsyncCommandSender } from "../command.js";

import { visualizeValue } from "./console.js";
import { dealWithCmd as JSONModifier_dealWithCmd } from "../lib/utils.js";

import { config } from "../config.js";
import { setDebugFunction } from '../debug.js';
import ConsoleLogger from "../lib/ConsoleLogger.js";
async function sendMessageTo(receiver: AsyncCommandSender, message: string){
    let rawtext = JSON.stringify({rawtext:[{text: message}]}, JSONModifier_dealWithCmd);
    await Command.addExecute(Command.PRIORITY_HIGH, receiver, `tellraw @s ${rawtext}`);
}

function formatAnyValue(v: any): string {
    return typeof v === "string" ? v : visualizeValue(v, 1, {
      showEnumerableOnly: true,
      maxItemPerObject: 4,
      recursiveQuery: false,
      // recursiveQuery: true, //不开，因为会出奇怪的问题。
      // recursiveQueryDepth: 1, //未实现
    });
}

function showLoggerUsageOnce(){
    if ((showLoggerUsageOnce as any).hasExecuted)
        return;
        
    (showLoggerUsageOnce as any).hasExecuted = true;
}

function sendToConsole(
  method: (...data: any[]) => void, msg: string){
    
}

function getTimeString(now: Date = new Date()): string {
    
    let H = String(now.getHours());
    let M = String(now.getMinutes());
    let S = String(now.getSeconds());
    let MS = String(now.getMilliseconds());
    
    let sH = "00" + H;
    sH = sH.slice(sH.length - 2);
    
    let sM = "00" + M;
    sM = sM.slice(sM.length - 2);
    
    let sS = "00" + S;
    sS = sS.slice(sH.length - 2);
    
    let sMS = MS + "000";
    sMS = sMS.slice(0,3);
    
    let str = sH
       + ":" + sM
       + ":" + sS
       + "." + sMS;
    
    return str;
}

enum LoggingLevel {
    FATAL = 0,
    ERROR = 1,
    WARN = 2,
    INFO = 3,
    DEBUG = 4,
    TRACE = 5,
    VERBOSE = 6,
}

export const LoggingNameMappings = {
    "0": LoggingLevel.FATAL,
    fatal: LoggingLevel.FATAL,
    f: LoggingLevel.FATAL,
    
    "1": LoggingLevel.ERROR,
    error: LoggingLevel.ERROR,
    e: LoggingLevel.ERROR,
    err: LoggingLevel.ERROR,
    fail: LoggingLevel.ERROR,
    ex: LoggingLevel.ERROR,
    severe: LoggingLevel.ERROR,
    
    "2": LoggingLevel.WARN,
    warn: LoggingLevel.WARN,
    w: LoggingLevel.WARN,
    warning: LoggingLevel.WARN,
    notice: LoggingLevel.WARN,
    
    "3": LoggingLevel.INFO,
    info: LoggingLevel.INFO,
    i: LoggingLevel.INFO,
    log: LoggingLevel.INFO,
    
    "4": LoggingLevel.DEBUG,
    debug: LoggingLevel.DEBUG,
    d: LoggingLevel.DEBUG,
    
    "5": LoggingLevel.TRACE,
    trace: LoggingLevel.TRACE,
    t: LoggingLevel.TRACE,
    
    "6": LoggingLevel.VERBOSE,
    verbose: LoggingLevel.VERBOSE,
}

type RegisteredLevelNames = keyof typeof LoggingNameMappings;

type LoggerWithDefinedLoggingName = {
    [P in RegisteredLevelNames]: (...data: any[]) => void;
}

function transferHolder(msg: string, replacer: any[]){
    msg = msg.replace(/\{\}/g, (match, offset, string) => {
        if (replacer.length > 0)
            match = formatAnyValue(replacer.shift());
        
        return match;
    });
    if (replacer.length > 0){
        msg += " " + replacer.map(formatAnyValue).join(" ");
    }
    
    return msg;
}

function sendLogText(level: string, msg: string, rps: any[], time: Date, ignoreLevel = false){
    const shouldSendToConsole = ignoreLevel || config.getBoolean("selogging.outputToConsole");
    
    const players = Array.from( //我们对旧版有良好的兼容性！（翻译：就是想用，你打我啊）
      VanillaWorld.getPlayers({ tags: [ config.getString("logging.playerConsoleSpecificTag", "yoni:console") ] })
    );
    
    if (players.length === 0 && !shouldSendToConsole){
        showLoggerUsageOnce();
        return;
    }
    
    const timeMsgHeader = `[${getTimeString(time)} ${level}]`;
    const msgHeader = `[${level}]`;
    
    msg = transferHolder(msg, rps);
    
    if (config.getBoolean("logging.uniqueFontSize"))
        msg = "§中" + msg;

    if (config.getBoolean("logging.showTimeStringOnConsoleOutput") || config.getBoolean("logging.showTimeString"))
    
    if (shouldSendToConsole){
        const printer = Logger.getConsolePrinter(level, ConsoleLogger.warn);
        sendToConsole(printer,
            (config.getBoolean("logging.showTimeStringOnConsoleOutput")
            ? timeMsgHeader
            : msgHeader
            ) + msg);
    }
    
    if (players.length > 0){
        const msgWithHead = (config.getBoolean("logging.showTimeString")
            ? timeMsgHeader
            : msgHeader) + msg;
        players.forEach(player => sendMessageTo(player, msgWithHead));
    }
}
    
export class Logger {
    static setConsolePrinter(level: string, printer: (msg: string) => void): void {
        Logger.#consoleLevelPrinters.set(String(level), printer);
    }
    
    static getConsolePrinter(level: string): ((msg: string) => void) | undefined;
    static getConsolePrinter(level: string, defaultPrinter: (msg: string) => void): (msg: string) => void;
    static getConsolePrinter(level: string, defaultPrinter?: (msg: string) => void): ((msg: string) => void) | undefined {
        return Logger.#consoleLevelPrinters.get(String(level)) ?? defaultPrinter;
    }
    
    static removeConsolePrinter(level: string): boolean {
        if (Logger.#consoleLevelPrinters.has(String(level))){
            Logger.#consoleLevelPrinters.delete(String(level));
            return true;
        }
        return false;
    }
    
    static #consoleLevelPrinters = new Map<string, (msg: string) => void>();
    
    /**
     * 向控制台输出日志。
     */
    static log(...data: any[]): void {
        sendLogText("LOG", "", data, new Date(), true);
    }
    
    name: string;
    
    constructor(name: string){
        if (typeof name !== "string" || name.trim() === "")
            throw new TypeError("Logger's name doesn't valid");
         
        this.name = name;
        
        for (const lv_c of Object.entries(LoggingNameMappings)){
            this.addLevelLogFunc(lv_c[0], lv_c[1] as LoggingLevel);
        }
        
       // return new Proxy(this, new LoggerProxy());
        
    }
    
    async printOnLevel(lv: string, time: Date, msg: any = "", ...rps: any[]){
        if (typeof msg !== "string"){
            rps.unshift(msg);
            msg = "";
        }
        msg = `[${this.name}]: ${msg}`;
        sendLogText(lv, msg, rps, time);
    }
        
    addLevelLogFunc(level: string, levelCode: LoggingLevel){
    //@ts-ignore
        this[level] = (...data: any[]): void  => {
            const time = new Date();
            if (levelCode <= config.getInt("logging.logLevel", 3)){
                this.printOnLevel(level, time, ...data);
            }
        }
    //@ts-ignore
        return this[level];
    }
    
    //@ts-ignore
    "0": (...data: any[]) => void
    //@ts-ignore
    fatal: (...data: any[]) => void
    //@ts-ignore
    f: (...data: any[]) => void
    //@ts-ignore
    "1": (...data: any[]) => void
    //@ts-ignore
    error: (...data: any[]) => void
    //@ts-ignore
    e: (...data: any[]) => void
    //@ts-ignore
    err: (...data: any[]) => void
    //@ts-ignore
    fail: (...data: any[]) => void
    //@ts-ignore
    ex: (...data: any[]) => void
    //@ts-ignore
    severe: (...data: any[]) => void
    //@ts-ignore
    "2": (...data: any[]) => void
    //@ts-ignore
    warn: (...data: any[]) => void
    //@ts-ignore
    w: (...data: any[]) => void
    //@ts-ignore
    warning: (...data: any[]) => void
    //@ts-ignore
    notice: (...data: any[]) => void
    //@ts-ignore
    "3": (...data: any[]) => void
    //@ts-ignore
    info: (...data: any[]) => void
    //@ts-ignore
    i: (...data: any[]) => void
    //@ts-ignore
    log: (...data: any[]) => void
    //@ts-ignore
    "4": (...data: any[]) => void
    //@ts-ignore
    debug: (...data: any[]) => void
    //@ts-ignore
    d: (...data: any[]) => void
    //@ts-ignore
    "5": (...data: any[]) => void
    //@ts-ignore
    trace: (...data: any[]) => void
    //@ts-ignore
    t: (...data: any[]) => void
    //@ts-ignore
    "6": (...data: any[]) => void
    //@ts-ignore
    verbose: (...data: any[]) => void
}
/*
class LoggerProxy {
    constructor(){
        this.get = this.get.bind(this);
    }
    #funcCaches = new WeakMap<Object>();
    #otherLoggingFunc = new WeakSet<Object>();
    get(src: Logger, k: string | symbol | number){
        //@ts-ignore
        const val = src[k];
        
        if (typeof k !== "string"){
            return typeof val === "function" 
                ? this.getProxyFunction(val, src)
                : val;
        }
        
        if (Object.keys(LoggingNameMappings).includes(k)
        || this.#otherLoggingFunc.has(val))
            return val;
        
        if (!(k in src)){
            const val = src.addLevelLogFunc(k, LoggingLevel.INFO);
            this.#otherLoggingFunc.add(val);
            return val;
        }
        
        return typeof val === "function" 
            ? this.getProxyFunction(val, src)
            : val;
    }
    getProxyFunction(fn: Function, src: Logger){
         if (this.#funcCaches.has(fn))
             return this.#funcCaches.get(fn);
                
         const callfunc = function (this: any, ...args: any[]){
             if (this === src)
                 return fn.apply(src, args);
             else
                 return fn.apply(this, args);
         }
         
         this.#funcCaches.set(fn, callfunc);
         
         return callfunc; 
    }
}
*/

export const console = new Logger("LOG");
export const log = console.log;
export const print = console.log;

//修改原本的console
if (config.getBoolean("logging.overrideDefaultConsole")){
    Object.assign(globalThis.console, console, { log: Logger.log });
    globalThis.print = print;
}

setDebugFunction(async function (ChatCommandModule: any){
    const { ChatCommand }: { ChatCommand: typeof import("../util/ChatCommand.js").ChatCommand } = await ChatCommandModule;
    
    ChatCommand.registerPrefixCommand("$", "log", onCommandExecute);
    
    //@ts-ignore
    async function onCommandExecute(sender, rawCommand, label, args){
        const specificTag = config.getString("logging.playerConsoleSpecificTag", "yoni:console");
        let action;
        if (args.length === 0){
            if (sender.hasTag(specificTag)){
                action = "off";
            } else {
                action = "on";
            }
        } else if (args[0] === "level"){
            const newLevelCode = parseInt(args[1]);
            if (isFinite(newLevelCode)){
                config.setInt("logging.logLevel", newLevelCode);
            }
            sender.sendMessage("日志输出等级 §b"+newLevelCode);
            return;
        } else {
            if (args[0] === "off" || args[0] === "on")
                action = args[0];
        }
        if (action === "off"){
            sender.removeTag(specificTag);
            sender.sendMessage("日志输出 §c关闭");
        } else if (action === "on"){
            sender.addTag(specificTag);
            sender.sendMessage("日志输出 §a开启");
        }
    }
}, import("../util/ChatCommand.js"));
