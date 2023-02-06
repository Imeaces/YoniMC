// @ts-nocheck
import { StatusCode, overworld, runTask, Minecraft } from "./basis.js";
import { debug } from "./config.js";
import { getKeys } from "./lib/ObjectUtils.js";

let log = ()=>{};
/**
 * generates a command by a set of params, and try to make sure that every arg is standalone
 * @param {string} cmd 
 * @param  {string[]|...string} args 
 * @returns {string} command
 */
function getCommand(cmd, ...args){
    if (args?.length === 1 && Array.isArray(args[0])){
        args = args[0];
    }
    if (args.length !== 0){
        //遍历每个参数，对满足某一条件的参数进行处理
        args.forEach((arg) => {
            let shouldQuote = false; //标记是否应当在两侧添加引号
            arg = String(arg);
            if (arg.trim().length === 0){ //空参数
                shouldQuote = true;
            }/* else if (getCommand.startsWithNumberRegex.test(arg)){ //以数字开头的参数
                shouldQuote = true;
            }*/ else if (getCommand.spaceCharRegex.test(arg)){ //含有空格，需要引号括起
                shouldQuote = true;
            }
            if (getCommand.specificCharRegex.test(arg)){ //将特殊符号转义
                arg = arg.replaceAll(getCommand.specificCharGlobalRegex, "\\$1");
            }
            if (shouldQuote){ //如果需要引号，则添加引号
                arg = `"${arg}"`;
            }
            cmd += ` ${arg}`; //将参数字符串拼接到命令
        });
    }
    return cmd;
}
function getCommandMoreStrict(cmd, ...args){
    if (args?.length === 1 && Array.isArray(args[0])){
        args = args[0];
    }
    if (args.length !== 0){
        //遍历每个参数，对满足某一条件的参数进行处理
        args.forEach((arg) => {
            let shouldQuote = false; //标记是否应当在两侧添加引号
            arg = String(arg);
            if (arg.trim().length === 0){ //空参数
                shouldQuote = true;
            } else if (getCommand.startsWithNumberRegex.test(arg)){ //以数字开头的参数
                shouldQuote = true;
            } else if (getCommand.spaceCharRegex.test(arg)){ //含有空格，需要引号括起
                shouldQuote = true;
            }
            if (getCommand.specificCharRegex.test(arg)){ //将特殊符号转义
                arg = arg.replaceAll(getCommand.specificCharGlobalRegex, "\\$1");
                shouldQuote = true;
            }
            if (shouldQuote){ //如果需要引号，则添加引号
                arg = `"${arg}"`;
            }
            cmd += ` ${arg}`; //将参数字符串拼接到命令
        });
    }
    return cmd;
}
//因为不globle没法replaceAll
getCommand.specificCharGlobalRegex = /(["'\\])/g;
getCommand.specificCharRegex = /(["'\\])/;
getCommand.spaceCharRegex = /(\s)/;
getCommand.startsWithNumberRegex = /^[0-9]/;

let commandQueues = [[], [], [], [], []];

//空间换时间（滑稽）
/** @returns {boolean} */
function hasNextQueue(){
    if (commandQueues[4].length !== 0
    || commandQueues[3].length !== 0
    || commandQueues[2].length !== 0
    || commandQueues[1].length !== 0
    || commandQueues[0].length !== 0){
        return true;
    }
    return false;
}
/** @returns {number} */
function countNextQueues(){
    return commandQueues[4].length
    + commandQueues[3].length
    + commandQueues[2].length
    + commandQueues[1].length
    + commandQueues[0].length;
}
/** @returns {CommandQueue} */
function fetchNextQueue(){
    if (commandQueues[4].length !== 0){
        return commandQueues[4][0];
    }
    if (commandQueues[3].length !== 0){
        return commandQueues[3][0];
    }
    if (commandQueues[2].length !== 0){
        return commandQueues[2][0];
    }
    if (commandQueues[1].length !== 0){
        return commandQueues[1][0];
    }
    if (commandQueues[0].length !== 0){
        return commandQueues[0][0];
    }
}
/** remove next queue */
function removeNextQueue(){
    if (commandQueues[4].length !== 0){
        commandQueues[4].shift();
    } else if (commandQueues[3].length !== 0){
        commandQueues[3].shift();
    } else if (commandQueues[2].length !== 0){
        commandQueues[2].shift();
    } else if (commandQueues[1].length !== 0){
        commandQueues[1].shift();
    } else if (commandQueues[0].length !== 0){
        commandQueues[0].shift();
    }
}

/** @type {CommandQueue} */
let lastFailedCommand = null;

function executeCommandQueues(){
    runTask(executeCommandQueues);
    let executeQueueCount = 0;
    while (hasNextQueue()){
        //从队列plus中取得一个排队中的命令
        let commandQueue = fetchNextQueue();
        //然后将命令送入minecraft 的命令队列
        try {
            let p = commandQueue.sender.runCommandAsync(commandQueue.command);
            commandQueue.resolveResult(p);
        } catch(error) { //如果没送入成功，说明minecraft 命令队列已满(也可能你故意传了个用不了的sender)，结束等待下次开始
            if (commandQueue === lastFailedCommand){
                lastFailedCommand.reject(error);
                removeNextQueue();
                log("队列中的命令执行失败 /{}\n{}", lastFailedCommand.command, error);
            } else {
                log("队列已满或出现其他错误，如果下次该命令仍然推入错误，将会不执行此命令，已成功推入 {} 条命令，还有 {} 条正在等待\n{}", executeQueueCount, countNextQueues(), error);
                lastFailedCommand = commandQueue;
            }
            break;
        }
        executeQueueCount += 1;
        //送入之后将队列中的命令移除
        removeNextQueue();
    }
}

/**
 * 表示命令完成执行后返回的结果。
 * @interface 
 * @typedef CommandResult
 * @prop {number} statusCode
 * @prop {number} [successCount]
 * @prop {string} [statusMessage]
 */
export interface CommandResult {
    statusCode: StatusCode;
    successCount?: number;
    statusMessage?: string;
}

/**
 * 某些拥有 `runCommandAsync` 方法的对象。
 * @interface
 * @typedef {{runCommandAsync: (command: string) => CommandResult}} CommandSender 
 */
export interface CommandSender {
    runCommandAsync(command: string): CommandResult;
}

/**
 * contains command queue infos
 */
export class CommandQueue {
    /**
     * @type {CommandSender}
     */
    sender;
    /**
     * @type {string}
     */
    command;
    /**
     * @type {Function}
     */
    resolve;
    reject;
    /**
     * @param {Promise<CommandResult>} commandPromise 
     */
    async resolveResult(commandPromise){
        
        //然后是获取命令结果(但是现在已经没有结果了)
        //所以只好生成一个
        let commandResult = { statusCode: StatusCode.success };
        let rt = null;
        try {
            rt = await commandPromise;
        } catch (commmandExecuteErrorMessage){
            commandResult.statusCode = StatusCode.error;
            commandResult.statusMessage = String(commmandExecuteErrorMessage);
        }
        try {
            if (rt != null){
                for (let key in rt){
                    if (key in commandResult){
                        continue;
                    }
                    commandResult[key] = rt[key];
                }
            }
        } catch(e){ //在commandResult出现问题的时候大概会触发这段代码
            log("在复制属性的时候出现错误: {}", e);
        }
        this.resolve(commandResult);
    }
    /**
     * 
     * @param {CommandSender} sender 
     * @param {string} command 
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    constructor(sender, command, resolve, reject){
        if (typeof sender?.runCommandAsync !== "function"){
            throw new TypeError("sender cannot runCommandAsync()");
        }
        this.sender = sender;
        this.command = command;
        this.resolve = resolve;
        this.reject = reject;
    }
}

/**
 * 命令运行的优先级。
 * Indicates the execution priority of this command
 * @typedef {5 | 4 | 3 | 2 | 1} CommandPriority
 */
export type CommandPriority = 5 | 4 | 3 | 2 | 1;

export default class Command {
    
    /** @type {CommandPriority} */
    static PRIORITY_HIGHEST: CommandPriority = 5;
    /** @type {CommandPriority} */
    static PRIORITY_HIGH: CommandPriority = 4;
    /** @type {CommandPriority} */
    static PRIORITY_NORMAL: CommandPriority = 3;
    /** @type {CommandPriority} */
    static PRIORITY_LOW: CommandPriority = 2;
    /** @type {CommandPriority} */
    static PRIORITY_LOWEST: CommandPriority = 1;
    
    /**
     * 返回队列中未执行的命令的数量
     * @returns {number}
     */
    static countQueues(){
        return countNextQueues();
    }
    
    /**
     * execute a command
     * @param {string} command
     */
    static fetch(command){
        return Command.addExecute(Command.PRIORITY_NORMAL, overworld, command);
    }
    /**
     * execute a command with params
     * @param {...string} params - Command params
     * @returns {Promise<CommandResult>}
     */
    static fetchParams(...params){
        return Command.addExecute(Command.PRIORITY_NORMAL, overworld, getCommand(...params));
    }
    /**
     * execute a command with params by specific sender
     * @param {CommandSender} sender - Command's sender
     * @param {...string} params - command params
     * @returns {Promise<CommandResult>}
     */
    static fetchExecuteParams(sender, ...params){
        return Command.addExecute(Command.PRIORITY_NORMAL, sender, getCommand(...params));
    }
    /**
     * execute a command by specific sender
     * @param {CommandSender} sender - Command's sender
     * @returns {Promise<CommandResult>}
     */
    static fetchExecute(sender, command){
        return Command.addExecute(Command.PRIORITY_NORMAL, sender, command);
    }
    
    /**
     * add a command to specific priority to execute
     * @param {CommandPriority} priority 
     * @param {string} command 
     * @returns {Promise<CommandResult>}
     */
    static add(priority: CommandPriority, command: string){
        return Command.addExecute(priority, overworld, command);
    }
    /**
     * add a command with params to specific priority to execute
     * @param {CommandPriority} priority 
     * @param {...string} params
     * @returns {Promise<CommandResult>}
     */
    static addParams(priority: CommandPriority, ...params: string[]){
        return Command.addExecute(priority, overworld, getCommand(...params));
    }
    
    /**
     * add a command with params to specific priority to execute by sender
     * @param {CommandPriority} priority 
     * @param {CommandSender} sender
     * @param {...string} params
     * @returns {Promise<CommandResult>}
     */
    static addExecuteParams(priority: CommandPriority, sender, ...params){
        return Command.addExecute(priority, sender, getCommand(...params));
    }
    
    //某些命令需要以尽可能快的速度执行，故添加此函数，可设置命令权重
    //然后我就把所有命令都用这个来执行了
    /**
     * 在对象上调用 `runCommandAsync` 执行命令。
     * @param {CommandPriority} priority 
     * @param {CommandSender} sender 
     * @param {string} command 
     * @returns {Promise<CommandResult>}
     */
    static addExecute(priority: CommandPriority, sender: CommandSender, command: string): Promise<CommandResult>{
        let resolve, reject;
        let promise = new Promise((re, rj)=>{
            resolve = re;
            reject = rj;
        });
        if (priority-1 in commandQueues){
            commandQueues[priority-1].push(new CommandQueue(sender, command, resolve, reject));
            return promise;
        } else {
            throw new Error("Unknown command priority " + String(priority));
        }
    }
    
    /**
     * get command by params
     * @param {string} command 
     * @param  {...string} args - command params
     * @returns {string} command
     */
    static getCommand(command, ...args){
        return getCommand(command, ...args);
    }
    static getCommandMoreStrict(...args){
        return getCommandMoreStrict(...args);
    }
    /**
     * execute a set of commands by sender
     * @param {CommandSender} sender 
     * @param {string[]} commands - command
     * @returns {Promise<CommandResult[]>}
     */
    static async postExecute(sender, commands){
        commands = Array.from(commands);
        let promises = commands.map((cmd)=>Command.fetchExecute(sender, cmd));
        let results = [];
        for (let pro of promises){
            results.push(await pro);
        }
        return Promise.all(results);
    }
    
    static run(command){
        if (overworld.runCommand){
            try {
                return Object.assign({}, overworld.runCommand(command));
            } catch (e){
                return JSON.parse(e);
            }
        }
        throw new Error("current version doesn't support 'Command.run' method, try 'Command.fetch' instead");
    }
    static execute(sender, command){
        if (sender.runCommand){
            try {
                return Object.assign({}, sender.runCommand(command));
            } catch (e){
                return JSON.parse(e);
            }
        }
        throw new Error("current version doesn't support 'Command.execute' method, try 'Command.fetchExecute' instead");
    }
}

export { Command };

runTask(executeCommandQueues);

if (debug){
    import("./util/Logger.js")
    .then(m=>{
        let logger = new m.Logger("Command");
        log = logger.debug;
    });
    
    import("./util/ChatCommand.js")
    .then(m=>{
        m.ChatCommand.registerCustomPrefixCommand("$", "cmdm", (_sender, _, __, args)=>{
            if (args[0] === "clearandprint"){
                let str = ""; //JSON.stringify(commandQueues[3]);
                for (let s of commandQueues[2]){
                    str += s.command + "\n";
                }
                commandQueues = [[], [], [], [], []];
                log(str);
                log("done");
            } else if (args[0] === "count"){
                log(commandQueues.flat().length);
            }
        });
    });
}
