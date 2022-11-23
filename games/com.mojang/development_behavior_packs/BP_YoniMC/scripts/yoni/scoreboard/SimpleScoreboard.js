import { StatusCode, VanillaScoreboard, Minecraft } from "../basis.js";
import { Command } from "../command.js";
import { YoniEntity } from "yoni/entity.js";

import Objective from "./Objective.js";
import Entry from "./Entry.js";
 
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
 * Contains objectives and participants for the scoreboard.
 */
export default class SimpleScoreboard {
    /**
     * @type {Map<string, Objective>}
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
