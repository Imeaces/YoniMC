import { Minecraft, VanillaWorld, StatusCode, VanillaScoreboard } from "../basis.js";

import { Command } from "../command.js";
import { Entry, EntryType } from "./Entry.js";
import { NameConflictError, ScoreRangeError, ObjectiveUnregisteredError } from "./ScoreboardError.js"

import { YoniEntity } from "../entity.js";

/**
 * check whether numbers is in range from -2^31 to 2^31-1
 * @param  {...number} scores 
 * @throws Throws when one of number not in range
 */
function checkScoreIsInRange(...scores){
    for (let s of scores){
        if (Number.isInteger(s) === false
        || s > 2147483647
        || s < -2147483648){
            throw new ScoreRangeError();
        }
    }
}

/**
 * 包含记分板的目标（记分项）和参与者（记分对象）。
 */
class Objective {
    #scoreboard;
    #objectiveOptions;
    #id;
    #criteria;
    #displayName;
    #unregistered = false;
    #vanillaObjective;
    
    /**
     * 返回指向同一记分项的对象，但是不会检查原版记分项是否存在。在项目数较多时，使用此类记分项对象可以提高性能
     * @returns {Objective} 指向同一记分项的对象，但是不会检查原版记分项是否存在
     */ 
    withoutExistenceCheck(){
        let nObj = new Objective(this);
        nObj.checkUnregistered = function(){};
    }
    
    get scoreboard(){
        return this.#scoreboard;
    }

    /**
     * 记分项的标识符。
     * @returns {string}
     * @throws This property can throw when used.
     */
    get id(){
        return this.#id;
    }
    
    /**
     * 记分项的准则
     * @throws This property can throw when used.
     */
    get criteria(){
        return this.#criteria;
    }
    
    /**
     * 返回此记分项的玩家可见名称。
     * @returns {string}
     * @throws This property can throw when used.
     */
    get displayName(){
        return this.#displayName;
    }
    
    /** 
     * 此记分项对象是否只允许使用getScore()
     * （此功能未实现）
     * @returns {boolean} 表示是否此记分项对象只允许使用getScore()
     */
    isReadOnly(){
        this.checkUnregistered();
        return !!this.#objectiveOptions?.readonly;
    }
    
