import { StatusCode, execCmd, dim, vanillaScoreboard } from "scripts/yoni/basis.js";
import Objective from "scripts/yoni/scoreboard/Objective.js";
import DisplaySlot from "scripts/yoni/scoreboard/DisplaySlot.js";

export default class SimpleScoreboard {
    static #objectives = new Map();
    static #displayObjectiveLocation = new Map();;
    static #entries = [];
    static addObjective(name, criteria, displayName){
        if (name == null)
            throw new Error("Objective name not null!");
        if (this.getObjective(name) != null)
            throw new Error("Objective "+name+" existed!");
        if (criteria != "dummy")
            throw new Error("Unsupported criteria: " + criteria);
        if (displayName == null)
            displayName = name;
        
        if (execCmd(dim(0), "scoreboard", "objectives", "add", name, criteria, displayName) != StatusCode.fail){
            return this.getObjective(name);
        }
        let objective = new Objective(name, criteria, displayName);
        this.#objectives.set(name, objective);
        return objective;
    }
    
    static removeObjective(name){
        let objective;
        if (name instanceof Objective){
            objective = name;
        } else if ( name instanceof VanillaScoreboardObjective ){
            objective = this.getObjective(name.id);
        } else {
            objective = this.getObjective(name);
        }
        if (objective != null && !objective.isUnregistered){
            objective.unregister();
            this.#objectives.delete(name);
        }
    }
    
    static getObjective(name){
        let objective = this.#objectives.get(name);
        let vanillaObjective;
        try {
            vanillaObjective = vanillaScoreboard.getObjective(name);
        } catch {}
        
        if (objective != null && !objective.isUnregistered){
            return objective;
        } else if (vanillaObjective != null){
            let objective = new Objective(vanillaObjective);
            this.#objectives.set(name, objective);
            return objective;
        }
        
        return null;
    }

    static getObjectives(){
        let vanillaObjectives = vanillaScoreboard.getObjectives();
        let objectives = [];
        for (let vanillaObj of vanillaObjectives){
           objectives.push(this.getObjective(vanillaObj.id));
        }
        return objectives;
    }
    
    static getObjectiveInSlot(slot){
        let hasSucnSlot = false;
        for (let s in DisplaySlot){
            if (slot = DisplaySlot[s]){
                hasSucnSlot = true;
                slot = s;
                break;
            }
        }
        if (!hasSucnSlot)
            throw new TypeError("Not a DisplaySlot type");
        return this.#displayObjectiveLocation.get(slot);
    }
    
    static setDisplaySlot(slot, objective, sequence){
        let hasSucnSlot = false;
        for (let s in DisplaySlot){
            if (slot = DisplaySlot[s]){
                hasSucnSlot = true;
                slot = s;
                break;
            }
        }
        if (!hasSucnSlot)
            throw new TypeError("Not a DisplaySlot type");
        if (!(objective instanceof Objective))
            objective = this.getObjective(objective);
        if (objective == null)
            throw new TypeError("Not a Objective or a objective name");
        
        if (slot == DisplaySlot.BELOW_NAME){
            execCmd(dim(0), "scoreboard", "objectives", "setdisplay", slot, objective.id);
        } else {
            execCmd(dim(0), "scoreboard", "objectives", "setdisplay", slot, objective.id, sequence);
        }

        this.#displayObjectiveLocation.set(slot,objective);
            
    }
    
    static clearDisplaySlot(){
        let hasSucnSlot = false;
        for (let s in DisplaySlot){
            if (slot = DisplaySlot[s]){
                hasSucnSlot = true;
                slot = s;
                break;
            }
        }
        if (!hasSucnSlot)
            throw new TypeError("Not a DisplaySlot type");
        execCmd(dim(0), "scoreboard", "objectives", "setdisplay", slot);
        this.displayObjectiveLocation.delete(slot);
    }
    
    static removeAllObjectives(){
        this.getObjectives().forEach((obj) => obj.unregister());
    }
    
    static resetAllScore(){
        execCommand(dim(0), "scoreboard", "players", "reset", "*");
    }
    
    static resetScore(entry){
        this.getObjectives().forEach((obj) => {
            obj.getScoreInfo(entry).reset();
        });
    }
}

