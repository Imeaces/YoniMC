import { StatusCode, overworld, runTask, Minecraft } from "./basis.js";
import { debug } from "./config.js";
import { getKeys } from "./lib/ObjectUtils.js";

let log: any = ()=>{};
let commandQueues: CommandQueue[][] = [[], [], [], [], []];

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
let lastFailedCommand: CommandQueue | null | undefined = null;

function executeCommandQueues(){
    runTask(executeCommandQueues);
    let executeQueueCount = 0;
    while (hasNextQueue()){
        //从队列plus中取得一个排队中的命令
        let commandQueue = fetchNextQueue() as CommandQueue;
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
 * @typedef {{runCommandAsync: (command: string) => CommandResult}} AsyncCommandSender 
 */
export interface AsyncCommandSender {
    runCommandAsync(command: string): Promise<CommandResult> | Promise<Minecraft.CommandResult>;
}

export interface CommandSender {
    runCommand(command: string): CommandResult | Minecraft.CommandResult;
}

/**
 * contains command queue infos
 */
export class CommandQueue {
    /**
     * @type {AsyncCommandSender}
     */
    sender: AsyncCommandSender;
    /**
     * @type {string}
     */
    command: string;
    resolve: (result: CommandResult) => void;
    reject: (err: unknown) => void;
    /**
     * @param {Promise<CommandResult>} commandPromise 
     */
    async resolveResult(commandPromise: Promise<CommandResult> | Promise<Minecraft.CommandResult> | Promise<CommandResult|Minecraft.CommandResult>){
        
        let originalCommandResult: any;
        let statusCode = StatusCode.success;
        let successCount = 0;
        let statusMessage = "command error";
        try {
            originalCommandResult = await commandPromise;
            
        } catch(cmderr) {
            if (typeof cmderr === "string"){
                try {
                    originalCommandResult = JSON.parse(cmderr);
                } catch {
                    originalCommandResult = { statusMessage: cmderr };
                }
            } else {
                originalCommandResult = cmderr;
            }
            statusCode = StatusCode.fail;
        }
        
        if (originalCommandResult?.statusCode !== undefined){
            statusCode = originalCommandResult.statusCode as unknown as StatusCode;
        }
        
        if (typeof originalCommandResult?.statusMessage === "string"){
            statusMessage = originalCommandResult.statusMessage;
        }
        
        if (typeof originalCommandResult?.successCount === "number"){
            successCount = originalCommandResult.successCount;
        }
        
        const commandResult = Object.assign({
            successCount,
            statusCode,
            statusMessage,
        }, originalCommandResult);
        
        this.resolve(commandResult);
    }
    /**
     * 
     * @param {AsyncCommandSender} sender 
     * @param {string} command 
     * @param {Function} resolve 
     * @param {Function} reject 
     */
    constructor(sender: AsyncCommandSender, command: string, resolve: (result: CommandResult) => void, reject: (err: unknown) => void){
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
 *
 * Indicates the execution priority of this command
 */
export enum CommandPriority {
    highest = 5,
    high = 4,
    medium = 3,
    low = 2,
    lowest = 1
}

export class Command {
    
    static PRIORITY_HIGHEST = CommandPriority.highest;
    static PRIORITY_HIGH = CommandPriority.high;
    static PRIORITY_NORMAL = CommandPriority.medium;
    static PRIORITY_LOW = CommandPriority.low;
    static PRIORITY_LOWEST = CommandPriority.lowest;
    
    /**
     * 返回队列中未执行的命令的数量
     * @returns {number}
     */
    static countQueues(): number {
        return countNextQueues();
    }
    
    /**
     * Execute a command asynchronously
     * @param {string} command
     */
    static fetch(command: string){
        return Command.addExecute(Command.PRIORITY_NORMAL, overworld, command);
    }
    /**
     * execute a command asynchronously with params
     * @param {...string} params - Command params
     * @returns {Promise<CommandResult>}
     */
    static fetchParams(command: string, ...params: string[]){
        return Command.addExecute(Command.PRIORITY_NORMAL, overworld, Command.getCommand(command, params));
    }
    /**
     * execute a command with params by specific sender
     * @param {AsyncCommandSender} sender - Command's sender
     * @param {...string} params - command params
     * @returns {Promise<CommandResult>}
     */
    static fetchExecuteParams(sender: AsyncCommandSender, command: string, ...params: string[]){
        return Command.addExecute(Command.PRIORITY_NORMAL, sender, Command.getCommand(command, params));
    }
    /**
     * execute a command by specific sender
     * @param {AsyncCommandSender} sender - Command's sender
     * @returns {Promise<CommandResult>}
     */
    static fetchExecute(sender: AsyncCommandSender, command: string){
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
    static addParams(priority: CommandPriority, command: string, ...params: string[]){
        return Command.addExecute(priority, overworld, Command.getCommand(command, params));
    }
    
    /**
     * add a command with params to specific priority to execute by sender
     * @param {CommandPriority} priority 
     * @param {AsyncCommandSender} sender
     * @param {...string} params
     * @returns {Promise<CommandResult>}
     */
    static addExecuteParams(priority: CommandPriority, sender: AsyncCommandSender, command: string, ...params: string[]){
        return Command.addExecute(priority, sender, Command.getCommand(command, params));
    }
    
    //某些命令需要以尽可能快的速度执行，故添加此函数，可设置命令权重
    //然后我就把所有命令都用这个来执行了
    /**
     * 在对象上调用 `runCommandAsync` 执行命令。
     * @param {CommandPriority} priority 
     * @param {AsyncCommandSender} sender 
     * @param {string} command 
     * @returns {Promise<CommandResult>}
     */
    static addExecute(priority: CommandPriority, sender: AsyncCommandSender, command: string): Promise<CommandResult> {
        let resolve: any, reject: any;
        let promise = new Promise((re, rj)=>{
            resolve = re;
            reject = rj;
        }) as Promise<CommandResult>;
        if (Array.isArray(commandQueues[priority-1])){
            commandQueues[priority-1].push(new CommandQueue(sender, command, resolve, reject));
            return promise;
        } else {
            throw new Error("Unknown command priority " + String(priority));
        }
    }
    
    /**
     * generates a command by a set of params, and try to make sure that every arg is standalone
     * @param {string} cmd 
     * @param  {string[]|...string} args 
     * @returns {string} command
     */
    static getCommand(command: string, ...args: string[]): string;
    static getCommand(command: string, args: string[]): string;
    static getCommand(cmd: string, ...args: string[] | [string[]] ): string {
        const specificCharGlobalRegex = /(["'\\])/g;
        const specificCharRegex = /(["'\\])/;
        const spaceCharRegex = /(\s)/g;
        
        if (args?.length === 1 && Array.isArray(args[0])){
            args = args[0];
        }
        const params = [cmd];
        //遍历每个参数，对满足某一条件的参数进行处理
        for (let arg of args.map(String)){
            let shouldQuote = false;
            
            //空参数
            if (arg.trim().length === 0){ 
                shouldQuote = true;
            }
            
            //空格
            if (spaceCharRegex.test(arg)){
                shouldQuote = true;
            }
            
            //转义特殊符号
            if (specificCharGlobalRegex.test(arg)){ 
                arg = arg.replaceAll(specificCharGlobalRegex, "\\$1");
            }
            
            //如果需要引号，则添加引号
            if (shouldQuote){ 
                arg = `"${arg}"`;
            }
            params.push(arg);
        }
        return params.join(" ");
    }
    
    static getCommandMoreStrict(command: string, ...args: string[]): string;
    static getCommandMoreStrict(command: string, args: string[]): string;
    static getCommandMoreStrict(cmd: string, ...args: string[] | [string[]] ): string {
        const specificCharGlobalRegex = /(["'\\])/g;
        const specificCharRegex = /(["'\\])/;
        const spaceCharRegex = /(\s)/g;
        const startsWithNumberRegex = /^[0-9]/;
        
        if (args?.length === 1 && Array.isArray(args[0])){
            args = args[0];
        }
        const params = [cmd];
        //遍历每个参数，对满足某一条件的参数进行处理
        for (let arg of args.map(String)){
            let shouldQuote = false;
            
            //空参数
            if (arg.trim().length === 0){ 
                shouldQuote = true;
            }
            
            //空格
            if (spaceCharRegex.test(arg)){
                shouldQuote = true;
            }
            
            //以数字开头的参数
            if (startsWithNumberRegex.test(arg)){ 
                shouldQuote = true;
            }
            
            //转义特殊符号
            if (specificCharGlobalRegex.test(arg)){ 
                arg = arg.replaceAll(specificCharGlobalRegex, "\\$1");
            }
            
            //如果需要引号，则添加引号
            if (shouldQuote){ 
                arg = `"${arg}"`;
            }
            params.push(arg);
        }
        return params.join(" ");
    }

    /**
     * execute a set of commands by sender
     * @param {AsyncCommandSender} sender 
     * @param {string[]} commands - command
     * @returns {Promise<CommandResult[]>}
     */
    static async postExecute(sender: AsyncCommandSender, commands: string[]): Promise<CommandResult[]> {
        commands = Array.from(commands);
        let promises = commands.map((cmd) => Command.fetchExecute(sender, cmd));
        let results = [];
        for (let pro of promises){
            results.push(await pro);
        }
        return Promise.all(results);
    }
    
    static run(command: string): CommandResult {
        if (!overworld.runCommand){
            throw new Error("current version doesn't support 'Command.run' method, try 'Command.fetch' instead");
        }
        let originalCommandResult: any;
        let statusCode = StatusCode.success;
        let successCount = 0;
        let statusMessage = "command error";
        try {
            originalCommandResult = overworld.runCommand(command);
            
        } catch(cmderr) {
            if (typeof cmderr === "string"){
                try {
                    originalCommandResult = JSON.parse(cmderr);
                } catch {
                    originalCommandResult = { statusMessage: cmderr };
                }
            } else {
                originalCommandResult = cmderr;
            }
            statusCode = StatusCode.fail;
        }
        
        if (originalCommandResult?.statusCode !== undefined){
            statusCode = originalCommandResult.statusCode as unknown as StatusCode;
        }
        
        if (typeof originalCommandResult?.statusMessage === "string"){
            statusMessage = originalCommandResult.statusMessage;
        }
        
        if (typeof originalCommandResult?.successCount === "number"){
            successCount = originalCommandResult.successCount;
        }
        
        return Object.assign({
            successCount,
            statusCode,
            statusMessage,
        }, originalCommandResult);
        
    }
    static execute(sender: CommandSender, command: string): CommandResult {
        if (!sender.runCommand){
            throw new Error("not a command sender or current version doesn't support 'Command.execute' method, try 'Command.fetchExecute' instead");
        }
        let originalCommandResult: any;
        let statusCode = StatusCode.success;
        let successCount = 0;
        let statusMessage = "command error";
        try {
            originalCommandResult = sender.runCommand(command);
            
        } catch(cmderr) {
            if (typeof cmderr === "string"){
                try {
                    originalCommandResult = JSON.parse(cmderr);
                } catch {
                    originalCommandResult = { statusMessage: cmderr };
                }
            } else {
                originalCommandResult = cmderr;
            }
            statusCode = StatusCode.fail;
        }
        
        if (originalCommandResult?.statusCode !== undefined){
            statusCode = originalCommandResult.statusCode as unknown as StatusCode;
        }
        
        if (typeof originalCommandResult?.statusMessage === "string"){
            statusMessage = originalCommandResult.statusMessage;
        }
        
        if (typeof originalCommandResult?.successCount === "number"){
            successCount = originalCommandResult.successCount;
        }
        
        return Object.assign({
            successCount,
            statusCode,
            statusMessage,
        }, originalCommandResult);
        
    }
}

export default Command;

runTask(executeCommandQueues);
