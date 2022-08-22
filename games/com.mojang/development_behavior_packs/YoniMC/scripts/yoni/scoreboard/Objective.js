import Utils from "scripts/yoni/scoreboard/Utils.js";
import ScoreInfo from "scripts/yoni/scoreboard/ScoreInfo.js";
import Entry from "scripts/yoni/scoreboard/Entry.js";
import EntryType from "scripts/yoni/scoreboard/EntryType.js";
import {
    ScoreboardObjective as VanillaScoreboardObjective,
    Entity as VanillaEntity,
    Player as VanillaPlayer,
    ScoreboardIdentity as VanillaScoreboardIdentity
} from "mojang-minecraft";
import { execCmd as execCommand, dim, VanillaScoreboard } from "scripts/yoni/basis.js";

export default class Objective {
    #isUnregistered = false;
    #id;
    get id(){
        if (this.isUnregistered) throw new Error("Objective has been removed!");
        
        return this.#id;
    }
    #criteria;
    get criteria(){
        if (this.isUnregistered) throw new Error("Objective has been removed!");
        
        return this.#criteria;
    }
    #displayName;
    get displayName(){
        if (this.isUnregistered) throw new Error("Objective has been removed!");
        
        return this.#displayName;
    }
    
    get isUnregistered(){
        let result = false;
        if (this.#isUnregistered){
            result = true;
        } else {
            try {
                VanillaScoreboard.getObjective(this.#id);
            } catch {
                result = true;
                this.unregister();
            }
        }
        return result;
    }
    
    #scores = new Map();

    #vanillaObjective;
    get vanillaObjective(){
        if (this.isUnregistered) throw new Error("Objective has been removed!");
        
        return this.#vanillaObjective;
    }
    
    unregister(){
        if (this.#isUnregistered) throw new Error("Objective has been removed!");
        
        this.#isUnregistered = true;
        
        if (this.#vanillaObjective != null){
            execCommand(dim(0), "scoreboard", "objectives", "remove", this.#id);
        }
    }
    
    constructor(name, criteria, displayName){
        
        if (name instanceof VanillaScoreboardObjective){
            let vanillaObj = name;
            name = vanillaObj.id;
            criteria = "dummy";
            displayName = vanillaObj.displayName;
            this.#vanillaObjective = vanillaObj;
        }
        
        this.#id = name;
        this.#criteria = criteria;
        this.#displayName = displayName;
        
    }
    addScore(entry, score){
        if (this.isUnregistered) throw new Error("Objective has been removed!");

        if (!Utils.isBetweenRange(score))
            throw new RangeError("Score can only range -2147483648 to 2147483647");

        let scoreInfo = this.getScoreInfo(entry, true);
        let newScore = (scoreInfo.score + score + 1) % (2**31) - 1;
        scoreInfo.score = newScore;
    }
    randomScore(entry, min=-2147483648, max=2147483647){
        if (this.isUnregistered) throw new Error("Objective has been removed!");

        if (!Utils.isBetweenRange(min))
            throw new RangeError("Score can only range -2147483648 to 2147483647");
        if (!Utils.isBetweenRange(max))
            throw new RangeError("Score can only range -2147483648 to 2147483647");
        
        let scoreInfo = this.getScoreInfo(entry);
        let newScore = Math.round((max - min) * Math.random() + min);
        scoreInfo.score = newScore;
        return newScore;
    }
    removeScore(entry, score){
        if (this.isUnregistered) throw new Error("Objective has been removed!");

        if (!Utils.isBetweenRange(score))
            throw new RangeError("Score can only range -2147483648 to 2147483647");

        let scoreInfo = this.getScoreInfo(entry, true);
        let newScore = (scoreInfo.score - score + 1) % (2**31) - 1;
        scoreInfo.score = newScore;
    }
    resetScore(entry){
        if (this.isUnregistered) throw new Error("Objective has been removed!");

        this.getScoreInfo(entry).reset();
    }
    
    resetScores(){
        execCommand(dim(0), "scoreboard", "players", "reset", "*", this.#id);
    }
    
    setScore(entry, score){
        if (this.isUnregistered) throw new Error("Objective has been removed!");

        let scoreInfo = this.getScoreInfo(entry);
        scoreInfo.score = score;
    }
    
    getScore(entry){
        if (this.isUnregistered) throw new Error("Objective has been removed!");

        return this.getScoreInfo(entry).score;
    }
    
    getScores(...args){
        if (this.isUnregistered) throw new Error("Objective has been removed!");

        this.getScoreInfos(...args);
    }
    
    getEntries(){
        if (this.isUnregistered) throw new Error("Objective has been removed!");
        
        let entriesInObj = [];
        let entries = this.#vanillaObjective.getParticipants();
        Array.from(entries).forEach((scbid) => {
            if (this.getScoreInfo(scbid).score != null){
                entriesInObj.push(this.getScoreInfo(scbid).getEntry());
            }
        });
        return entriesInObj;
    }
    
    getScoreInfos(){
        if (this.isUnregistered) throw new Error("Objective has been removed!");

        this.getEntries();
        return this.#scores.values();
    }
    
    getScoreInfo(entry, autoInit=false){
        if (this.isUnregistered) throw new Error("Objective has been removed!");
        
        if (!(entry instanceof Entry))
            entry = Entry.getEntry(entry, null, null, null);

        if (!(entry instanceof Entry))
            throw new TypeError("Not an Entry type or cannot cover to an Entry");

        let scoreInfo = this.#scores.get(entry);
        if (scoreInfo == null) {
            scoreInfo = new ScoreInfo(this, entry);
            this.#scores.set(entry, scoreInfo);
        }
        if (autoInit == true && scoreInfo.score == null)
            scoreInfo.score = 0;
        return scoreInfo;
    }
}
