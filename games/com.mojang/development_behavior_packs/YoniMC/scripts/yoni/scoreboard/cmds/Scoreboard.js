import {
    world as vanillaWorld,
    ScoreboardObjective as VanillaScoreboardObjective,
    ScoreboardIdentity as VanillaScoreboardIdentity
} from "mojang-minecraft";
import { string2Byte } from "scripts/yoni/lib/text.js";
import Objective from "scripts/yoni/scoreboard/Objective.js";
import Score from "scripts/yoni/scoreboard/Score.js";
import ScoreEntry from "scripts/yoni/scoreboard/ScoreEntry.js";

const vanillaScoreboard = vanillaWorld.scoreboard;
const maxObjectiveNameLength = 16;
const maxObjectiveDisplayNameLength = 32;

export default class Scoreboard {
    static #storeObjectives = {};
    static #storeScores = new Map();
    static #storeEntries = new Map();
    static clearSlot(slot){}
    static getEntries(){}
    static getObjectiveFromVanilla(vanillaObjective){
        if (vanillaObjective instanceof VanillaScoreboardObjective){
            if (Scoreboard.#storeObjective[vanillaObjective.id] != null){
                return Scoreboard.#storeObjective[vanillaObjective.id];
            } else {
                let objective = new Objective(vanillaObjective.id, "dummy", vanillaObjective.displayName);
                Scoreboard.#storeObjective[vanillaObjective.id] = objective;
                return objective;
            }
        }
        return null;
    }
    static getObjective(name){
        let objective;
        for (let vanillaObjective of vanillaScoreboard.getObjectives()){
            if (vanillaObjective.id == name){
                objective = Scoreboard.getObjectiveFromVanilla(vanillaObjective);
                break;
            }
        }
        return objective;
    }
    static getObjectiveInSlot(slot){ // 未实现
    }
    
    static getObjectives(){
        let objectives = [];
        for (let vanillaObjective of vanillaScoreboard.getObjectives()){
            objectives.put(Scoreboard.getObjectiveFromVanilla(vanillaObjective));
        }
        return objectives;
    }
    
    static getEntryFromVanilla(vanillaParticipant){
        if (vanillaParticipant instanceof VanillaScoreboardIdentity){
            if (Scoreboard.#storeEntries.has(vanillaParticipant.id)){
                return Scoreboard.#storeEntries.get(vanillaParticipant.id);
            } else {
                let entry = new ScoreEntry(vanillaParticipant);
                Scoreboard.#storeObjective.put(vanillaObjective.id, entry);
                return entry;
            }
        }
        return null;
    }
    
    static getEntries(){
        let entries = [];
        for (let vanillaParticipant of vanillaScoreboard.getParticipants()){
            entries.push(Scoreboard.getEntryFromVanilla(vanillaParticipant));
        }
        return entries;
    }
    
    static getScores(entry){}
    
    /**
     * add a new objective to scoreboard
     * @param {String} - objective name
     * @param {String} - criteria, only "dunmy" supported
     * @param {String} - objective display name, default same as name
     * @return {Objective} - created scoreboard objective's object
     */
    static registerNewObjective(name, criteria, displayName){
        if (typeof name == "undefined" || name == null || name == "")
            throw new Error("Null objective name, cannot create objective");
        if (this.getObjective(name) != null)
            throw new Error("Objective " + name + "already existed!");
        if (criteria != "dummy")
            throw new Error("Unsupported criteria:" + criteria);
        if (typeof displayName == "undefined" || displayName == null)
            displayName = name;
        
        addObjective(name, criteria, displayName);
        
        return this.getObjective(name);
    }
    
    static resetScores(entry){}
    
    static resetObjective(objective){}
    static resetScoreboard(){}
}

function getByteLength(str){
    return string2Byte(str).length;
}

function runCommand(command = ""){
    const cmd = "scoreboard " + command;
    vanillaWorld.getDimension("overworld").runCommand(cmd);
}

function escapeCharacter(str){
    return str.replace(/\\/g,"\\\\").replace(/"/g,"\"").replace(/'/g,"\\'").replace(/ /g, "\\ ");
}

function addObjective(name, displayName){

    if (getByteLength(name) > maxObjectiveNameLength)
        throw new Error("The max length of objective name is "+maxObjectiveLength);
    
    let cmd = "objectives add " + escapeCharacter(name) + " dummy";
    
    if (getByteLength(displayName) > maxObjectiveDisplayNameLength)
        throw new Error("The max length of objective display name is "+maxDisplayNameLength);
    
    if (getByteLength(displayName) > 0)
        cmd += " " + escapeCharacter(displayName);
    }
    
    runCommand(cmd);
    
}

function removeObjective(name){
    if (getObjective(name) == null)
        return;
    let cmd = `objectives remove ${escapeCharacter(name)}`;
    runCommand(cmd);
}

