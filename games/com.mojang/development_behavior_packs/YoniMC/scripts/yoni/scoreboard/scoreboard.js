import * as Minecraft from "mojang-minecraft";

const VanillaWorld = Minecraft.world;
const VanillaScoreboard = VanillaWorld.scoreboard;

class StatusCode {
    static fail = -1;
    static error = 2;
    static success = 0;
}

function dim(dimid = Minecraft.MinecraftDimensionTypes.overworld){
  switch (dimid) {
    case -1:
    case "nether":
      return VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.nether);
    case 1:
    case "the end":
    case "the_end":
      return VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.theEnd);
    case 0:
    case "overworld":
       return VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.overworld);
    default:
      try {
          return VanillaWorld.getDimension(dimid);
      } catch {
          return dim(0);
      }
  }
}

/**
 * a simple function to execute command
 * @param {Runner} - a command runner
 * @params {String[]} - 
 * @return {JSON}
 */
function execCmd(runner, command, ...args){
  if (runner == null || typeof runner.runCommand != "function")
    return { StatusCode: StatusCode.error };

  args.forEach((arg) => {
    arg = String(arg);
    if (arg.replace(/\"/g, "") != arg)
      arg = arg.replace(/\"/g, "\\\"");
    if (arg.replace(/\s/g, "") != arg)
      arg = "\""+arg+"\"";
    command += "\u0020"+arg;
  });
  try {
    return runner.runCommand(command);
  } catch(err) {
    return JSON.parse(err);
  }
}


//YoniEntity是一个提供了更多操作实体的函数的类，但是我不打算放进来
let YoniEntity = function(){};

let idRecords = new Map();
let entityRecords = new Map();
let nameRecords = new Map();
let scbidRecords = new Map();
let symbolRecords = new Map();

class EntryType {
    static PLAYER = Minecraft.ScoreboardIdentityType.player;
    static ENTITY = Minecraft.ScoreboardIdentityType.entity;
    static FAKE_PLAYER = Minecraft.ScoreboardIdentityType.fakePlayer;
}

class EntryOption {
    name;
    id;
    scbid;
    entity;
    type;
}

class Entry {
    static #fakePlayerEntity = Symbol("fakePlayerEntity");
    static get fakePlayerEntity(){
        return this.#fakePlayerEntity;
    }
    
    static guessEntry(any){
        if (any instanceof Minecraft.ScoreboardIdentity)
            return this.getEntry({scbid: any});
        if (any instanceof YoniEntity || any instanceof Minecraft.Entity || any instanceof Minecraft.Player)
            return this.getEntry({entity: any});
        if (typeof any === "string")
            return this.getEntry({name: any, type: EntryType.FAKE_PLAYER});
        if (!isNaN(Number(any)))
            return this.getEntry({id: any});
        throw new Error("Sorry, couldn't guess the entry");
    }
    
    static getEntries(){
        return symbolRecords.values();
    }
    
    static getEntry(option){
        let { entity, id, name, scbid, type } = option;
        entity = (entity instanceof YoniEntity) ? YoniEntity.vanillaEntity : entity;
        
        let symbol;
        
        //优先级: entity, scbid, id, name
        let e = entityRecords.get(entity);
        let i = idRecords.get(id);
        let n = nameRecords.get(name);
        let s = scbidRecords.get(scbid);
        
        for (let _ of [e, s, i, n]){
            if (_ == null)
                continue;
            symbol = _;
        }
        
        if (symbol === undefined){
            symbol = Symbol("entry");
            let newEntry = new Entry(option);
            symbolRecords.set(symbol, newEntry);
        }
        
        let entry = symbolRecords.get(symbol);
        
        if (entry.getEntity() != null)
            entityRecords.set(entry.getEntity(), symbol);
        if (entry.id != null)
            idRecords.set(entry.id, symbol);
        if (entry.vanillaScbid != null)
            scbidRecords.set(entry.vanillaScbid, symbol);
        if (entry.displayName != null && type === EntryType.FAKE_PLAYER)
            nameRecords.set(entry.displayName, symbol);
            
        if (type != null && entry.type !== type)
            throw new Error("entry type do not matches");
        return entry;
    }
    
    #type;
    #id;
    #displayName;
    #vanillaScbid;
    
    get type(){
        return this.#type;
    }
    get id(){
        if (this.#id == null && this.vanillaScbid != null){
            this.#id = this.vanillaScbid.id;
        } else if (this.#id !== this.vanillaScbid.id){
            this.#id = null;
            this.#vanillaScbid = null;
        }
        return this.#id;
    }
    get displayName(){
        if (this.vanillaScbid != null){
            this.#displayName = this.vanillaScbid.displayName;
        } else if (this.type == EntryType.PLAYER){
            this.#displayName = this.getEntity().name;
        } else if (this.type == EntryType.ENTITY){
            this.#displayName = this.id;
        }
        return this.#displayName;
    }
    
    get vanillaScbid(){
        if (this.#entity?.scoreboard != null && this.#entity.scoreboard !== this.#vanillaScbid){
            this.#vanillaScbid = this.#entity?.scoreboard;
        }
        return this.#vanillaScbid;
    }
    
    #entity;
    getEntity(){
        if (this.vanillaScbid != null && this.#type !== EntryType.FAKE_PLAYER){
            try {
                this.#entity = this.vanillaScbid.getEntity();
            } catch {}
        }
        return this.#entity;
    }
    
    constructor(option){
        
        let { entity, id, name, scbid, type } = option;
        entity = (entity instanceof YoniEntity) ? YoniEntity.vanillaEntity : entity;
        
        let condF;
        if (name == null) condF = function (e){ return e.id === id; };
        else if (id == null && type === EntryType.FAKE_PLAYER) condF = function (e){ return e.type === EntryType.FAKE_PLAYER && e.displayName === name; };
        else condF = function (e){ return e.displayName === name && e.id === id; };
        
        /*
        entity scbid
        scbid entity, id
        type entity, scbid 
        id scbid
        name entity, scbid, id
        */
        if (entity == null){
            if (scbid != null){
                entity = function (){
                    try {
                        return scbid.getEntity();
                    } catch {}
                }();
            }
        }

        if (scbid == null){
           if (entity?.scoreboard != null){
               scbid = entity.scoreboard;
           } else if (id != null || type === EntryType.FAKE_PLAYER && name != null){
               scbid = function (){
                   for (let _ of VanillaScoreboard.getParticipants()){
                       if (condF(_)){
                           return _;
                       }
                   }
               }();
           }
        }
        
        if (id == null){
            if (scbid != null){
                id = scbid.id;
            }
        }
        
        if (type == null){
            if (scbid != null){
                type = scbid.type;
            } else if (entity != null){
                if (entity instanceof Minecraft.Entity){
                    type = EntryType.ENTITY;
                } else if (entity instanceof Minecraft.Player){
                    type = EntryType.PLAYER;
                }
            } else {
                type = EntryType.FAKE_PLAYER;
            }
        }
        
        if (name == null){
            if (scbid != null){
                name = scbid.displayName;
            } else if (type === EntryType.PLAYER && entity != null){
                name = entity.name;
            }
        }
        
        this.#displayName = name;
        this.#id = id;
        this.#vanillaScbid = scbid;
        this.#entity = entity;
        this.#type = type;
        
    }
}

class ScoreRangeError extends Error {
    name = "ScoreRangeError";
    constructor(){
        super();
        this.message = "Score can only range -2147483648 to 2147483647";
    }
}

class ObjectiveUnregisteredError extends Error {
    name = "ObjectiveUnregisteredError";
    constructor(name){
        super();
        this.message = `Objective ${name} has been unregistered.`
    }
}

class NameConflictError extends Error {
    name = "NameConflictError";
    constructor(name){
        super();
        this.message = `Could not set score because there are name conflict! More than one ${name}`;
    }
}

class Objective {
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

class Utils {
    static isBetweenRange(score){ //由于数字被限制在int范围内，所以这函数其实没啥用，但是既然写了就懒得改了
        return !(score > 2147483647 || score < -2147483648);
    }
}

class DisplaySlotType {
    static list = "lisy";
    static sidebar = "sidebar";
    static belowname = "belowname";
    
    static *[Symbol.iterator](){
        yield "sidebar";
        yield "belowname";
        yield "list";
    }
}

class SimpleScoreboard {
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

export default SimpleScoreboard;
export {
    SimpleScoreboard,
    DisplaySlotType,
    Objective,
    ScoreInfo,
    Entry,
    EntryType,
    EntryOption,
}
export { SimpleScoreboard as Scoreboard };
export { NameConflictError, ScoreRangeError, ObjectiveUnregisteredError };
