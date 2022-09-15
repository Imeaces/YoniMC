import { Minecraft, execCmd, StatusCode, dim, VanillaScoreboard } from "scripts/yoni/basis.js";
import Utils from "scripts/yoni/scoreboard/Utils.js";
import { Entry, EntryType } from "scripts/yoni/scoreboard/Entry.js";
import { NameConflictError, ScoreRangeError, ObjectiveUnregisteredError } from "scripts/yoni/scoreboard/ScoreboardError.js"

export default class Objective {
    #scoreboard;
    
    #id;
    get id(){
        this.checkUnregistered();

        return this.#id;
    }
    
    #criteria;
    get criteria(){
        this.checkUnregistered();

        return this.#criteria;
    }
    
    #displayName;
    get displayName(){
        this.checkUnregistered();
        
        return this.#displayName;
    }
    
    #isUnregistered = false;
    get isUnregistered(){
        if (this.#isUnregistered){
            return true;
        } else if (this.vanillaObjective === null){
            this.#isUnregistered = true;
            return true;
        } else if (this.#scoreboard.getObjective(this.#id) !== this){
            this.#isUnregistered = true;
            return true;
        }
        return false;
    }
    checkUnregistered(){
        if (this.isUnregistered)
            throw new ObjectiveUnregisteredError(this.#id);
    }
    
    #vanillaObjective;
    get vanillaObjective(){
        let vanilla = ()=>{
            try {
                return VanillaScoreboard.getObjective(this.#id);
            } catch {}
        }();
        if (vanilla === this.#vanillaObjective)
            return vanilla;
        else
            return null;
            
    }
    
    unregister(){
        this.checkUnregistered();
        
        if (this.vanillaObjective != null){
            VanillaScoreboard.removeObjective(this.#id);
        }
    }
    
    constructor(scoreboard, name, criteria, displayName){
        
        this.#scoreboard = scoreboard;
        
        if (name instanceof Minecraft.ScoreboardObjective){
            this.#vanillaObjective = name;
            name = this.#vanillaObjective.id;
            criteria = "dummy";
            displayName = this.#vanillaObjective.displayName;
        } else {
            this.#vanillaObjective = VanillaScoreboard.get(name);
        }
        
        this.#id = name;
        this.#criteria = criteria;
        this.#displayName = displayName;
        
    }
    
    addScore(entry, score){
        this.checkUnregistered();

        if (!Number.isInteger(score))
            throw new TypeError("Score can only be an integer number");

        if (!Utils.isBetweenRange(score))
            throw new ScoreRangeError();
        
        let newScore = (this.getScore(entry) + score + 1) % (2**31) - 1;
        this.setScore(entry, newScore);
    }
    
    randomScore(entry, min=-2147483648, max=2147483647){
        this.checkUnregistered();

        if (!Number.isInteger(min) || !Number.isInteger(max))
            throw new TypeError("Score can only be an integer number");

        if (!Utils.isBetweenRange(min) || !Utils.isBetweenRange(max))
            throw new ScoreRangeError();
        
        let newScore = Math.round((max - min) * Math.random() + min);
        this.setScore(entry, newScore);
        return newScore;
    }
    
    removeScore(entry, score){
        this.checkUnregistered();

        if (!Number.isInteger(score))
            throw new TypeError("Score can only be an integer number");

        if (!Utils.isBetweenRange(score))
            throw new ScoreRangeError();

        let newScore = (this.getScore(entry) - score + 1) % (2**31) - 1;
        this.setScore(entry, newScore);
    }
    
    resetScore(entry){
        this.checkUnregistered();

        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);

        if (entry.type === EntryType.PLAYER || type === EntryType.ENTITY){
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
            if (ent == null){
                throw new InternalError("Could not find the entity");
            }
            if (execCmd(ent, "scoreboard", "players", "reset", "@s", this.#id).statusCode != StatusCode.success){
                throw new InternalError("Could not set score, maybe entity or player disappeared?");
            }
        } else {
        
            for (let pl of Minecraft.getPlayers()){
                if (pl.name = entry.displayName){
                    throw new NameConflictError(entry.displayName);
                }
            }

            execCmd(dim(0), "scoreboard", "players", "reset", entry.displayName, this.#id);
            
        }
        
    }
    
    resetScores(){
        this.checkUnregistered();

        execCmd(dim(0), "scoreboard", "players", "reset", "*", this.#id);
    }
    
    setScore(entry, score){
        this.checkUnregistered();

        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);

        if (!Number.isInteger(score))
            throw new TypeError("Score can only be an integer number");
            
        if (!Utils.isBetweenRange(score))
            throw new ScoreRangeError();
        
        if (entry.type === EntryType.PLAYER || type === EntryType.ENTITY){
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
            if (ent == null){
                throw new InternalError("Could not find the entity");
            }
            if (execCmd(ent, "scoreboard", "players", "set", "@s", this.#id, score).statusCode != StatusCode.success){
                throw new InternalError("Could not set score, maybe entity or player disappeared?");
            }
        } else {
        
            for (let pl of Minecraft.getPlayers()){
                if (pl.name = entry.displayName){
                    throw new NameConflictError(entry.displayName);
                }
            }

            execCmd(dim(0), "scoreboard", "players", "set", entry.displayName, this.#id, score);
            
        }
        
    }
    
    getScore(entry){
        this.checkUnregistered();
        
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);

        let score;
        let scbid = entry.vanillaScbId;
        if (scbid == null){
            score = undefined;
        } else {
            score = this.vanillaObjective.getScore(scbid);
        }
        return score;
    }
    
    getEntries(){
        this.checkUnregistered();
        
        let entries = [];
        Array.from(this.vanillaObjective.getParticipants()).forEach((_) => {
            entries.push(Entry.getEntry({scbid: _, type: scbid.type}));
        });
        return entries;
    }
    
    getScoreInfos(){
        this.checkUnregistered();
        
        let scoreInfos = [];
        Array.from(getEntries()).forEach((_)=>{
            scoreInfos.push(this.getScoreInfo(_));
        });
        return scoreInfos;
    }
    
    getScoreInfo(entry, autoInit=false){
        this.checkUnregistered();
        
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);

        let scoreInfo = new ScoreInfo(this, entry);
        if (autoInit == true && scoreInfo.score == null)
            scoreInfo.score = 0;
        return scoreInfo;
    }
}

export class ScoreInfo {
    #entry;
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
        this.#objective.setScore(this.#entry, score);
    }
    
    get score(){
        return this.#objective.getScore(this.#entry);
    }
    
    reset(){
        this.#objective.resetScore(this.#entry);
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

export { Objective }