    /**
     * 检测此对象对应的记分项是否已经被移除
     * @returns {boolean} 此对象对应的记分项是否已经被移除。
     */
    isUnregistered(){
        if (!this.#unregistered){
            let currentVanillaObjective = VanillaScoreboard.getObjective(this.#id);
            if (currentVanillaObjective === undefined
            || currentVanillaObjective === null
            || (
                currentVanillaObjective !== this.#vanillaObjective
                && currentVanillaObjective !== this.#vanillaObjective?.vanillaObjective
            )){
                this.#unregistered = true;
            }
        }
        return this.#unregistered;
    }

    /**
     * 检查此对象对应的记分项是否被移除
     * @throws 当此对象对应的记分项被移除时抛出错误
     */
    checkUnregistered(){
        if (this.isUnregistered())
            throw new ObjectiveUnregisteredError(this.#id);
    }
    
    /**
     * 原始记分项对象
     * @returns {Minecraft.ScoreboardObjective} 原始记分项对象
     */
    get vanillaObjective(){
        return this.#vanillaObjective;
    }
    
    /**
     * 将此对象对应的记分项从记分板上移除
     * @throws This function can throw error when objective has been unregistered.
     */
    unregister(){
        this.checkUnregistered();
        
        VanillaScoreboard.removeObjective(this.#id);
    }
    
    constructor(...args){
        
        if (args.length === 1){
            let { scoreboard, vanillaObjective, name, displayName, criteria, objectiveOptions } = args[0];
            this.#vanillaObjective = vanillaObjective;
            this.#scoreboard = scoreboard;
            this.#id = name;
            this.#criteria = criteria;
            this.#displayName = displayName;
            this.#objectiveOptions = objectiveOptions;
        } else {
            let [ scoreboard, name, criteria, displayName, vanillaObjective, objectiveOptions ] = args;
            this.#vanillaObjective = vanillaObjective;
            this.#scoreboard = scoreboard;
            this.#id = name;
            this.#criteria = criteria;
            this.#displayName = displayName;
            this.#objectiveOptions = objectiveOptions;
        }
    }
    
    /**
     * 为记分板项目在记分项上添加分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {number} score - 要添加的分数
     * @returns {Promise<number>} 记分板项目的新分数
     */
    postAddScore(entry, score){
        checkScoreIsInRange(score);
        return this.#postPlayersCommand("add", entry, score)
            .then(bool => {
                if (bool)
                    return this.getScore(entry);
                else
                    throw new InternalError("Could not add score, maybe entity or player disappeared?");
            });
    }
    
    /**
     * 为记分板项目在记分项上设置一个随机的分数。
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {number} min=-2147483647 - 随机分数的最小值
     * @param {number} max=2147483647 - 随机分数的最大值
     * @param {boolean} useBuiltIn=false - 是否在js代码层面进行随机。
     * 由于实现原理以及Minecraft自身的特性，一次随机只能有2^64-1种可能，
     * 如果将最小值设置为-2147483648，并将最大值设置为2147483647，
     * 随机的结果一定会是 -2147483648。
     * 如果想要避免这种情况，请将此项设置为true。
     * @returns {Promise<number>} 记分板项目的新分数
     */
    async postRandomScore(entry, min=-2147483648, max=2147483647, useBuiltIn=false){
        checkScoreIsInRange(min, max);
        if (useBuiltIn) {
            let vals = max - min + 1;
            let randomScore = vals * Math.random();
            let result = Math.round(randomScore + min);
            return this.postSetScore(entry, result);
        } else {
            return this.#postPlayersCommand("random", entry, min, max)
                .then(bool => {
                    if (bool)
                        return this.getScore(entry);
                    else
                        throw new InternalError("Could not random score, maybe entity or player disappeared?");
                });
        }
    }
    
    /**
     * 为记分板项目在记分项上减少指定的分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {number} score - 要减少的分数
     * @returns {Promise<number>} 记分板项目的新分数
     */
    async postRemoveScore(entry, score){
        checkScoreIsInRange(score);
        return this.#postPlayersCommand("remove", entry, score)
            .then(bool => {
                if (bool)
                    return this.getScore(entry);
                else
                    throw new InternalError("Could not remove score, maybe entity or player disappeared?");
            });
    }
    
    /**
     * 在记分项重置指定记分板项目的分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     */
    async postResetScore(entry){
        if (true !== await this.#postPlayersCommand("reset", entry)){
            throw new InternalError("Could not reset score, maybe entity or player disappeared?");
        }
    }
    
    /**
     * 重置所有在记分项上的记分板项目的分数
     */
    async postResetScores(){
        let rt = await Command.addParams(Command.PRIORITY_HIGHEST, "scoreboard", "players", "reset", "*", this.#id);
        if (rt.statusCode !== StatusCode.success){
            throw new Error(rt.statusMessage);
        }
    }
    
    /**
     * 为记分板项目在记分项上设置指定的分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {number} score - 要设置的分数
     * @returns {Promise<number>} 记分板项目的新分数
     * @throws This function can throw errors.
     */
    postSetScore(entry, score){
        checkScoreIsInRange(score);
        return this.#postPlayersCommand("set", entry, score)
            .then(bool => {
                if (bool)
                    return score;
                else
                    throw new InternalError("Could not set score, maybe entity or player disappeared?");
            });
    }
    
    /**
     * 为记分板项目在记分项上执行特定的操作
     * @param {string} option - 操作的名称
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {...any} args - 操作所需要的参数
     * @returns {Promise<boolean>} 操作是否成功
     * @throws This function can throw errors.
     */
    #postPlayersCommand(option, entry, ...args){
        this.checkUnregistered();
        
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);
        
        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
            let params = ["scoreboard", "players", option, "@s", this.#id, ...args];
            let ent = entry.getEntity();
            if (ent === undefined){
                throw new InternalError("Could not find the entity");
            }
            return Command.addExecuteParams(Command.PRIORITY_HIGHEST, ent, ...params)
                .then((rt) => rt === StatusCode.success);
        } else if ([...VanillaWorld.getPlayers({name: entry.displayName})].length === 0){
            let params = ["scoreboard", "players", option, entry.displayName, this.#id, ...args];
            return Command.addParams(Command.PRIORITY_HIGHEST, ...params)
                .then((rt) => rt.statusCode === StatusCode.success);
        } else {
            throw new NameConflictError(entry.displayName);
        }
        
    }
    
    /**
     * 获取记分板项目在记分项上的分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @returns {number} 记分板项目的分数
     * @throws This function can throw errors.
     */
    getScore(entry){
        this.checkUnregistered();
        
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);
        
        try {
            return this.vanillaObjective.getScore(entry.vanillaScbid);
        } catch {
            try {
                return this.vanillaObjective.getScore(entry.update().vanillaScbid);
            } catch { return undefined; }
        }
    }
    
    /**
     * 获取在记分项上的记分板项目
     * @returns {Entry[]} 一个包含了在记分项上的记分板项目的数组
     * @throws This function can throw errors.
     */
    getEntries(){
        this.checkUnregistered();
        
        return Array
            .from(this.vanillaObjective.getParticipants())
            .map((scbid) => Entry.getEntry({scbid, type: scbid.type}) );
    }
    
    /**
     * 获取表示了在记分项上的记分板项目的分数的对象
     * @returns {ScoreInfo[]} 一个数组，包含了所有表示了在记分项上的记分板项目的分数的对象
     * @throws This function can throw errors.
     */
    getScoreInfos(){
        this.checkUnregistered();
        
        return Array.from(this.getEntries())
            .map((_)=>{
                return this.getScoreInfo(_);
            });
    }
    
    /**
     * 获取一个可以代表一个记分板项目在此记分项上的分数的对象
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {boolean} autoInit - 如果为true，且指定的记分板项目在此记分项上的分数未定义，将会设置它的分数为0
     * @returns {ScoreInfo}
     * @throws This function can throw errors.
     */
    getScoreInfo(entry, autoInit=false){
        this.checkUnregistered();
        
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);

        let scoreInfo = new ScoreInfo(this, entry);
        if (autoInit == true && scoreInfo.score == null)
            scoreInfo.score = 0;
        return scoreInfo;
    }
    
    /**
     * 为记分板项目在记分项上设置指定的分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {number} score - 要设置的分数
     * @returns {Promise<number>} 记分板项目的新分数
     * @throws This function can throw errors.
     * @deprecated 由于新版本移除了runCommand()，故原有的方法
     * 不再可用，请改用 {@link Objective.postSetScore}
     */
    async setScore(entry, score){
        return this.postSetScore(entry, score);
    }
    /**
     * 为记分板项目在记分项上减少指定的分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {number} score - 要减少的分数
     * @returns {Promise<number>} 记分板项目的新分数
     * @deprecated 由于新版本移除了runCommand()，故原有的方法
     * 不再可用，请改用 {@link Objective.postRemoveScore}
     */
    async removeScore(entry, score){
        return this.postRemoveScore(entry, score);
    }
    /**
     * 为记分板项目在记分项上设置一个随机的分数。
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {number} min=-2147483647 - 随机分数的最小值
     * @param {number} max=2147483647 - 随机分数的最大值
     * @param {boolean} useBuiltIn=false - 是否在js代码层面进行随机
     * 由于实现原理以及Minecraft自身的特性，一次随机只能有2^64-1种可能，
     * 如果将最小值设置为-2147483648，并将最大值设置为2147483647
     * 随机的结果一定会是 -2147483648
     * 如果想要避免这种情况，请将此项设置为true
     * @returns {Promise<number>} 记分板项目的新分数
     * @deprecated 由于新版本移除了runCommand()，故原有的方法
     * 不再可用，请改用 {@link Objective.postRandomScore}
     */
    async randomScore(entry, min=-2147483647, max=2147483647, useBuiltIn=false){
        return this.postRandomScore(entry, min, max, useBuiltIn);
    }
    /**
     * 在记分项重置指定记分板项目的分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @deprecated 由于新版本移除了runCommand()，故原有的方法
     * 不再可用，请改用 {@link Objective.postResetScore}
     */
    async resetScore(entry){
        return this.postResetScore(entry);
    }
    /**
     * 为记分板项目在记分项上添加分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {number} score - 要添加的分数
     * @returns {Promise<number>} 记分板项目的新分数
     * @deprecated 由于新版本移除了runCommand()，故原有的方法
     * 不再可用，请改用 {@link Objective.postAddScore}
     */
    async addScore(entry, score){
        return this.postAddScore(entry, score);
    }
}

class ScoreInfo {
    #entry;
    #objective;
    
    /**
     * @param {Objective} obj
     * @param {Entry} entry 
     */
    constructor(obj, entry){
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
    set score(score){
        this.#objective.setScore(this.#entry, score);
    }
    
    /**
     * @type {number}
     */
    get score(){
        return this.#objective.getScore(this.#entry);
    }
    
    /**
     * 重置此对象对应的记分板项目在对应的记分项上的分数
     */
    async reset(){
        await this.#objective.postResetScore(this.#entry);
    }
    
    getEntry(){
        return this.#entry;
    }
    
    getObjective(){
        return this.#objective;
    }
    
    toString(){
        return String(this.score);
    }
    
}

export { Objective, ScoreInfo };
export default Objective;
