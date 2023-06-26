//@ts-nocheck
/*
    "authors": [
      "Silvigarabis"
    ],
    "license": "MIT LICENSE",
    "url": "https://github.com/Silvigarabis/yoni-mcscripts-lib"

此版本未经测试。理论上可以运行在1.19.60-1.19.80。
导出语句在最底下，可以在那里查看可用的类型
此文件为整合后的单文件版

MIT License

Copyright (c) 2023 Silvigarabis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

// config.js

/* 以下为配置区 */

//设置为true后，将启用一些debug功能
//请勿在正式投入使用时启用
const debug = false;

//启用根据数字ID查询scbid的功能（不推荐）
const enableScoreboardIdentityByNumberIdQuery = false;

// basis.ts
import * as Minecraft from "@minecraft/server";
import * as Gametest from "@minecraft/server-gametest";

const VanillaWorld: Minecraft.World = Minecraft.world;
const VanillaScoreboard: Minecraft.Scoreboard = VanillaWorld.scoreboard;
const MinecraftSystem: Minecraft.System = Minecraft.system;

/**
 * @param {(...args: any[]) => void} callback 
 * @param {...any} args
 */
function runTask(callback: (...args: any[]) => void, ...args: any[]){
    if (args.length === 0)
        MinecraftSystem.run(callback);
    else
        MinecraftSystem.run(() => {
            callback(...args);
        });
}

/**
 * overworld dimension
 * @type {Minecraft.Dimension}
 */
const overworld = VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.overworld);

/**
 * a type contains a set of statusCode
 */
enum StatusCode {
    fail = -2147483648,
    error = -2147483646,
    success = 0,
}

// command.ts
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
interface CommandResult {
    statusCode: StatusCode;
    successCount?: number;
    statusMessage?: string;
}

/**
 * 某些拥有 `runCommandAsync` 方法的对象。
 * @interface
 * @typedef {{runCommandAsync: (command: string) => CommandResult}} CommandSender 
 */
interface CommandSender {
    runCommandAsync(command: string): Promise<CommandResult> | Promise<|Minecraft.CommandResult>;
}

/**
 * contains command queue infos
 */
class CommandQueue {
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
type CommandPriority = 5 | 4 | 3 | 2 | 1;

class Command {
    
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

runTask(executeCommandQueues);

// EntityBase.ts
class EntityBase {
    static isEntity(one: any): one is EntityValue {
        return one instanceof Minecraft.Entity || one instanceof Minecraft.Player || one instanceof Gametest.SimulatedPlayer;
    }
    static isMinecraftEntity(one: any): one is EntityValue {
        return one instanceof Minecraft.Entity || one instanceof Minecraft.Player || one instanceof Gametest.SimulatedPlayer;
    }
    static entityIsPlayer(one: EntityValue): one is Minecraft.Player {
        return one instanceof Minecraft.Player || one instanceof Gametest.SimulatedPlayer;
    }
    /**
     * 检查一个东西是否为实体
     * @param {any} object - 任意
     * @throws 当不是实体的时候抛出错误
     */
    static checkIsEntity(object: any){
        if (!EntityBase.isEntity(object))
            throw new TypeError("Not a Entity type");
    }
    /**
     * 得到一个Minecraft.Entity
     * @param {EntityValue} entity
     * @returns {MinecraftEntityType}
     */
    static getMinecraftEntity(entity: EntityValue): Minecraft.Entity {
        if (EntityBase.isMinecraftEntity(entity))
            return entity;
        throw new Error("no reference");
    }
}

// EntityTypeDefs.ts

type MinecraftEntityValue = 
    Minecraft.Entity | Minecraft.Player | Gametest.SimulatedPlayer

type EntityValue = MinecraftEntityValue

// Entry.ts

/*
 存十万条就很卡了
 那个时候，建议还是直接让游戏操控吧
*/

let idRecords: Map<number, Entry>;
if (enableScoreboardIdentityByNumberIdQuery){
    idRecords = new Map();
}
let nameRecords: Map<string, Entry> = new Map();
let entityRecords: WeakMap<Minecraft.Entity, Entry> = new WeakMap();
let scbidRecords: WeakMap<Minecraft.ScoreboardIdentity, Entry> = new WeakMap();

if (debug){ // @ts-ignore 测试使用，将记录公开以便于查询
    globalThis.EntryRecords = { idRecords, nameRecords, entityRecords, scbidRecords };
}

/**
 * 一系列用于查询 Entry 的信息。
 * @interface
 * @typedef EntryQueryOptions
 * @property {string} [name]
 * @property {number} [id]
 * @property {Minecraft.ScoreboardIdentity} [scbid]
 * @property {EntityBase|Minecraft.Entity} [entity]
 * @property {EntryType} [type]
 */
/**
 * 一系列用于查询记录的信息。
 */
interface EntryQueryOptions {
    /**
     * 虚拟记分板实体的名字
     */
    name?: string;
    /**
     * 分数持有者ID
     */
    id?: number;
    /**
     * 分数持有者对象
     */
    scbid?: Minecraft.ScoreboardIdentity;
    /**
     * 实体
     */
    entity?: EntityValue;
    /**
     * 类型
     */
    type?: EntryType | Minecraft.ScoreboardIdentityType;
}

/**
 * 代表记分板上 持有着一系列分数记录的对象（分数持有者）。
 */
class Entry {
    
    /**
     * 寻找指定对象在记分板上使用的分数持有者对象。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @returns {Entry} 与 `one` 对应的分数持有者对象。
     * @throws 若未能根据值得到可能的分数持有者对象，抛出 `UnknownEntryError`。
     */
    static guessEntry(one: EntryValueType): Entry {
        if (one instanceof Entry)
            return one;
        if (one instanceof Minecraft.ScoreboardIdentity)
            return Entry.findEntry({scbid: one});
        if (EntityBase.isEntity(one))
            return Entry.findEntry({entity: one});
        if (typeof one === "string")
            return Entry.findEntry({name: one, type: EntryType.FAKE_PLAYER});
        if (isFinite(one as number)){
            return Entry.findEntry({id: one as number});
        }
        throw new UnknownEntryError();
    }
    
