import { StatusCode, execCmd, dim, VanillaScoreboard, Minecraft } from "scripts/yoni/basis.js";
import Objective from "scripts/yoni/scoreboard/Objective.js";

/**
 * enum of alive display slot
 */
export class DisplaySlotType {
    static list = "list";
    static sidebar = "sidebar";
    static belowname = "belowname";
    
    static *[Symbol.iterator](){
        yield "sidebar";
        yield "belowname";
        yield "list";
    }
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
    static addObjective(name, criteria="dummy", displayName=null){
        if (name == null)
            throw new Error("Objective name not null!");
        if (this.getObjective(name) != null)
            throw new Error("Objective "+name+" existed!");
        if (!Objective.hasCriteria(criteria))
            throw new Error("Unsupported criteria: " + criteria);
        if (displayName === null)
            displayName = name;
        
        for (let char of name){
            if (char.charCodeAt() < 32){
                throw new Error("name contains Ascii Control Character");
            }
        }
        if (name !== displayName){
            for (let char of displayName){
                if (char.charCodeAt() < 32){
                    throw new Error("displayName contains Ascii Control Character");
                }
            }
        }
        let newObjective = Objective.create(this, name, criteria, displayName);
        this.#objectives.set(name, newObjective);
        
        return newObjective;
    }
    
    /**
     * @remarks
     * Removes an objective from the scoreboard.
     * @param objectiveId or Objective
     */
    static removeObjective(name){
        let objective;
        if (name instanceof Objective){
            objective = name;
        } else if ( name instanceof Minecraft.ScoreboardObjective ){
            objective = this.getObjective(name.id);
        } else {
            objective = this.getObjective(name);
        }
        if (objective != null && !objective.isUnregistered){
            objective.unregister();
        }
        this.#objectives.delete(name);
    }
    
    /**
     * @remarks
     * Returns a specific objective (by id).
     * @param objectiveId
     * @param (Boolean) if true, it will try to create a dummy objective when objective didn't exist
     * @return return Objective if existed, else return null
     */
    static getObjective(name, autoCreateDummy=false){
        let objective = this.#objectives.has(name) ? this.#objectives.get(name) : null;
        
        if (objective?.isUnregistered === false){
            return objective;
        }
        
        let vanillaObjective = ()=>{
            try {
                return VanillaScoreboard.getObjective(name);
            } catch {}
        }();
        if (objective === null && vanillaObjective != null){
            let newObjective = new Objective(this, vanillaObjective);
            this.#objectives.set(name, newObjective);
            return newObjective;
        } else if (vanillaObjective == null && autoCreateDummy === true){
            let newObjective = this.addObjective(name, "dummy");
            return newObjective;
        }
        
        return null;
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
    static getObjectiveInSlot(slot){
        if (!Array.from(DisplaySlotType).includes(slot))
            throw new TypeError("Not a DisplaySlot type");
        return this.getObjective(VanillaScoreboard.getObjectiveAtDisplaySlot(slot).id);
    }
    
    static setDisplaySlot(slot, objective, sequence){
        if (!Array.from(DisplaySlotType).includes(slot))
            throw new TypeError("Not a DisplaySlot type");
        if (!(objective instanceof Objective))
            objective = this.getObjective(objective);
        if (objective == null)
            throw new TypeError("Not a Objective or a objective name");
        
        if (slot == DisplaySlotType.BELOW_NAME){
            execCmd(dim(0), "scoreboard", "objectives", "setdisplay", slot, objective.id);
        } else {
            execCmd(dim(0), "scoreboard", "objectives", "setdisplay", slot, objective.id, sequence);
        }

    }
    
    /**
     * @remarks
     * Clears the objective that occupies a display slot.
     * @param displaySlotId
     * @throws TypeError when slot not a DisplaySlot.
     */
    static clearDisplaySlot(slot){
        if (!Array.from(DisplaySlotType).includes(slot)){
            throw new TypeError("Not a DisplaySlot type");
        }
        return VanillaScoreboard.clearObjectiveAtDisplaySlot(slot);
    }
    
    /**
     * @remarks
     * Returns all defined scoreboard identities.
     */
    static getEntries(){
        return Array.from(VanillaScoreboard.getParticipants())
            .map((_)=>{
                return Entry.getEntry({scbid: _, type: scbid.type});
            });
    }
    
    static removeAllObjectives(){
        this.getObjectives().forEach((obj) => obj.unregister());
    }
    
    /**
     * reset scores of all participants
     * @param particular filter function, the function will be call for every participants, if return true, then reset the scores of participants
     */
    static resetAllScore(filter){
        if (filter === undefined){
            execCommand(dim(0), "scoreboard", "players", "reset", "*");
            return;
        }
        
        [...SimpleScoreboard.getEntries()].forEach(id=>{
            if (filter(id)){
                SimpleScoreboard.resetScore(id);
            }
        });
    }
    
    /**
     * reset scores of a participant
     * @param entry
     */
    static resetScore(entry){
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);
        
        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
            let ent;
            if (entry.type == EntryType.PLAYER){
                ent = entry.getEntity();
            } else {
                let entryEnt = entry.getEntity();
                for (let e of YoniEntitiy.getAliveEntities()){
                    if (e === entryEnt){
                        ent = e;
                        break;
                    }
                }
            }
            if (ent === undefined){
                throw new InternalError("Could not find the entity");
            }
            if (execCmd(ent, "scoreboard", "players", "reset", "@s").statusCode != StatusCode.success){
                throw new InternalError("Could not set score, maybe entity or player disappeared?");
            }
        } else {
        
            for (let pl of Minecraft.getPlayers()){
                if (pl.name = entry.displayName){
                    throw new NameConflictError(entry.displayName);
                }
            }

            execCmd(dim(0), "scoreboard", "players", "reset", entry.displayName);
            
        }
    }
}

export { SimpleScoreboard }
