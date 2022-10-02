import { Minecraft, VanillaWorld, execCmd, StatusCode, dim, VanillaScoreboard } from "yoni/basis.js";
import Utils from "yoni/scoreboard/Utils.js";
import { Entry, EntryType } from "yoni/scoreboard/Entry.js";
import { NameConflictError, ScoreRangeError, ObjectiveUnregisteredError } from "yoni/scoreboard/ScoreboardError.js"

const objectiveTypes = Object.create(null);

/**
 * Contains objectives and participants for the scoreboard.
 */
class Objective {
    static hasCriteria(name){
        return objectiveTypes[name] !== undefined;
    }
    static addCriteria(name, objectiveType){
        if (this.hasCriteria(name))
            throw new Error(`Criteria existed! (${name})`);
        
        objectiveTypes[name] = objectiveType;
    }
    
    static create(scoreboard, nameOrObj, criteria, displayName){
        let name;
        if (nameOrObj instanceof Minecraft.ScoreboardObjective){
            name = nameOrObj.id;
            criteria = "dummy";
            displayName = nameOrObj.displayName;
        } else if (typeof nameOrObj === "string"){
            name = nameOrObj;
        } else {
            throw new TypeError("argument [1] should be a string or Minecraft.ScoreboardObjective");
        }
        
        if (this.hasCriteria(criteria)){
            let objectiveType = objectiveTypes[criteria];
            let newObjective = new objectiveType(scoreboard, name, criteria, displayName);
            return newObjective;
        } else {
            throw new Error(`Unknown criteria: ${criteria}`);
        }
    }
    
    #scoreboard;
    
    /**
     * Identifier of the scoreboard objective.
     * @throws This property can throw when used.
     */
    get id(){
        this.checkUnregistered();

        return this.#id;
    }
    #id;
    
    /**
     * Returns the criteria of the objective
     * @throws This property can throw when used.
     */
    get criteria(){
        this.checkUnregistered();

        return this.#criteria;
    }
    #criteria;
    
    /**
     * Returns the player-visible name of this scoreboard
     * objective.
     * @throws This property can throw when used.
     */
    get displayName(){
        this.checkUnregistered();
        
        return this.#displayName;
    }
    #displayName;
    
    /**
     * Returns whether the objective has been removed.
     */
    get isUnregistered(){
        if (this.#isUnregistered){
            return true;
        } else if (this.#vanillaObjective !== VanillaScoreboard.getObjective(this.#id)){
            this.#isUnregistered = true;
            return true;
        }
        return false;
    }
    #isUnregistered = false;

    /**
     * Returns whether the objective has been removed.
     * @throws Throw when the objective has been removed.
     */
    checkUnregistered(){
        if (this.isUnregistered)
            throw new ObjectiveUnregisteredError(this.#id);
    }
    
    /**
     * Returns the origin objective class of this scoreboard
     * objective.
     * @return {Minecraft.ScoreboardObjective}
     */
    get vanillaObjective(){
        return this.#vanillaObjective;
    }
    #vanillaObjective;
    
    /**
     * @remarks
     * Remove this objective
     * @throws This function can throw error when objective has been unregistered.
     */
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
            this.#vanillaObjective = VanillaScoreboard.getObjective(name);
        }
        if (this.#vanillaObjective == null){
            this.#vanillaObjective = VanillaScoreboard.addObjective(name, displayName);
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

        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
            let ent = entry.getEntity();
            if (ent == null){
                throw new InternalError("Could not find the entity");
            } else if (execCmd(ent, "scoreboard", "players", "reset", "@s", this.#id).statusCode != StatusCode.success){
                throw new InternalError("Could not set score, maybe entity or player disappeared?");
            }
        } else if ([...VanillaWorld.getPlayers()].length === 0){
            execCmd(dim(0), "scoreboard", "players", "reset", entry.displayName, this.#id);
        } else {
            throw new NameConflictError(entry.displayName);
        }
        
    }
    
    resetScores(){
        this.checkUnregistered();

        execCmd(dim(0), "scoreboard", "players", "reset", "*", this.#id);
    }
    
    /**
     * @remarks
     * Set a specific score for a participant.
     * @param entry, or other thing that can be set score
     * @param {Number} an integer number
     * @throws This function can throw errors.
     */
    setScore(entry, score){
        this.checkUnregistered();
        
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);

        if (!Number.isInteger(score))
            throw new TypeError("Score can only be an integer number");
            
        if (!Utils.isBetweenRange(score))
            throw new ScoreRangeError();
        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
            let ent = entry.getEntity();
            if (ent == null){
                throw new InternalError("Could not find the entity");
            } else if (execCmd(ent, "scoreboard", "players", "set", "@s", this.#id, score).statusCode != StatusCode.success){
                throw new InternalError("Could not set score, maybe entity or player disappeared?");
            }
        } else if ([...VanillaWorld.getPlayers({name: entry.displayName})].length === 0){
            execCmd(dim(0), "scoreboard", "players", "set", entry.displayName, this.#id, score);
        } else {
            throw new NameConflictError(entry.displayName);
        }
        
    }
    
    /**
     * @remarks
     * Returns a specific score for a participant.
     * @param participant
     * @return {Number} - the score of entry
     * @throws This function can throw errors.
     */
    getScore(entry){
        this.checkUnregistered();
        
        if (!(entry instanceof Entry))
            entry = Entry.guessEntry(entry);
        
        try {
            return this.vanillaObjective.getScore(entry.vanillaScbid);
        } catch {
            try {
                return this.vanillaObjective.getScore(entry.update().vanillaScbid);
            } catch { return undefined; }
        }
    }
    
    /**
     * @remarks
     * Returns all objective participant identities.
     * @throws This function can throw errors.
     */
    getEntries(){
        this.checkUnregistered();
        
        return Array.from(this.vanillaObjective.getParticipants())
            .map((_) => {
                return Entry.getEntry({scbid: _, type: scbid.type});
            });
    }
    
    /**
     * @remarks
     * Returns specific scores for this objective for all
     * participants.
     * @throws This function can throw errors.
     */
    getScoreInfos(){
        this.checkUnregistered();
        
        return Array.from(getEntries())
            .map((_)=>{
                return this.getScoreInfo(_)
            });
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

Objective.addCriteria("dummy", Objective);

class ScoreInfo {
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

export { Objective, ScoreInfo, objectiveTypes as ObjectTypes };
export default Objective;