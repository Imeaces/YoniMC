import { StatusCode, execCmd, dim, VanillaScoreboard, Minecraft } from "scripts/yoni/basis.js";
import Objective from "scripts/yoni/scoreboard/Objective.js";

export class DisplaySlotType {
    static list = "lisy";
    static sidebar = "sidebar";
    static belowname = "belowname";
    
    static *[Symbol.iterator](){
        yield "sidebar";
        yield "belowname";
        yield "list";
    }
}


export default class SimpleScoreboard {
    static #objectives = new Map();
    
    static addObjective(name, criteria="dummy", displayName=null){
        if (name == null)
            throw new Error("Objective name not null!");
        if (this.getObjective(name) != null)
            throw new Error("Objective "+name+" existed!");
        if (criteria != "dummy")
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
        
        if (execCmd(dim(0), "scoreboard", "objectives", "add", name, criteria, displayName).statusCode = StatusCode.success)
            return this.getObjective(name);
    }
    
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
    
    static getObjective(name, autoCreateDummy=false){
        let objective = this.#objectives.get(name);
        let vanillaObjective = ()=>{
            try {
                return VanillaScoreboard.getObjective(name);
            } catch {}
        }();
        
        if (vanillaObjective != null && objective?.vanillaObjective != null){
            return objective;
        } else if (objective == null && vanillaObjective != null){
            this.#objectives.delete(name);
            let newObjective = new Objective(this, vanillaObjective);
            this.#objectives.set(name, newObjective);
            return newObjective;
        } else if (vanillaObjective == null && autoCreateDummy === true){
            let newObjective = this.addObjective(name, "dummy");
            return newObjective;
        }
        
        return null;
    }

    static getObjectives(){
        let objectives = [];
        Array.from(VanillaScoreboard.getObjectives()).forEach((_)=>{
            objectives.push(this.getObjective(_.id));
        });
        return objectives;
    }
    
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
    
    static clearDisplaySlot(slot){
        if (!Array.from(DisplaySlotType).includes(slot)){
            throw new TypeError("Not a DisplaySlot type");
        }
        return VanillaScoreboard.clearObjectiveAtDisplaySlot(slot);
    }
    
    static getEntries(){
        let entries;
        Array.from(VanillaScoreboard.getParticipants()).forEach((_)=>{
            entries.push(Entry.getEntry({scbid: _, type: scbid.type}));
        });
        return entries;
    }
    
    static removeAllObjectives(){
        this.getObjectives().forEach((obj) => obj.unregister());
    }
    
    static resetAllScore(){
        execCommand(dim(0), "scoreboard", "players", "reset", "*");
    }
    
    static resetScore(entry){
        this.getObjectives().forEach((obj) => {
            obj.resetScore(entry);
        });
    }
}

