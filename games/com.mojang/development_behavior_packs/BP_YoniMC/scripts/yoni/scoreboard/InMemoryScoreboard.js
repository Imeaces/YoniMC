 
/**
 * @readonly
 * @enum
 * enum of alive display slot
 */
export const DisplaySlotType = {
    /** @type {DisplaySlot} */
    list: "list",
    /** @type {DisplaySlot} */
    sidebar: "sidebar",
    /** @type {DisplaySlot} */
    belowname: "belowname"
}

export const ObjectiveSortOrder = {
    /** @type {SortOrder} */
    "ascending": "ascending",
    /** @type {SortOrder} */
    "descending": "descending"
}

/**
 * @interface
 * 与显示位置有关的类型
 * @typedef {Object} DisplayOptions
 * @property {SortOrder} [sortOrder] - 如果可能，在此位置上排序使用的方式
 * @property {Objective|Minecraft.ScoreboardObjective|string} objective - 此位置上显示的记分项
 */


/**
 * check whether numbers is in range from -2^31 to 2^31-1
 * @param  {...number} scores 
 * @throws Throws when one of number not in range
 */
function checkScoreIsInRange(...scores) {
    for (let s of scores) {
        if (Number.isInteger(s) === false
            || s > 2147483647
            || s < -2147483648) {
            throw new ScoreRangeError();
        }
    }
}

/**
 * 包含记分板的目标（记分项）和参与者（记分对象）。
 */
export class InMemoryObjective {
    #scoreboard;
    #objectiveOptions;
    #id;
    #criteria;
    #displayName;
    #unregistered = false;
    #vanillaObjective;

    get scoreboard() {
        return this.#scoreboard;
    }

    /**
     * 记分项的标识符。
     * @returns {string}
     * @throws This property can throw when used.
     */
    get id() {
        return this.#id;
    }

    /**
     * 记分项的准则
     * @throws This property can throw when used.
     */
    get criteria() {
        return this.#criteria;
    }

    /**
     * 返回此记分项的玩家可见名称。
     * @returns {string}
     * @throws This property can throw when used.
     */
    get displayName() {
        return this.#displayName;
    }

    /** 
     * 此记分项对象是否只允许使用getScore()
     * （此功能未实现）
     * @returns {boolean} 表示是否此记分项对象只允许使用getScore()
     */
    isReadOnly() {
        this.checkUnregistered();
        return !!this.#objectiveOptions?.readonly;
    }

