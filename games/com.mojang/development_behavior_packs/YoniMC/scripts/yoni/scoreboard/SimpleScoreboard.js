import { StatusCode, execCmd, dim, VanillaScoreboard } from "scripts/yoni/basis.js";
import Objective from "scripts/yoni/scoreboard/Objective.js";
import DisplaySlot from "scripts/yoni/scoreboard/DisplaySlot.js";

export default class SimpleScoreboard {
    static #objectives = new Map();
    static #shadowObjectives = new Map();
    static #displayObjectiveLocation = new Map();;
    static #entries = [];
    
    static _getObjectiveMap(){
        return this.#objectives;
    }
    
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
        for (let char of displayName){
            if (char.charCodeAt() < 32){
                throw new Error("displayName contains Ascii Control Character");
            }
        }
        
        if (execCmd(dim(0), "scoreboard", "objectives", "add", name, criteria, displayName).statusCode = StatusCode.success)
            return this.getObjective(name);
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
        if (objective !== undefined && !objective.isUnregistered){
            objective.unregister();
            this.#objectives.delete(name);
            this.#shadoeObjectives.set(name, objective);
        }
    }
    
    static getObjective(name, autoCreateDummy=false){
        let objective = this.#objectives.get(name);
        let shadowObjective = this.#shadowObjectives.get(name);
        let vanillaObjective = ()=>{
            try {
                return VanillaScoreboard.getObjective(name);
            } catch {}
        }();
        
        if (objective != null && shadowObjective == null && vanillaObjective != null){
            return objective;
        } else if (objective == null && shadowObjective != null && vanillaObjective != null){
            this.#shadowObjectives.delete(name);
            this.#objectives.set(name, shadowObjective);
            return shadowObjective;
        } else if (objective == null && shadowObjective == null && vanillaObjective != null){
            let objective = new Objective(this, vanillaObjective);
            this.#objectives.set(name, objective);
            return objective;
        } else if (vanillaObjective == null && autoCreateDummy == true){
            let newObjective;
            if (objective != null || shadowObjective != null){
                newObjective = (objective == null) ? shadowObjective : objective;
            } else {
                newObjective = this.addObjective(name, "dummy");
            }
            
            return newObjective;
        } else if (shadowObjective != null && objective != null){
            //我认为这种情况正常不可能出现
            console.warn(`错误，${name}同时存在objective与shadowObjective，尝试修复中`);
            if (vanillaObjective == null){
                this.#objectives.delete(name);
            } else {
                this.#shadowObjectives.delete(name);
            }
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

