import Utils from "scripts/yoni/scoreboard/Utils.js";
import ScoreInfo from "scripts/yoni/scoreboard/ScoreInfo.js";
import Entry from "scripts/yoni/scoreboard/Entry.js";
import EntryType from "scripts/yoni/scoreboard/EntryType.js";
import { Minecraft, execCmd as execCommand, dim, VanillaScoreboard } from "scripts/yoni/basis.js";

export default class Objective {
    #scoreboard;
    
    #id;
    get id(){
        checkUnregistered();
        
        return this.#id;
    }
    
    #criteria;
    get criteria(){
        checkUnregistered();
        
        return this.#criteria;
    }
    
    #displayName;
    get displayName(){
        checkUnregistered();
        
        return this.#displayName;
    }
    
    #isUnregistered;
    get checkUnregistered(){
        let result = false;
        if (this.#scoreboard._getObjectiveMap().get(this.#id) == null){
            result = true;
        } else if (this.vanillaObjective == null){
            this.#scoreboard.removeObjective(this);
            result = true;
        }
        return result;
    }
    
    #scores = new Map();

    get vanillaObjective(){
        try {
            return VanillaScoreboard.getObjective(this.#id);
        } catch {
            return null;
        }
    }
    
    unregister(){
        checkUnregistered();
        
        if (this.vanillaObjective != null){
            vanillaScoreboard.removeObjective(this.#id);
        }
    }
    
    checkUnregistered(){
        if (this.isUnregistered) throw new Error("Objective has been removed!");
    }
    
    constructor(scoreboard, name, criteria, displayName){
        
        this.#scoreboard = scoreboard;
        
        if (name instanceof Minecraft.ScoreboardObjective){
            let vanillaObj = name;
            name = vanillaObj.id;
            criteria = "dummy";
            displayName = vanillaObj.displayName;
        }
        
        this.#id = name;
        this.#criteria = criteria;
        this.#displayName = displayName;
        
    }
    addScore(entry, score){
        checkUnregistered();

        if (!Utils.isBetweenRange(score))
            throw new RangeError("Score can only range -2147483648 to 2147483647");

        let scoreInfo = this.getScoreInfo(entry, true);
        let newScore = (scoreInfo.score + score + 1) % (2**31) - 1;
        scoreInfo.score = newScore;
    }
    randomScore(entry, min=-2147483648, max=2147483647){
        checkUnregistered();

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
        checkUnregistered();

        if (!Utils.isBetweenRange(score))
            throw new RangeError("Score can only range -2147483648 to 2147483647");

        let scoreInfo = this.getScoreInfo(entry, true);
        let newScore = (scoreInfo.score - score + 1) % (2**31) - 1;
        scoreInfo.score = newScore;
    }
    resetScore(entry){
        checkUnregistered();

        this.getScoreInfo(entry).reset();
    }
    
    resetScores(){
        checkUnregistered();

        execCommand(dim(0), "scoreboard", "players", "reset", "*", this.#id);
    }
    
    setScore(entry, score){
        checkUnregistered();

        let scoreInfo = this.getScoreInfo(entry);
        scoreInfo.score = score;
    }
    
    getScore(entry){
        checkUnregistered();

        return this.getScoreInfo(entry).score;
    }
    
    getEntries(){
        checkUnregistered();
        
        let entriesInObj = [];
        let entries = this.#vanillaObjective.getParticipants();
        Array.from(entries).forEach((_) => {
            if (this.getScoreInfo(_).score != null){
                entriesInObj.push(this.getScoreInfo(_).getEntry());
            }
        });
        return entriesInObj;
    }
    
    getScoreInfos(){
        checkUnregistered();

        this.getEntries();
        return this.#scores.values();
    }
    
    getScoreInfo(entry, autoInit=false){
        checkUnregistered();
        
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