    /**
     * 查找符合 `option` 中列出的条件的分数持有者对象。
     * @param {EntryQueryOptions} option
     * @returns {Entry}
     */
    static findEntry(option: EntryQueryOptions): Entry {
        let { id, name, scbid, type, entity } = option;
        let vanillaEntity: Minecraft.Entity | null = EntityBase.isEntity(entity) ? EntityBase.getMinecraftEntity(entity): null;
        
        let entry;
        
        if (type === EntryType.FAKE_PLAYER && scbid != null){
            name = scbid.displayName;
        }
        
        //优先级: vanillaEntity, scbid, id, name
        if (vanillaEntity != null && (type === EntryType.PLAYER || type === EntryType.ENTITY)){
        
            entry = entityRecords.get(vanillaEntity);
            
        }
        
        if (entry == null && scbid != null){
            entry = scbidRecords.get(scbid);
        }
        
        if (entry == null && name != null && type === EntryType.FAKE_PLAYER){
        
            entry = nameRecords.get(name);
        
        }
        
        if (entry == null
        && enableScoreboardIdentityByNumberIdQuery
        && id != null
        ){
            entry = idRecords.get(id);
        }
        
        if (entry == null)
            entry = new Entry(option);
        
        if (type != null && entry.type !== type)
            throw new Error("entry type do not matches");
            
        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
        
            let entity = null;
            let hasEntity = false;
            
            try {
                entity = entry.getEntity();
                hasEntity = true;
            } catch {
            }
            
            if (hasEntity){
                if (entity == null){
                    throw new Error("null entity object");
                }
                entityRecords.set(entity, entry);
            }
        }
        
        if (enableScoreboardIdentityByNumberIdQuery
        && entry.id != null)
            idRecords.set(entry.id, entry);
        
        if (entry.vanillaScbid != null)
            scbidRecords.set(entry.vanillaScbid, entry);
        
        if (type === EntryType.FAKE_PLAYER)
            nameRecords.set(entry.displayName, entry);
        
        return entry;
    }
    
    /**
     * 获取所有记分标识符对象。
     * @param {EntryQueryOptions} option
     * @returns {Minecraft.ScoreboardIdentity[]}
     */
    static getVanillaScoreboardParticipants(): Readonly<Minecraft.ScoreboardIdentity[]> {
        let currentTick = MinecraftSystem.currentTick;
        if (currentTick !== Entry.#vanillaScbidsLastUpdateTime){
            let scbids = VanillaScoreboard.getParticipants();
            if (! Array.isArray(scbids)){
                scbids = Array.from(scbids);
            }
            Entry.#vanillaScbids = Object.freeze(scbids);
            Entry.#vanillaScbidsLastUpdateTime = currentTick;
        }
        return Entry.#vanillaScbids;
    }
    static #vanillaScbids: Readonly<Minecraft.ScoreboardIdentity[]>;
    static #vanillaScbidsLastUpdateTime: number | null = null;
    
    static findVanillaScoreboardParticipant(
        filter: (scbid: Minecraft.ScoreboardIdentity) => boolean
    ): Minecraft.ScoreboardIdentity | undefined {
        return Entry.getVanillaScoreboardParticipants()
            .find(filter);
    }
    
    #type: EntryType;
    #id: number | undefined;
    #name: string;
    #vanillaScbid: Minecraft.ScoreboardIdentity | undefined;
    #entity: Minecraft.Entity | null;
    
    /**
     * 分数持有者的类型。
     * @returns {EntryType}
     */
    get type(){
        return this.#type;
    }
    
