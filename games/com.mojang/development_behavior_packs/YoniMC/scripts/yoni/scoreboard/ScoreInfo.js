import Utils from "scripts/yoni/scoreboard/Utils.js";
import Entry from "scripts/yoni/scoreboard/Entry.js";
import Objective from "scripts/yoni/scoreboard/Objective.js";
import EntryType from "scripts/yoni/scoreboard/EntryType.js";
import { StatusCode, execCmd, dim, vanillaScoreboard } from "scripts/yoni/basis.js";
import { getLoadedEntities } from "scripts/yoni/util/yoni-lib.js";

//基础功能已实现
 
export default class ScoreInfo {
    #entry;
    #score = null;
    #objective;
    
    constructor(obj, entry){
        if (!(obj instanceof Objective))
            throw new TypeError("Not an Objective type");
        if (!(entry instanceof Entry))
            throw new TypeError("Not an Entry type");
        this.#objective = obj;
        this.#entry = entry;
    }
    
    set score(score){
        if (typeof score != "number" || isNaN(score))
            throw new TypeError("Score can only be a real number");
            
        if (!Utils.isBetweenRange(score))
            throw new RangeError("Score can only range -2147483648 to 2147483647");
            
        if (this.#entry.type == EntryType.PLAYER || this.#entry.type == EntryType.ENTITY){
            let isSuccess = false;;
            for (let e of getLoadedEntities()){
                if (e === this.#entry.getEntity()){
                    if (execCmd(this.#entry.getEntity(), "scoreboard", "players", "set", "@s", this.#objective.id, score) != StatusCode.fail){
                        isSuccess = true;
                        break;
                    }
                }
            }
            if (!isSuccess)
                throw new Error("Could not set score, maybe entity or player disappeared?");
        } else {
        
            let hasConflict = false;
            
            VanillaWorld.getPlayers().forEach((pl) => {
                if (pl.name = this.#entry.displayName){
                    hasConflict = true;
                }
            });
            
            if (hasConflict){
                throw new Error("Could not set score because there are name conflict! (more than one "+this.#entry.displayName+")");
            }
            
            execCmd(this.#entry.getEntity(), "scoreboard", "players", "set", this.#entry.displayName, this.#objective.id, score);
            
        }
        
    }
    
    get score(){
        let score;
        if (this.#entry.vanillaScbId == null){
            score = null;
        } else {
            try {
                score = this.#objective.vanillaObjective.getScore(this.#entry.vanillaScbId);
            } catch { score = null; }
        }
        return score;
    }
    
    reset(){
        if (this.#entry.type == EntryType.PLAYER || this.#entry.type == EntryType.ENTITY){
            let isSuccess = false;;
            for (let e of getLoadedEntities()){
                if (e === this.#entry.getEntity()){
                    if (execCmd(this.#entry.getEntity(), "scoreboard", "players", "reset", "@s") != StatusCode.fail){
                        isSuccess = true;
                        break;
                    }
                }
            }
            if (!isSuccess)
                throw new Error("Could not set score, maybe entity or player disappeared?");
        } else {
        
            let hasConflict = false;
            
            VanillaWorld.getPlayers().forEach((pl) => {
                if (pl.name = this.#entry.displayName){
                    hasConflict = true;
                }
            });
            
            if (hasConflict){
                throw new Error("Could not set score because there are name conflict! (more than one "+this.#entry.displayName+")");
            }
            
            execCmd(this.#entry.getEntity(), "scoreboard", "players", "reset", this.#entry.displayName, this.#objective.id);
            
        }
        
        this.#score = null;
        
    }
    
    getEntry(){
        return this.#entry;
    }
    
    getObjective(){
        return this.#objective;
    }
    
    toString(){
        return String(this.#score);
    }
    
}