    /**
     * 检测此对象对应的记分项是否已经被移除
     * @returns {boolean} 此对象对应的记分项是否已经被移除。
     */
    isUnregistered() {
        if (!this.#unregistered) {
            let currentVanillaObjective = VanillaScoreboard.getObjective(this.#id);
            if (currentVanillaObjective === undefined
                || currentVanillaObjective === null
                || (
                    currentVanillaObjective !== this.#vanillaObjective
                    && currentVanillaObjective !== this.#vanillaObjective?.vanillaObjective
                )) {
                this.#unregistered = true;
            }
        }
        return this.#unregistered;
    }

    /**
     * 检查此对象对应的记分项是否被移除
     * @throws 当此对象对应的记分项被移除时抛出错误
     */
    checkUnregistered() {
        if (this.isUnregistered())
            throw new ObjectiveUnregisteredError(this.#id);
    }

    /**
     * 原始记分项对象
     * @returns {Minecraft.ScoreboardObjective} 原始记分项对象
     */
    get vanillaObjective() {
        return this.#vanillaObjective;
    }

    /**
     * 将此对象对应的记分项从记分板上移除
     * @throws This function can throw error when objective has been unregistered.
     */
    unregister() {
        this.checkUnregistered();

        VanillaScoreboard.removeObjective(this.#id);
    }

    constructor(...args) {

        if (args.length === 1) {
            let { scoreboard, vanillaObjective, name, displayName, criteria, objectiveOptions } = args[0];
            this.#vanillaObjective = vanillaObjective;
            this.#scoreboard = scoreboard;
            this.#id = name;
            this.#criteria = criteria;
            this.#displayName = displayName;
            this.#objectiveOptions = objectiveOptions;
        } else {
            let [scoreboard, name, criteria, displayName, vanillaObjective, objectiveOptions] = args;
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
    async postAddScore(entry, score) {
        checkScoreIsInRange(score);
        if (!await this.#postPlayersCommand("add", entry, score)) {
            throw new InternalError("Could not add score, maybe entity or player disappeared?");
        }
        return this.getScore(entry);
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
    async postRandomScore(entry, min = -2147483648, max = 2147483647, useBuiltIn = false) {
        checkScoreIsInRange(min, max);
        if (useBuiltIn) {
            let vals = max - min + 1;
            let randomScore = vals * Math.random();
            let result = Math.round(randomScore + min);
            return this.postSetScore(entry, result);
        } else if (!await this.#postPlayersCommand("random", entry, min, max)) {
            throw new InternalError("Could not random score, maybe entity or player disappeared?");
        }
        return this.getScore(entry);
    }

    /**
     * 为记分板项目在记分项上减少指定的分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {number} score - 要减少的分数
     * @returns {Promise<number>} 记分板项目的新分数
     */
    async postRemoveScore(entry, score) {
        checkScoreIsInRange(score);
        if (!await this.#postPlayersCommand("remove", entry, score)) {
            throw new InternalError("Could not remove score, maybe entity or player disappeared?");
        }
        return this.getScore(entry);
    }

    /**
     * 在记分项重置指定记分板项目的分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     */
    async postResetScore(entry) {
        if (!await this.#postPlayersCommand("reset", entry)) {
            throw new InternalError("Could not reset score, maybe entity or player disappeared?");
        }
    }

    /**
     * 重置所有在记分项上的记分板项目的分数
     */
    async postResetScores() {
        let rt = await Command.addParams(Command.PRIORITY_HIGHEST, "scoreboard", "players", "reset", "*", this.#id);
        if (rt.statusCode !== StatusCode.success) {
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
    async postSetScore(entry, score) {
        checkScoreIsInRange(score);
        if (!await this.#postPlayersCommand("set", entry, score)) {
            throw new InternalError("Could not set score, maybe entity or player disappeared?");
        }
        return score;
    }

    /**
     * 为记分板项目在记分项上执行特定的操作
     * @param {string} option - 操作的名称
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @param {...any} args - 操作所需要的参数
     * @returns {Promise<boolean>} 操作是否成功
     * @throws This function can throw errors.
     */
    async #postPlayersCommand(option, entry, ...args) {
        this.checkUnregistered();

        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);

        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY) {
            let params = ["scoreboard", "players", option, "@s", this.#id, ...args];
            let ent = entry.getEntity();
            if (ent === undefined) {
                throw new InternalError("Could not find the entity");
            }
            let rt = await Command.addExecuteParams(Command.PRIORITY_HIGHEST, ent, ...params);
            return rt.statusCode === StatusCode.success;
        } else if ([...VanillaWorld.getPlayers({ name: entry.displayName })].length === 0) {
            let params = ["scoreboard", "players", option, entry.displayName, this.#id, ...args];
            let rt = await Command.addParams(Command.PRIORITY_HIGHEST, ...params);
            return rt.statusCode === StatusCode.success;
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
    getScore(entry) {
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
    getEntries() {
        this.checkUnregistered();

        return Array
            .from(this.vanillaObjective.getParticipants())
            .map((scbid) => Entry.getEntry({ scbid, type: scbid.type }));
    }

    /**
     * 获取表示了在记分项上的记分板项目的分数的对象
     * @returns {ScoreInfo[]} 一个数组，包含了所有表示了在记分项上的记分板项目的分数的对象
     * @throws This function can throw errors.
     */
    getScoreInfos() {
        this.checkUnregistered();

        return Array.from(this.getEntries())
            .map((_) => {
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
    getScoreInfo(entry, autoInit = false) {
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
    async setScore(entry, score) {
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
    async removeScore(entry, score) {
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
    async randomScore(entry, min = -2147483647, max = 2147483647, useBuiltIn = false) {
        return this.postRandomScore(entry, min, max, useBuiltIn);
    }
    /**
     * 在记分项重置指定记分板项目的分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry - 可以作为记分板项目的东西
     * @deprecated 由于新版本移除了runCommand()，故原有的方法
     * 不再可用，请改用 {@link Objective.postResetScore}
     */
    async resetScore(entry) {
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
    async addScore(entry, score) {
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
    constructor(obj, entry) {
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
    set score(score) {
        this.#objective.setScore(this.#entry, score);
    }

    /**
     * @type {number}
     */
    get score() {
        return this.#objective.getScore(this.#entry);
    }

    /**
     * 重置此对象对应的记分板项目在对应的记分项上的分数
     */
    async reset() {
        await this.#objective.postResetScore(this.#entry);
    }

    getEntry() {
        return this.#entry;
    }

    getObjective() {
        return this.#objective;
    }

    toString() {
        return String(this.score);
    }

}


/**
 * Contains objectives and participants for the scoreboard.
 */
export class InMemoryScoreboard {
    /**
     * @type {Map<string, InMemoryObjective>}
     */
    static #objectives = new Map();
    
    /**
     * Adds a new objective to the scoreboard.
     * @param {string} name - name of new objective
     * @param {string} criteria - criteria of new objective, current only accept "dummy"
     * @param {string} displayName - displayName of new
     * objective, default is equals to name
     * @returns {Objective} new objective
     * @throws This function can throw errors.
     */
    static addObjective(name, criteria="dummy", displayName=name){
        if (!name || typeof name !== "string")
            throw new TypeError("Objective name not valid!");
        if (this.getObjective(name) !== null)
            throw new Error("Objective "+name+" existed!");
        if (criteria !== "dummy")
            throw new Error("Unsupported criteria: " + criteria);
        if (!name || typeof name !== "string")
            throw new TypeError("Objective display name not valid!");
        
        let vanillaObjective = VanillaScoreboard.addObjective(name, displayName);
        
        let newObjective = new Objective({
            scoreboard: this,
            name, criteria, displayName,
            vanillaObjective
        });
        this.#objectives.set(name, newObjective);
        
        return newObjective;
    }
    
    /**
     * @remarks Removes an objective from the scoreboard.
     * @param {string|Objective|Minecraft.ScoreboardObjective} nameOrObjective - objectiveId or Objective
     * @throws Throws when cannot determine the objective
     */
    static removeObjective(nameOrObjective){
        let objectiveId;
        if (nameOrObjective instanceof Objective || nameOrObjective instanceof Minecraft.ScoreboardObjective){
            objectiveId = nameOrObjective.id;
        } else {
            objectiveId = nameOrObjective;
        }
        if (objectiveId && typeof objectiveId === "string"){
            try { VanillaScoreboard.removeObjective(objectiveId); } catch {}
        } else {
            throw new Error("unknown error while removing objective");
        }
        if (this.#objectives.has(objectiveId)){
            this.#objectives.delete(objectiveId);
        }
    }
    
    /**
     * Returns a specific objective (by id).
     * @param {string} name - objectiveId
     * @param {boolean} autoCreateDummy - if true, it will try to create a dummy objective when objective didn't exist
     * @returns {?Objective} return Objective if existed, else return null
     */
    static getObjective(name, autoCreateDummy=false){
        let result = null;
        let objective = this.#objectives.get(name);
        let vanillaObjective = (()=>{
            let rt = VanillaScoreboard.getObjective(name);
            if (rt == null && autoCreateDummy){
                rt = VanillaScoreboard.addObjective(name, name);
            }
            return rt;
        })();
        if (objective === undefined || objective.isUnregistered()){
            if (vanillaObjective != null){
                result = new Objective(this, name, "dummy", vanillaObjective.displayName, vanillaObjective);
                this.#objectives.set(name, result);
            }
        } else {
            result = objective;
        }
        return result;
    }
    
    /** 
     * @remarks
     * Returns all defined objectives.
     * @returns {Objective[]} an array contains all defined objectives.
     */
    static getObjectives(){
        return Array.from(VanillaScoreboard.getObjectives())
            .map(obj=>this.getObjective(obj.id));
    }
    
    /**
     * Returns an objective that occupies the specified display
     * slot.
     * @param {DisplaySlot} slot
     * @returns {DisplayOptions}
     * @throws This function can throw errors.
     */
    static getDisplayAtSlot(slot){
        let rt = VanillaScoreboard.getObjectiveAtDisplaySlot(slot);
        let result = {
            objective: rt.objective ?
                this.getObjective(rt.objective.id) :
                null
        };
        if ("sortOrder" in rt){
            result.sortOrder = rt.sortOrder;
        }
        return result;
    }
    
    static #getIdOfObjective(any){
         if (any instanceof Objective || any instanceof Minecraft.ScoreboardObjective){
             return any.id
         } else if (any && typeof any === "string"){
             return any;
         } else {
             throw new TypeError();
         }
    }
    /**
     * @remarks
     * 在指定位置上显示记分项
     * @param {DisplaySlot} slot - 位置的id
     * @param {DisplayOptions} settings - 对于显示方式的设置
     * @returns {Objective} 指定显示位置的记分项对应的对象
     */
    static setDisplayAtSlot(slot, settings){
        let obj = this.getObjective(this.#getIdOfObjective(settings.objective));
        let settingArg;
        try {
            if ("sortOrder" in settings){
                settingArg = new Minecraft.ScoreboardObjectiveDisplayOptions(
                    obj.vanillaObjective,
                    settings.sortOrder
                );
            } else {
                settingArg = new Minecraft.ScoreboardObjectiveDisplayOptions(
                    obj.vanillaObjective
                );
            }
        } catch {
            settingArg = {
                objective: obj.vanillaObjective
            };
            if ("sortOrder" in settings){
                settingArg.sortOrder = settings.sortOrder
            }
        }
        VanillaScoreboard.setObjectiveAtDisplaySlot(
            slot,
            settingArg
        );
        return obj;
    }
    
    /**
     * @remarks
     * Clears the objective that occupies a display slot.
     * @param {DisplaySlot} slot - 位置的id
     * @returns {?Objective}
     * @throws TypeError when slot not a DisplaySlot.
     */
    static clearDisplaySlot(slot){
        let rt = VanillaScoreboard.clearObjectiveAtDisplaySlot(slot);
        if (rt?.id !== undefined){
            return this.getObjective(rt.id);
        } else {
            return null;
        }
    }
    
    /**
     * @remarks
     * Returns all defined scoreboard identities.
     * @returns {Entry[]}
     */
    static getEntries(){
        return Array.from(VanillaScoreboard.getParticipants())
            .map((scbid) => Entry.getEntry({
                scbid,
                type: scbid.type
            }));
    }
    
    /**
     * remove all objectives from scoreboard
     */
    static removeAllObjectives(){
        Array.from(VanillaScoreboard.getObjectives())
            .forEach(obj=>{
                this.removeObjective(obj);
            });
    }
    
    /**
     * reset scores of all participants (in asynchronously)
     * @param {(entry:Entry) => boolean} filter - particular 
     * filter function, the function will be call for each 
     * participants, if return true, then reset the scores of 
     * participants
     * @return {Promise<number>} success count
     */
    static async postResetAllScore(filter=null){
        if (filter === null){
            let rt = await Command.fetch("scoreboard players reset *");
            if (rt.statusCode){
                throw new Error(rt.statusMessage);
            } else {
                return;
            }
        }
        let resolve;
        let promise = new Promise((re)=>{
            resolve = re;
        });
        let entries = this.getEntries();
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
        entries.filter(filter).forEach((id)=>{
            this.postResetScore(id)
                .then(successCountAdder)
                .finally(resolveIfDone);
        });
        return promise;
    }
    
    /**
     * 重置记分板上指定项目的所有分数
     * @param {Entry|Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} entry 
     */
    static async postResetScore(entry){
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);
        
        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
            let ent = entry.getEntity();
            if (ent == null){
                throw new InternalError("Could not find the entity");
            }
            let rt = await Command.addExecuteParams(Command.PRIORITY_HIGHEST, ent, "scoreboard", "players", "reset", "@s");
            if (rt.statusCode != StatusCode.success){
                throw new InternalError("Could not set score, maybe entity or player disappeared?");
            }
        } else if ([...VanillaWorld.getPlayers({name: entry.displayName})].length === 0){
            let rt = await Command.addParams(Command.PRIORITY_HIGHEST, "scoreboard", "players", "reset", entry.displayName);
            if (rt.statusCode !== StatusCode.success){
                throw new InternalError(rt.statusMessage);
            }
        } else {
            throw new NameConflictError(entry.displayName);
        }
    }
}

export { SimpleScoreboard }
