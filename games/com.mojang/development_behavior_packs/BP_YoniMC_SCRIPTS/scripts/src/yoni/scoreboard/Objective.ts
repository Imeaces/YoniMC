import { Minecraft, VanillaWorld, StatusCode, VanillaScoreboard, overworld } from "../basis.js";
 
import { Entry } from "./Entry.js";
import { EntryValueType, EntryType } from "./EntryType.js";
import { ScoreInfo } from "./ScoreInfo.js";
import { SimpleScoreboard } from "./SimpleScoreboard.js";
import {
    NameConflictError,
    ScoreRangeError,
    ObjectiveUnregisteredError,
    UnknownEntryError
} from "./ScoreboardError.js"

import {
    useOptionalFasterCode,
    enableScoreboardIdentityByNumberIdQuery,
    emitLegacyMode
} from "../config.js";
import { EntityBase } from "../entity.js";
import { EntityValue } from "../entity/EntityTypeDefs.js";
import { Command } from "../command.js";

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
        
        score = this.getScore(entry) ?? 0 + score;
        //取32位整数
        score = score >> 0;
        
        if (entry.vanillaScbid)
            this.vanillaObjective.setScore(entry.vanillaScbid, score);
        
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
        
        score = this.getScore(entry) ?? 0 - score;
        //取32位整数
        score = score >> 0;
        
        if (entry.vanillaScbid)
            this.vanillaObjective.setScore(entry.vanillaScbid, score);
        
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

export { Objective, ScoreInfo };
export default Objective;