    /**
     * 分数持有者ID，如果尚未在记分板中初始化，则为 `undefined`。
     * @returns {number|undefined}
     */
    get id(): number | undefined {
        if (this.vanillaScbid?.id !== this.#id)
            this.#id = this.vanillaScbid?.id;
        return this.#id as unknown as number;
    }
    
    /**
     * 分数持有者的可被玩家查看的名字。
     * @returns {string}
     */
    get displayName(){
        if (this.vanillaScbid !== undefined){
            return this.vanillaScbid.displayName;
        }
        if (this.#type === EntryType.PLAYER)
            return (this.#entity as unknown as Minecraft.Player).name; 
        if (this.#type === EntryType.ENTITY)
            return String(this.getEntity().id);
        if (this.#type === EntryType.FAKE_PLAYER)
            return this.#name;
        throw new Error("unknown name");
    }
    
    /**
     * 原始分数持有者对象，可能为空。
     * @returns {Minecraft.ScoreboardIdentity|undefined}
     */
    get vanillaScbid(): Minecraft.ScoreboardIdentity | undefined {
        
        Entry.updateEntry(this);
        
        return this.#vanillaScbid;
    }
    
    static isScbidValidity(scbid: any){
        try {
            return Entry.checkScbidValidity(scbid);
        } catch {
            return false;
        }
    }
    
    /**
     * 检查传入的值是否为可用的分数持有者对象。若不是，则抛出错误。
     */
    static checkScbidValidity(scbid: any){
        if (! (scbid instanceof Minecraft.ScoreboardIdentity)){
            throw new TypeError("不是分数持有者对象。");
        }
        
        let desc = Object.getOwnPropertyDescriptor(Minecraft.ScoreboardIdentity.prototype, "id");
        if (desc?.get){
            try {
                desc.get.call(scbid);
            } catch {
                throw new Error("指定的分数持有者对象已不可用");
            }
        } else {
            throw new Error("出现了意料之外的情况，可能是当前版本尚未支持");
        }
        
        return true;
    }
    
    /**
     * 更新Entry
     * @param {Entry} entry
     */
    static updateEntry(entry: Entry){
        
        //更新实体分数持有者的scbid
        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
            if (entry.#vanillaScbid !== undefined && entry.#entity === null){
                try {
                    entry.#entity = entry.#vanillaScbid.getEntity();
                } catch {
                    entry.#entity = null;
                }
            } else if (entry.#entity !== null
            && entry.#entity.scoreboardIdentity !== entry.#vanillaScbid
            ){
                let scbid = entry.#entity.scoreboardIdentity;
                if (scbid instanceof Minecraft.ScoreboardIdentity){
                    entry.#vanillaScbid = scbid;
                } else {
                    entry.#vanillaScbid = undefined;
                }
            }
        } else if (entry.#type === EntryType.FAKE_PLAYER){
            if (entry.#vanillaScbid !== undefined
            && !Entry.isScbidValidity(entry.#vanillaScbid)
            ){
                entry.#vanillaScbid = undefined;
            }
            
            if (entry.#vanillaScbid === undefined){
                let recordedScbid = Entry.findVanillaScoreboardParticipant((scbid: Minecraft.ScoreboardIdentity) => {
                    return scbid.type === ScoreboardIdentityType.fakePlayer
                        && scbid.displayName === entry.#name;
                });
                if (recordedScbid){
                    entry.#vanillaScbid = recordedScbid;
                }
            }
        }
        
        if (entry.#vanillaScbid !== undefined
        && scbidRecords.get(entry.#vanillaScbid) !== entry){
            scbidRecords.set(entry.#vanillaScbid, entry);
        }
    }
    
    /**
     * 如果此分数持有者不是虚拟玩家，返回此分数持有者对应实体的对象。
     * @returns {Minecraft.Entity} 记分对象所对应的实体对象。
     * @throws 若实体尚未加载或已死亡，将抛出错误。
     * @returns {Minecraft.Entity|null} 若为虚拟玩家类型的分数持有者，则返回 `null`。
     */
    getEntity(): Minecraft.Entity {
        if (this.#type === EntryType.FAKE_PLAYER){
            throw new Error("此记分对象代表的不是实体");
        } else if (this.#type === EntryType.PLAYER
        || this.#type === EntryType.ENTITY){
            
            if (this.#entity === null){
                if (this.vanillaScbid === undefined){
                    throw new Error("此记分对象未关联任何一个实体，这可能是在创建记分对象的时候出现了逻辑错误。未能找到关联的实体对象或香草记分对象。");
                }
                try {
                    this.#entity = this.vanillaScbid.getEntity();
                } catch {
                    throw new Error("实体可能尚未加载");
                }
            }
        }
        return this.#entity as Minecraft.Entity;
    }
    
    /**
     * 更新此分数持有者对象与原始分数持有者对象的映射关系。
     * @returns {Entry} 更新完成后，返回对象自身。
     */
    update(){
        Entry.updateEntry(this);
        return this;
    }
    
    /**
     * @hideconstructor
     */
    constructor(option: EntryQueryOptions){
        let { entity, name, id, scbid, type } = option;
        let vanillaEntity: Minecraft.Entity | null = null;
        let vanillaScbid: Minecraft.ScoreboardIdentity | undefined = undefined;
        
        //处理时使用原版实体对象
        if (entity != null){
            vanillaEntity = EntityBase.getMinecraftEntity(entity);
        }
        
        if (vanillaEntity != null){
            if (EntityBase.entityIsPlayer(vanillaEntity)){
                type = EntryType.PLAYER;
            } else {
                type = EntryType.ENTITY;
            }
            vanillaScbid = vanillaEntity.scoreboardIdentity;
            
            //若实体在计分板上所有记分项中都没有分数记录
            //其scbid为空
            id = vanillaScbid?.id;
            
        } else {
            let condF: ((scbid: Minecraft.ScoreboardIdentity) => boolean) | null = null;
            
            if (scbid == null
            && type === EntryType.FAKE_PLAYER
            && name !== ""
            && name != null){
                condF = (scbid) => {
                    return (scbid.displayName === name && type === scbid.type);
                }
            
            } else if (scbid == null && id != null){
                condF = (scbid) => {
                    return scbid.id === id;
                }
            }
            
            if (condF !== null){
                vanillaScbid = Entry.findVanillaScoreboardParticipant(condF);
            }
            
            if (vanillaScbid != null){
                type = vanillaScbid.type as unknown as EntryType;
                name = vanillaScbid.displayName;
                id = vanillaScbid.id;
                if (EntryType.PLAYER === type
                || EntryType.ENTITY === type
                ){
                    try {
                        //若记分对象所代表的实体没有被加载
                        //获取的时候可能会报错
                        vanillaEntity = vanillaScbid.getEntity();
                    } catch {
                        vanillaEntity = null;
                    }
                }
            } else if (id != null){
                throw new Error(`Unable to determine the scbid ${id}`);
                //未能根据scbid找到记分对象的实例
            }
        }
        
        this.#id = id != null
            ? id
            : undefined;
        
        this.#entity = vanillaEntity;
            
        this.#name = name as string;
        this.#type = type as unknown as EntryType;
        
        this.#vanillaScbid = vanillaScbid;
        
    }
}

// EntryType.ts

/**
 * 可以被作为分数持有者的类型。
 * 这包括原版的实体对象，yoni的实体对象，原版的scbid，yoni的Entry，以及虚拟玩家名称，或是scbid的数字形式。
 */
type EntryValueType = Entry | Minecraft.ScoreboardIdentity | EntityValue | string | number;

enum EntryType {
    /**
     * 玩家类型的分数持有者。
     */
    PLAYER = Minecraft.ScoreboardIdentityType.player,
    /**
     * 实体类型的分数持有者。
     */
    ENTITY = Minecraft.ScoreboardIdentityType.entity,
    /**
     * 记分板虚拟玩家类型的分数持有者。
     */
    FAKE_PLAYER = Minecraft.ScoreboardIdentityType.fakePlayer,
}

// Objective.ts


/**
 * 检查传入的参数是否为整数数字，并且在 [-2^31, 2^31-1] 的区间。
 * @param {...any} scores 要检查的变量。
 * @throws 若分数不在可用的范围，抛出 `ScoreRangeError`。
 */
function checkScoreIsInRange(...scores: any[]){
    for (let s of scores){
        if (Number.isInteger(s) === false
        || s > 2147483647
        || s < -2147483648){
            throw new ScoreRangeError();
        }
    }
}

/**
 * 记分项记录了参与者以及他们的分数。
 */
class Objective {
    
    #scoreboard: any;
    
    /**
     * @type {string}
     */
    #id: string;
    
    /**
     * @type {string}
     */
    #criteria: string;
    
    /**
     * @type {string}
     */
    #displayName: string;
    
    /**
     * @type {boolean}
     */
    #unregistered: boolean = false;
    
    /**
     * @type {Minecraft.ScoreboardObjective}
     */
    #vanillaObjective: Minecraft.ScoreboardObjective;
    
    get scoreboard(){
        return this.#scoreboard;
    }

    /**
     * 记分项的标识符。
     * @returns {string}
     */
    get id(){
        return this.#id;
    }
    
    /**
     * 记分项的准则，应该为 `"dummy"`。
     * @returns {string}
     */
    get criteria(){
        return this.#criteria;
    }
    
    /**
     * 返回此记分项的玩家可见名称。
     * @returns {string}
     */
    get displayName(){
        return this.#displayName;
    }
    
    /**
     * 检测此对象对应的记分项是否已经被移除。
     * @returns {boolean} 检测结果。若已被移除，返回 `true`，否则返回 `false`。
     */
    isUnregistered(){
        if (!this.#unregistered){
            let currentVanillaObjective = VanillaScoreboard.getObjective(this.#id);
            if (currentVanillaObjective === undefined
            || currentVanillaObjective === null
            || currentVanillaObjective !== this.#vanillaObjective
            ){
                this.#unregistered = true;
            }
        }
        return this.#unregistered;
    }

    /**
     * 检查此对象对应的记分项是否被移除。
     * @throws 当此对象对应的记分项被移除时，抛出 `ObjectiveUnregisteredError`。
     */
    checkUnregistered(){
        if (this.isUnregistered())
            throw new ObjectiveUnregisteredError(this.#id);
    }
    
    /**
     * 原始记分项对象。
     * @returns {Minecraft.ScoreboardObjective} 原始记分项对象。
     */
    get vanillaObjective(): Minecraft.ScoreboardObjective {
        return this.#vanillaObjective;
    }
    
    /**
     * 将此对象对应的记分项从记分板上移除。
     */
    unregister(){
        this.checkUnregistered();
        
        VanillaScoreboard.removeObjective(this.#id);
    }
    
    /**
     * @hideconstructor
     */
    constructor(...args: [{ scoreboard: any, vanillaObjective: Minecraft.ScoreboardObjective, name: string, displayName: string, criteria: string }] | [any, string, string, string, Minecraft.ScoreboardObjective]){
        
        if (args.length === 1){
            let { scoreboard, vanillaObjective, name, displayName, criteria } = args[0];
            this.#vanillaObjective = vanillaObjective;
            this.#scoreboard = scoreboard;
            this.#id = name;
            this.#criteria = criteria;
            this.#displayName = displayName;
        } else {
            let [ scoreboard, name, criteria, displayName, vanillaObjective ] = args;
            this.#vanillaObjective = vanillaObjective;
            this.#scoreboard = scoreboard;
            this.#id = name;
            this.#criteria = criteria;
            this.#displayName = displayName;
        }
    }
    
    /**
     * 为分数持有者在记分项上增加分数。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @param {number} score - 要增加的分数。
     * @returns {Promise<void>} 执行成功后，此 `Promise` 将会敲定。
     * @throws 若分数不在可用的范围，抛出 `ScoreRangeError`。
     */
    postAddScore(one: EntryValueType, score: number){
        checkScoreIsInRange(score);
        return this.#postPlayerCommand("add", one, score)
            .then(() => {});
    }
    
    /**
     * 为分数持有者在记分项上设置一个随机的分数。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @param {number} min - 随机分数的最小值。
     * @param {number} max - 随机分数的最大值。
     * @param {boolean} [useBuiltIn] - 是否在 JavaScript 代码层面进行随机。
     *
     * 由于实现原理以及 Minecraft 自身的特性，使用 Minecraf t的随机命令时，
     * 只会有 2^64-1 种可能。
     * 如果将最小值设置为 `-2147483648`，并将最大值设置为 `2147483647`，
     * 随机的结果一定会是 `-2147483648`。
     * 
     * 如果想要避免这种情况，请将此项设置为 `true`。
     * @returns {Promise<number>|Promise<void>} 随机得到的新分数。只有在 `useBuiltIn` 被设置为 `true` 时，才会返回此结果，
     * 否则将只会返回一个 `Promise<void>`，其在完成后被敲定。
     * @throws 若分数不在可用的范围，抛出 `ScoreRangeError`。
     * @throws 若 `useBuiltIn` 为 `false` ，且 `min > max` 。
     */
    postRandomScore(one: EntryValueType, min=-2147483648, max=2147483647, useBuiltIn: boolean = true): Promise<number|void>{
        checkScoreIsInRange(min, max);
        if (useBuiltIn) {
            //在想能不能把这东西拿来随机
            //((Math.max(Math.random()*Math.random()/Math.random(), Math.random()/Math.random()*Math.random())*1000000000000000000 >>2 | 0 )<<8 )|0
            let vals = max - min;
            let randomScore = vals * Math.random();
            let result = Math.round(randomScore + min);
            return this.postSetScore(one, result);
        } else {
            if (min > max){
                throw new Error("min > max");
            }
            return this.#postPlayerCommand("random", one, min, max)
                .then(() => {});
        }
    }
    
    /**
     * 为分数持有者在记分项上减少分数。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @param {number} score - 要减少的分数。
     * @returns {Promise<void>} 执行成功后，此 `Promise` 将会敲定。
     * @throws 若分数不在可用的范围，抛出 `ScoreRangeError`。
     */
    async postRemoveScore(one: EntryValueType, score: number): Promise<void>{
        checkScoreIsInRange(score);
        return this.#postPlayerCommand("remove", one, score)
            .then(() => {});
    }
    
    /**
     * 在记分项上重置指定分数持有者的分数。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @returns {Promise<void>} 执行成功后，此 `Promise` 将会敲定。
     */
    postResetScore(one: EntryValueType): Promise<void>{
        return this.#postPlayerCommand("reset", one)
            .then(() => {});
    }
    
    /**
     * 重置所有在此记分项上的分数持有者的分数。
     * @returns {Promise<void>} 执行成功后，此 `Promise` 将会敲定。
     * @throws 未知的命令错误。
     */
    postResetScores(): Promise<void>{
        this.checkUnregistered();
        return Command.add(Command.PRIORITY_HIGHEST, 
            Command.getCommandMoreStrict("scoreboard", "players", "reset", "*", this.#id))
            .then(rt => {
                if (rt.statusCode !== StatusCode.success){
                    throw new Error(rt.statusMessage);
                }
            });
    }
    
    /**
     * 将分数持有者在记分项上的分数设置为指定的值。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @param {number} score - 要设置的分数。
     * @returns {Promise<number>} 由 `score` 指定的新分数。
     * 完成操作后，将会敲定并返回 `score`。
     * @throws 若分数不在可用的范围，抛出 `ScoreRangeError`。
     */
    postSetScore(one: EntryValueType, score: number): Promise<number>{
        checkScoreIsInRange(score);
        return this.#postPlayerCommand("set", one, score)
            .then(() => score);
    }
    
    /**
     * 异步获取分数持有者在记分项上的分数。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @returns {Promise<number>} 此分数持有者在记分项上的分数。若未设定，返回 `undefined`。
     */
    postGetScore(entry: EntryValueType){
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);
        
        return this.#postGetScore(entry as Entry);
    }
    async #postGetScore(entry: Entry){
        let scbid = entry.vanillaScbid;
        if (scbid !== undefined){
            try {
                return this.vanillaObjective.getScore(scbid);
            } catch {
                this.checkUnregistered();
                return undefined;
            }
        } else {
            this.checkUnregistered();
            return undefined;
        }
    }
    
    /**
     * 为分数持有者在记分项上执行特定的操作。
     * @param {string} option - 操作类型。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @param {...any} args - 操作所需要的参数。
     * @returns {Promise<true>} 操作成功。
     * @throws 未知的命令错误。
     * @throws 若尝试为虚拟玩家设置分数，且世界中有相同名字的玩家时，抛出 `NameConflictError`。
     */
    #postPlayerCommand(option: string, one: EntryValueType, ...args: any[]){
        let { entity, name, type } = Objective.findCommandRequirement(one);
               
        if (type === EntryType.PLAYER || type === EntryType.ENTITY){
            let cmd = Command.getCommandMoreStrict("scoreboard", "players", option, "@s", this.#id);
            return Command.addExecuteParams(Command.PRIORITY_HIGHEST, entity, cmd, ...args)
                .then((rt) => {
                    if (rt.statusCode === StatusCode.success){
                        return true;
                    }
                    this.checkUnregistered();
                    
                    //我觉得这里应该不会被执行到了，如果被执行到，请告诉我
                    throw new Error(`Could not ${option} score, `
                        + "maybe entity or player disappeared?"
                        + "\n  cause by: "
                        + rt.statusMessage);
                });
        } else {
            let cmd = Command.getCommandMoreStrict("scoreboard", "players", option, name, this.#id);
            return Command.addParams(Command.PRIORITY_HIGHEST, cmd, ...args)
                .then((rt) => {
                    if (rt.statusCode === StatusCode.success){
                        return true;
                    }
                    this.checkUnregistered();
                    
                    if ([...VanillaWorld.getPlayers({name})].length !== 0)
                        throw new NameConflictError(name as string);
                        
                    //我觉得这里应该不会被执行到了，如果被执行到，请告诉我
                    throw new Error(`Could not ${option} score, `
                        + "maybe entity or player disappeared?"
                        + "\n  cause by: "
                        + rt.statusMessage);
                });
        } 
    }
    
    /**
     * 寻找用于在记分项上执行特定的操作的与分数持有者有关的信息。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     */
    static findCommandRequirement(one: EntryValueType): {
        name?: string,
        type: EntryType,
        entity?: EntityValue,
        scbid?: Minecraft.ScoreboardIdentity,
        entry?: Entry
    }{
        let name: string | undefined = undefined;
        let type: EntryType | Minecraft.ScoreboardIdentityType;
        let entity: EntityValue | undefined = undefined;
        let scbid = (one instanceof Minecraft.ScoreboardIdentity) ? one : undefined;
        let entry = (one instanceof Entry) ? one : undefined;
        
        if (scbid != null || entry != null){
            // @ts-ignore
            type = one.type;
            if (type === EntryType.ENTITY || type === EntryType.PLAYER){
                try {
                    // @ts-ignore
                    entity = one.getEntity();
                } catch {
                    throw new Error("Could not find the entity");
                }
                if (entity == null)
                    throw new Error("Could not find the entity");
            } else {
                // @ts-ignore 不太愿意为了这个多写代码判断或者创建多一个变量的说
                name = one.displayName;
                type = EntryType.FAKE_PLAYER;
            }
        } else if (EntityBase.isEntity(one)){
            if (EntityBase.entityIsPlayer(one))
                type = EntryType.PLAYER;
            else
                type = EntryType.ENTITY;
            entity = one;
        } else if (typeof one === "string"){
            type = EntryType.FAKE_PLAYER;
            name = one;
        } else if (isFinite(Number(one))){
            if (!enableScoreboardIdentityByNumberIdQuery)
                throw new Error("scbid search by number id is disable, set 'enableScoreboardIdentityByNumberIdQuery' to 'true' to enable it");
            return Objective.findCommandRequirement(Entry.findEntry({id: Number(one)}));
        } else {
            throw new UnknownEntryError();
        }
        
        return { type, entity, name, scbid, entry };
    }
    
    /**
     * 获取分数持有者在记分项上的分数。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @returns {number} 此分数持有者在记分项上的分数。若未设定，返回 `undefined`。
     */
    getScore(one: EntryValueType): number | undefined {
        let entry: Entry;
        if (one instanceof Entry)
            entry = one;
        else
            entry = Entry.guessEntry(one);
        
        let scbid = entry.vanillaScbid;
        
        if (scbid !== undefined){
            try {
                return this.vanillaObjective.getScore(scbid);
            } catch {
                this.checkUnregistered();
                return undefined;
            }
        } else {
            return undefined;
        }
    }
    
    /**
     * 获取在此记分项上拥有分数记录的分数持有者。
     * @returns {Entry[]} 一个包含了在记分项上的分数持有者的数组。
     */
    getEntries(): Entry[] {
        this.checkUnregistered();
        let arr: Iterator<Minecraft.ScoreboardIdentity> | Array<Minecraft.ScoreboardIdentity> = this.vanillaObjective.getParticipants();
        if (!Array.isArray(arr)){
            arr = Array.from(arr);
        }
        return arr.map((scbid: Minecraft.ScoreboardIdentity) => Entry.findEntry({scbid, type: scbid.type}) );
    }
    
    /**
     * 遍历在此记分项上拥有分数记录的所有分数持有者，为其创建一个
     * `ScoreInfo` 对象，表示了这些分数持有者在此记分项上的分数。
     * @returns {ScoreInfo[]} 一个数组，包含了所有在此记分项上拥有分数记录的分数持有者的 `ScoreInfo` 对象。
     */
    getScoreInfos(){
        this.checkUnregistered();
        
        return this.getEntries()
            .map(entry => this.getScoreInfo(entry));
    }
    
    /**
     * 获取一个 `ScoreInfo` 对象，表示了分数持有者以及他在此记分项上的分数。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @param {boolean} autoInit - 如果为 `true` ，且指定的分数持有者在此记分项上的分数未定义，将会设置它的分数为0。
     * @returns {ScoreInfo}
     */
    getScoreInfo(entry: EntryValueType, autoInit: boolean = false){
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);

        let scoreInfo = new ScoreInfo(this, entry as Entry);
        
        if (autoInit == true && scoreInfo.score == null)
            scoreInfo.score = 0;
        
        return scoreInfo;
    }
    
    /**
     * 将分数持有者在记分项上的分数设置为指定的值。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @param {number} score - 要设置的分数。
     * @throws 若分数不在可用的范围，抛出 `ScoreRangeError`。
     */
    setScore(one: EntryValueType, score: number){
        checkScoreIsInRange(score);
        
        let entry: Entry;
        if (one instanceof Entry)
            entry = one;
        else
            entry = Entry.guessEntry(one);
        
        if (entry.vanillaScbid)
            this.vanillaObjective.setScore(entry.vanillaScbid, score);
        else
            throw new Error("scbid doesn't initialize");
    }
    /**
     * 为分数持有者在记分项上增加分数。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @param score - 要增加的分数。
     * @returns 执行成功后，此 `Promise` 将会敲定。
     * @throws 若分数不在可用的范围，抛出 `ScoreRangeError`。
     */
    addScore(one: EntryValueType, score: number){
        checkScoreIsInRange(score);
        
        let entry: Entry;
        if (one instanceof Entry)
            entry = one;
        else
            entry = Entry.guessEntry(one);
        
        score = (this.getScore(entry) ?? 0) + score;
        //取32位整数
        score = score >> 0;
        
        if (entry.vanillaScbid)
            this.vanillaObjective.setScore(entry.vanillaScbid, score);
        else
            throw new Error("scbid doesn't initialize");
    }
    /**
     * 为分数持有者在记分项上减少分数。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @param {number} score - 要减少的分数。
     * @returns {Promise<void>} 执行成功后，此 `Promise` 将会敲定。
     * @throws 若分数不在可用的范围，抛出 `ScoreRangeError`。
     */
    removeScore(one: EntryValueType, score: number){
        checkScoreIsInRange(score);
        
        let entry: Entry;
        if (one instanceof Entry)
            entry = one;
        else
            entry = Entry.guessEntry(one);
        
        score = (this.getScore(entry) ?? 0) - score;
        //取32位整数
        score = score >> 0;
        
        if (entry.vanillaScbid)
            this.vanillaObjective.setScore(entry.vanillaScbid, score);
        else
            throw new Error("scbid doesn't initialize");
    }
    
    /**
     * 为分数持有者在记分项上设置一个随机的分数。
     * @deprecated 由于新版本移除了runCommand()，故原有的方法
     * 不再可用，请改用 {@link Objective.postRandomScore}。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @param {number} min - 随机分数的最小值。
     * @param {number} max - 随机分数的最大值。
     * @param {boolean} [useBuiltIn] - 是否在 JavaScript 代码层面进行随机。
     *
     * 由于实现原理以及 Minecraft 自身的特性，使用 Minecraf t的随机命令时，
     * 只会有 2^64-1 种可能。
     * 如果将最小值设置为 `-2147483648`，并将最大值设置为 `2147483647`，
     * 随机的结果一定会是 `-2147483648`。
     * 
     * 如果想要避免这种情况，请将此项设置为 `true`。
     * @returns {Promise<number>} 随机得到的新分数。只有在 `useBuiltIn` 被设置为 `true` 时，才会返回此结果，
     * 否则将只会返回一个 `Promise<void>`，其在完成后被敲定。
     * @throws 若分数不在可用的范围，抛出 `ScoreRangeError`。
     * @throws 若 `useBuiltIn` 为 `false` ，且 `min > max` 。
     */
    randomScore(one: EntryValueType, min: number = -2147483647, max: number = 2147483647, useBuiltIn: boolean = true){
        return this.postRandomScore.apply(this, <any>arguments);
    }
    /**
     * 在记分项上重置指定分数持有者的分数。
     * @deprecated 由于新版本移除了runCommand()，故原有的方法
     * 不再可用，请改用 {@link Objective.postResetScore}。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @returns {Promise<void>} 执行成功后，此 `Promise` 将会敲定。
     */
    resetScore(one: EntryValueType){
        return this.postResetScore.apply(this, <any>arguments);
    }
}

// ScoreboardError.ts

/**
 * 错误：值不能作为分数。
 */
class ScoreRangeError extends RangeError {
    name = "ScoreRangeError";
    message = "Score must be an integer and must in range of [-2147483648, 2147483647].";
}

/**
 * 错误：记分项已从记分板上移除。
 */
class ObjectiveUnregisteredError extends Error {
    name = "ObjectiveUnregisteredError";
    constructor(name: string){
        super(`Objective ${name} has been unregistered.`);
    }
}

/**
 * 错误：虚拟玩家名称与游戏中正在游玩的玩家拥有相同的名字，无法为虚拟玩家设置分数。
 */
class NameConflictError extends Error {
    name = "NameConflictError";
    constructor(name: string){
        super(`Could not set score because there are name conflict! More than one ${name}`);
    }
}

/**
 * 错误：无法从可能的记分持有者的值得到记分持有者对象。
 */
class UnknownEntryError extends ReferenceError {
    name = "UnknownEntryError";
    message = "Unknown scoreboard entry.";
}

// ScoreInfo.ts

/**
 * 一个对象，包含了分数持有者，以及其在某一记分项上的分数。
 * @deprecated 无法保证某些属性可以正常工作。
 */
class ScoreInfo {
    #entry;
    #objective;
    
    /**
     * @param {Objective} obj
     * @param {Entry} entry
     */
    constructor(obj: Objective, entry: Entry){
        if (!(obj instanceof Objective))
            throw new TypeError("Not an Objective type");
        if (!(entry instanceof Entry))
            throw new TypeError("Not an Entry type");
        this.#objective = obj;
        this.#entry = entry;
    }
    
    /**
     * @param {number} score
     */
    set score(score: number | undefined){
        if (score === undefined)
            this.#objective.resetScore(this.#entry);
        else
            this.#objective.setScore(this.#entry, score);
    }
    
    /**
     * 分数持有者在记分项上的分数
     * @type {number}
     */
    get score(): number | undefined {
        return this.#objective.getScore(this.#entry);
    }
    
    /**
     * 重置此对象对应的分数持有者在对应的记分项上的分数。
     */
    reset(){
        return this.#objective.resetScore(this.#entry);
    }
    
    getEntry(){
        return this.#entry;
    }
    
    getObjective(){
        return this.#objective;
    }
    
    toString(){
        return `ScoreInfo { Score: ${this.score}, Entry: ${this.getEntry().id} }`;
    }
    
}

// SimpleScoreboard.ts
/**
 * 可用的显示位。
 */
enum DisplaySlot {
    /**
     * 在暂停菜单中显示。
     */
    list = "list",
    /**
     * 在屏幕右侧显示。
     */
    sidebar = "sidebar",
    /**
     * 在玩家名字下方显示。
     */
    belowname = "belowname",
}

/**
 * 记分项中每条项目的排序方式。
 */
 enum ObjectiveSortOrder {
    /**
     * 以正序排列项目（A-Z）。
     */
    "ascending" = "ascending",
    /**
     * 以倒序排列项目（Z-A）。
     */
    "descending" = "descending",
}

/**
 * 描述了显示位上显示的记分项，以及显示方式。
 * @interface
 * @typedef DisplayOptions
 * @property {ObjectiveSortOrder} [sortOrder] - 记分项的项目显示在此位置上时，项目排序的方式。
 * @property {Objective} objective - 显示的记分项。
 */
/**
 * 描述了显示位上显示的记分项，以及显示方式。
 */
interface DisplayOptions {
    /**
     * 显示的记分项。可能不存在。
     */
    objective: Objective | null;
    /**
     * 记分项的项目显示在此位置上时，项目排序的方式。
     */
    sortOrder?: ObjectiveSortOrder;
}



/**
 * 定义了显示位上显示的记分项，以及显示方式。
 * @interface
 * @typedef DisplayOptionsDefinition
 * @property {ObjectiveSortOrder} [sortOrder] - 记分项的项目显示在此位置上时，项目排序的方式。
 * @property {Objective|Minecraft.ScoreboardObjective|string} objective - 显示的记分项。
 */
/**
 * 定义了显示位上显示的记分项，以及显示方式。
 */
interface DisplayOptionsDefinition {
    /**
     * 显示的记分项。允许使用记分项的名称，但对应的记分项必须已被创建。
     */
    objective: Objective|Minecraft.ScoreboardObjective|string;
    /**
     * 记分项的项目显示在此位置上时，项目排序的方式。
     */
    sortOrder?: ObjectiveSortOrder;
}

/**
 * 记分板包括了记分项，分数持有者以及他们的分数。
 */
class SimpleScoreboard {
    /**
     * 存储记分项对象。
     * @type {Map<string, Objective>}
     */
    static #objectives: Map<string, Objective> = new Map();
    
    /**
     * 在记分板上添加新的记分项。
     * @param {string} name - 新的记分项的名称（标识符）。
     * @param {string} criteria - 记分项的准则，永远都应该是 `"dummy"`。
     * @param {string} [displayName] - 为新添加的记分项指定显示名称，
     * 若不指定则将 `name` 作为显示名称。
     * @returns {Objective} 添加的记分项的对象。
     * @throws 若准则不为 `"dummy"` ，抛出错误。
     * @throws 若 `name` 指定的记分项已经存在，抛出错误。
     */
    static addObjective(name: string, criteria: string = "dummy", displayName: string = name): Objective{
        if (!name || typeof name !== "string")
            throw new TypeError("Objective name not valid!");
        if (SimpleScoreboard.getObjective(name) !== null)
            throw new Error("Objective "+name+" existed!");
        if (criteria !== "dummy")
            throw new Error("Unsupported criteria: " + criteria);
        if (!name || typeof name !== "string")
            throw new TypeError("Objective display name not valid!");
        
        let vanillaObjective = VanillaScoreboard.addObjective(name, displayName);
        
        let newObjective = new Objective({
            scoreboard: SimpleScoreboard,
            name, criteria, displayName,
            vanillaObjective
        });
        SimpleScoreboard.#objectives.set(name, newObjective);
        
        return newObjective;
    }
    
    /**
     * 移除记分板上的记分项。
     * @param {string|Objective|Minecraft.ScoreboardObjective} nameOrObjective - 要移除的记分项，可以直接指定记分项的名称。
     * @returns {boolean} 是否成功移除了记分项。
     */
    static removeObjective(nameOrObjective: string|Objective|Minecraft.ScoreboardObjective): boolean{
        let objectiveId;
        if (nameOrObjective instanceof Objective || nameOrObjective instanceof Minecraft.ScoreboardObjective){
            objectiveId = nameOrObjective.id;
        } else {
            objectiveId = nameOrObjective;
        }
        if (objectiveId && typeof objectiveId === "string"){
            if (SimpleScoreboard.#objectives.has(objectiveId)){
                SimpleScoreboard.#objectives.delete(objectiveId);
            }
            try {
                return VanillaScoreboard.removeObjective(objectiveId);
            } catch {
                return false;
            }
        } else {
            throw new TypeError("unknown error while removing objective");
        }
    }
    
    /**
     * 获取名称为 `name` 的记分项对象。
     * @param {string|Minecraft.ScoreboardObjective} name - 可以代表记分项的值。
     * @param {boolean} autoCreateDummy - 如果为 `true` ，在未找到对应记分项时，创建新的记分项并返回。
     * @returns {Objective} 名称为 `name` 的记分项。
     * 若不存在名称为 `name` 的记分项，且未设置 `autoCreateDummy` 为 `true`，返回 `null`。
     * 若不存在名称为 `name` 的记分项，且设置了 `autoCreateDummy` 为 `true`，创建名称为 `name` 的记分项，并返回其对象。
     */
    static getObjective(name: string|Minecraft.ScoreboardObjective, autoCreateDummy: boolean=false): Objective {
        let result: Objective | null = null;
        
        if (name instanceof Minecraft.ScoreboardObjective){
            name = name.id;
        }
        
        let record = SimpleScoreboard.#objectives.get(name);
        let vanillaObjective = VanillaScoreboard.getObjective(name);
        if (vanillaObjective == null && autoCreateDummy){
            vanillaObjective = VanillaScoreboard.addObjective(name, name);
        }
        //这种条件下，不会将记录的结果作为返回值
        if (record == null || record.isUnregistered()){
            //这种情况下，会创建对应的记分项对象，不可以合并判断条件
            if (vanillaObjective != null){
                result = new Objective(SimpleScoreboard, name, "dummy", vanillaObjective.displayName, vanillaObjective);
                SimpleScoreboard.#objectives.set(name, result);
            }
        } else {
            result = record;
        }
        return result as unknown as Objective;
    }
    
    /** 
     * 获取记分板上的所有记分项。
     * @returns {Objective[]} 包含了所有记分项对象的数组。
     */
    static getObjectives(): Objective[]{
        return Array.from(VanillaScoreboard.getObjectives())
            .map(obj=>SimpleScoreboard.getObjective(obj.id));
    }
    
    /**
     * 获得显示位上正在显示的内容的信息。
     * @param {DisplaySlot} slot - 显示位。
     * @returns {DisplayOptions} - 显示位上显示的内容。
     */
    static getDisplayAtSlot(slot: DisplaySlot): DisplayOptions{
        let rt = VanillaScoreboard.getObjectiveAtDisplaySlot(slot);
        let result: DisplayOptions = {
            objective: rt.objective ?
                SimpleScoreboard.getObjective(rt.objective.id) :
                null
        };
        if ("sortOrder" in rt){
            result.sortOrder = rt.sortOrder as unknown as ObjectiveSortOrder;
        }
        return result;
    }
    
    static #getIdOfObjective(any: Objective | Minecraft.ScoreboardObjective | string){
         if (any instanceof Objective || any instanceof Minecraft.ScoreboardObjective){
             return any.id;
         } else if (any && typeof any === "string"){
             return any;
         } else {
             throw new TypeError("unknown objective");
         }
    }
    
    /**
     * 设置显示位上显示的记分项，并允许额外的设置。
     * @param {DisplaySlot} slot - 显示位。
     * @param {DisplayOptionsDefinition} settings - 显示位的设置。
     * @returns {Objective} 显示位先前显示的记分项的对象，若先前未显示任何记分项，返回 `undefined` 。
     */
    static setDisplayAtSlot(slot: DisplaySlot, settings: DisplayOptionsDefinition){
        let objective = SimpleScoreboard.getObjective(SimpleScoreboard.#getIdOfObjective(settings?.objective));
        
        if (objective == null){
            throw new Error("Unknown objective in settings");
        }
        
        let settingArg: Minecraft.ScoreboardObjectiveDisplayOptions;
        try { //兼容旧版
            if ("sortOrder" in settings){
                // @ts-ignore 旧版兼容，忽略类型不存在的问题。
                settingArg = new Minecraft.ScoreboardObjectiveDisplayOptions(
                    objective.vanillaObjective,
                    settings.sortOrder
                );
            } else {
                // @ts-ignore 旧版兼容，忽略类型不存在的问题。
                settingArg = new Minecraft.ScoreboardObjectiveDisplayOptions(
                    objective.vanillaObjective
                );
            }
        } catch { //新版本修改为接口
            settingArg = {
                objective: objective.vanillaObjective
            };
            if ("sortOrder" in settings){
                settingArg.sortOrder = settings.sortOrder === "ascending"
                    ? Minecraft.ObjectiveSortOrder.ascending
                    : Minecraft.ObjectiveSortOrder.descending;
            }
        }
        let lastDisplayingObjective = VanillaScoreboard.setObjectiveAtDisplaySlot(
            slot,
            settingArg
        );
        if (lastDisplayingObjective == undefined)
            return undefined;
        return SimpleScoreboard.getObjective(lastDisplayingObjective.id);
    }
    
    /**
     * 清空显示位上正显示的记分项。
     * @param {DisplaySlot} slot - 显示位。
     * @returns {Objective} 显示位先前显示的记分项，若无，返回 `null` 。
     */
    static clearDisplaySlot(slot: DisplaySlot): Objective | null{
        let rt = VanillaScoreboard.clearObjectiveAtDisplaySlot(slot);
        if (rt?.id != null){
            return SimpleScoreboard.getObjective(rt.id);
        } else {
            return null;
        }
    }
    
    /**
     * 获取记分板上记录的所有分数持有者。
     * @returns {Entry[]}
     */
    static getEntries(): Entry[]{
        let arr = VanillaScoreboard.getParticipants();
        if (!Array.isArray(arr)){
            arr = Array.from(arr);
        }
        return arr.map(scbid => Entry.findEntry({ scbid, type: scbid.type }));
    }
    
    /**
     * 移除记分板的所有记分项。
     */
    static removeAllObjectives(){
        Array.from(VanillaScoreboard.getObjectives())
            .forEach(obj=>{
                SimpleScoreboard.removeObjective(obj);
            });
    }
    
    /**
     * 以异步方式重置分数持有者的分数。
     * @param {(entry: Entry) => boolean} [filter] - 可选的过滤器函数，
     * 将所有分数持有者的 `Entry` 对象依次传入，若得到 `true` ，则重置
     * 此分数持有者的分数，否则将不会重置。
     * @returns {Promise<number>} 重置了多少分数持有者的分数。
     */
    static async postResetAllScores(filter?: (entry: Entry) => boolean): Promise<number>{
        if (arguments.length === 0){
            let rt = await Command.add(Command.PRIORITY_HIGHEST, "scoreboard players reset *");
            if (rt.statusCode !== StatusCode.success){
                throw new Error(rt.statusMessage);
            } else {
                return rt.successCount as unknown as number;
            }
        }
        let resolve: (v?: any) => void;
        let promise = new Promise((re)=>{
            resolve = re;
        });
        let entries = SimpleScoreboard.getEntries();
        let successCount = 0;
        let doneCount = 0;
        let successCountAdder = ()=>{
            successCount++;
        };
        let resolveIfDone = ()=>{
            if (++doneCount === entries.length){
                resolve(successCount);
            }
        };
        // @ts-ignore 能用，忽略类型问题。
        entries.filter(filter).forEach((id)=>{
            SimpleScoreboard.postResetScore(id)
                .then(successCountAdder)
                .finally(resolveIfDone);
        });
        return promise as Promise<number>;
    }
    
    /**
     * 重置记分板上指定分数持有者的所有分数记录。
     * @param {EntryValueType} one - 可能对应分数持有者的值。
     * @throws 当分数持有者为虚拟玩家，并且世界上存在与其名字相同的玩家时，抛出 `NameConflictError`。
     * @throws 未能在世界上找到分数持有者的实体对象时，抛出错误。
     */
    static async postResetScore(one: EntryValueType){
        let entry: Entry;
        if (one instanceof Entry)
            entry = one;
        else
            entry = Entry.guessEntry(one);
            
        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
            let ent = entry.getEntity();
            if (ent == null){
                throw new Error("Could not find the entity");
            }
            let rt = await Command.addExecuteParams(Command.PRIORITY_HIGHEST, ent, "scoreboard", "players", "reset", "@s");
            if (rt.statusCode != StatusCode.success){
                throw new Error("Could not set score, maybe entity or player disappeared?");
            }
        } else if ([...VanillaWorld.getPlayers({name: entry.displayName})].length === 0){
            let rt = await Command.add(Command.PRIORITY_HIGHEST,
                Command.getCommandMoreStrict("scoreboard", "players", "reset", entry.displayName));
            if (rt.statusCode !== StatusCode.success){
                throw new Error(rt.statusMessage);
            }
        } else {
            throw new NameConflictError(entry.displayName);
        }
    }
}

export {
    SimpleScoreboard,
    Entry,
    EntryQueryOptions,
    EntryType,
    Objective,
    ScoreRangeError,
    ObjectiveUnregisteredError,
    NameConflictError,
    UnknownEntryError,
    DisplayOptions,
    ObjectiveSortOrder,
    DisplaySlot,
    ScoreInfo,
    SimpleScoreboard,
    DisplayOptionsDefinition
}
