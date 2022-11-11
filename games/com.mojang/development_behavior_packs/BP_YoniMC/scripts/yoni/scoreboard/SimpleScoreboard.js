import { StatusCode, overworld, dim, VanillaScoreboard, Minecraft } from "yoni/basis.js";

import Objective from "./Objective.js";
import Entry from "./Entry.js";

let log;
import("yoni/util/Logger.js").then((m)=>{
    log = m.log;
});
/**
 * enum of alive display slot
 */
export const DisplaySlotType = {
    list: "list",
    sidebar: "sidebar",
    belowname: "belowname"
}

/**
 * Contains objectives and participants for the scoreboard.
 */
export default class SimpleScoreboard {
    static #objectives = new Map();
    
    /**
     * @remarks
     * Adds a new objective to the scoreboard.
     * @param objectiveId
     * @param displayName
     * @throws This function can throw errors.
     */
    static addObjective(name, criteria="dummy", displayName=name){
        if (!name || typeof name !== "string")
            throw new TypeError("Objective name not valid!");
        if (this.getObjective(name) !== undefined)
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
     * @remarks
     * Removes an objective from the scoreboard.
     * @param objectiveId or Objective
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
            let inMapObjective = this.getObjective(objectiveId);
            if (!inMapObjective.isUnregister()){
                inMapObjective.unregister();
            }
            this.#objectives.delete(objectiveId);
        }
    }
    
    /**
     * @remarks
     * Returns a specific objective (by id).
     * @param objectiveId
     * @param (Boolean) if true, it will try to create a dummy objective when objective didn't exist
     * @return return Objective if existed, else return null
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
     */
    static getObjectives(){
        let objectives = [];
        Array.from(VanillaScoreboard.getObjectives()).forEach((_)=>{
            objectives.push(this.getObjective(_.id));
        });
        return objectives;
    }
    
    /**
     * @remarks
     * Returns an objective that occupies the specified display
     * slot.
     * @param displaySlotId
     * @throws This function can throw errors.
     */
    static getDisplayAtSlot(...args){
        let rt = VanillaScoreboard.getObjectiveAtDisplaySlot(...args);
        let result = {
            objective: this.getObjective(rt.objective.id),
        };
        if (sortOrder in rt){
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
             throw new Error();
         }
    }
    
    static setDisplayAtSlot(slot, settings){
        let objId = this.#getIdOfObjective(settings.objective);
        let rt = VanillaScoreboard.setObjectiveAtDisplaySlot(
            slot,
            new Minecraft.ScoreboardObjectiveDisplayOptions(
                objId,
                settings.sortOrder
            )
        );
        return this.getObjective(rt.id);
    }
    
    /**
     * @remarks
     * Clears the objective that occupies a display slot.
     * @param displaySlotId
     * @throws TypeError when slot not a DisplaySlot.
     */
    static clearDisplaySlot(slot){
        let rt = VanillaScoreboard.clearObjectiveAtDisplaySlot(slot);
        if (rt?.id !== undefined){
            return this.getObjective(rt.id);
        }
    }
    
    /**
     * @remarks
     * Returns all defined scoreboard identities.
     */
    static getEntries(){
        return Array.from(VanillaScoreboard.getParticipants())
            .map((_)=>{
                return Entry.getEntry({scbid: _, type: _.type});
            });
    }
    
    static removeAllObjectives(){
        Array.from(VanillaScoreboard.getObjectives())
            .forEach(obj=>{
                this.removeObjective(obj);
            });
    }
    
    /**
     * reset scores of all participants
     * @param particular filter function, the function will be call for every participants, if return true, then reset the scores of participants
     * @return Promise<Number> success count
     */
    static async postResetAllScore(filter){
        if (filter === undefined){
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
     * reset scores of a participant
     * @param entry
     */
    static async postResetScore(entry){
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);
        
        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
            let ent = entry.getEntity();
            if (ent === undefined){
                throw new InternalError("Could not find the entity");
            }
            if (await Command.fetchExecuteParams(ent, "scoreboard", "players", "reset", "@s").statusCode != StatusCode.success){
                throw new InternalError("Could not set score, maybe entity or player disappeared?");
            }
        } else if ([...VanillaWorld.getPlayers()].length === 0){
            if (await Command.fetchParams("scoreboard", "players", "reset", entry.displayName).statusCode !== StatusCode.success){
                throw new InternalError(rt.statusMessage);
            }
        } else {
            throw new NameConflictError(entry.displayName);
        }
    }
}

export { SimpleScoreboard }
