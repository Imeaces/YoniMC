import {
    ScoreboardIdentity as VanillaScoreboardIdentity,
    Player as VanillaPlayer,
    Entity as VanillaEntity
} from "mojang-minecraft";
import { vanillaScoreboard } from "scripts/yoni/basis.js";
import EntryType from "scripts/yoni/scoreboard/EntryType.js";

let idRecords = new Map();
let entityRecords = new Map();
let nameRecords = new Map();

function recordEntry(entry){
}


export default class Entry {
    
    static getEntries(){
        let entries = [];
        Array.from(vanillaScoreboard.getParticipants()).forEach((scbId) => {
            let entry = this.getEntry(scbId);
            if (!entries.includes(entry))
                entries.push(entry);
            
        });
        return entryRecords.slice();
    }
    
    static getEntry(id, type, displayName, entity){
        let vanillaScbId;
        if (id instanceof VanillaScoreboardIdentity){
            vanillaScbId = id;
            id = vanillaScbId.id;
            type = vanillaScbId.type;
            
            if (vanillaScbId.displayName != null){
                displayName = vanillaScbId.displayName;
            }
            if (type == EntryType.ENTITY){
                displayName = id;
            }
            if (type == EntryType.FAKE_PLAYER){
                entity = null;
            } else {
                entity = vanillaScbId.getEntity();
            }
            
        }

        let entityRecord;
        let idRecord;
        let nameRecord;
        let record;
        
        if (type != EntryType.FAKE_PLAYER && entity != null)
            entityRecord = entityRecords.get(entity);
        if (!isNaN(Number(id)))
            idRecord = idRecords.get(id);
        if (type == EntryType.FAKE_PLAYER && displayName != null)
            nameRecord = nameRecords.get(displayName);
        
        switch (type){
            // FAKE_PLAYER 优先 name
            case EntryType.FAKE_PLAYER:
                if (idRecord !== nameRecord && nameRecord != null)
                    idRecord = nameRecord;
                
                if (nameRecord != null)
                    record = nameRecord;
                else if (idRecord != null)
                    record = idRecord;
                
                break;
            // ENTITY 优先 entity
            case EntryType.PLAYER:
            case EntryType.ENTITY:
                if (idRecord !== entityRecord && entityRecord != null)
                    idRecord = entityRecord;
                
                if (entityRecord != null)
                    record = entityRecord;
                else if (idRecord != null)
                    record = idRecord;
                
                break;
            default:
                throw new TypeError("Unknown type "+type)
        }
        
        if (record == null){
            if (vanillaScbId != null){
                record = new Entry(vanillaScbId);
            } else {
                record = new Entry(id, type, displayName, entity);
            }
        }
        
        if (record != null){
            switch (type){
                // FAKE_PLAYER 优先 name
                case EntryType.FAKE_PLAYER:
                    if (id != null)
                        idRecords.set(id, record);
                    if (displayName != null)
                        nameRecords.set(displayName, record);
                    break;
                // ENTITY 优先 entity
                case EntryType.PLAYER:
                case EntryType.ENTITY:
                    if (id != null)
                        idRecords.set(id, record);
                    if (entity != null)
                        entityRecords.set(entity, record);
                    break;
                default:
                    throw new TypeError("Unknown type "+type)
            }
        }
        
        return record;
    }
    
    #type;
    get type(){
        try {
            if (this.#type == null && this.getEntity() != null){
                this.#setValueByVanillaScbId(this.getEntity().scoreboard);
                return this.type;
            }
        } catch (err){
            console.warn("Could not init type from vanilla entity, maybe this is null Entry (without link any player), or entity's scoreboard didn't init yet");
        }
        return this.#type;
    }
    
    #id;
    get id(){
        try {
            if (this.#id == null && this.getEntity().scoreboard != null){
                this.#setValueByVanillaScbId(this.getEntity().scoreboard);
                return this.id;
            }
        } catch {
            console.warn("Could not init id from vanilla entity, maybe this is null Entry (without link any player), or entity's scoreboard didn't init yet");
        }

        return this.#id;
    }
    
    #entity;
    #vanillaGetEntity;
    getEntity(){
        if (this.#vanillaGetEntity != null){
            return this.#vanillaGetEntity();
        } else if (this.#type != EntryType.FAKE_PLAYER && this.#entity == null && this.#id != null){
            this.#setValueByNumberId(id);
            return this.getEntity();
        } else if (this.#type != EntryType.FAKE_PLAYER && this.#entity != null){
            return this.#entity;
        } else {
            throw new Error("Could not find an entity by scoreboard entry");
        }
    }
    
    #vanillaScbId;
    get vanillaScbId(){
        if (this.#vanillaScbId == null){
            if (this.#type == EntryType.FAKE_PLAYER && this.#displayName != null){
                for (let s of vanillaScoreboard.getParticipants()){
                    if (this.#displayName == s.displayName){
                        this.#setValueByVanillaScbId(s);
                        break;
                    }
                }
            } else if (this.#entity != null && this.#entity.scoreboard != null){
                this.#setValueByVanillaScbId(this.#entity.scoreboard);
            }
        }
        return this.#vanillaScbId;
    }
    
    #displayName;
    get displayName(){
        if (this.#type == EntryType.PLAYER){
            return this.getEntity().name;
        }
        return this.#displayName;
    }
    
    /**
     * Don't use this, you should use Entry.getEntry() with the same arguments
     * this constructor CANNOT make the entry unique
     */
    constructor(id, type, displayName, entity){
        if (id instanceof VanillaScoreboardIdentity)
        {
            this.#setValueByVanillaScbId(id);
        } else if (typeof id == "number" && !isNaN(Number(id)) && entity == null && type == null && displayName == null)
        {
            this.#setValueByNumberId(id);
        }/* else if (id == null && displayName == null && type != null &&
                (entity instanceof VanillaPlayer && type == EntryType.PLAYER) ||
                (entity instanceof VanillaEntity && type == EntryType.ENTITY)
            )
        {
            this.#type = type;
            this.#entity = entity;
        } else if (id == null && displayName != null && type == EntryType.FAKE_PLAYER && entity == null) 
        {
            this.#displayName = displayName;
            this.#type = type;
        }*/ else {
            if (type == EntryType.ENTITY){
                displayName = id;
            }
            this.#type = type;
            this.#entity = entity;
            this.#id = id;
            this.#displayName = displayName;
            if (entity != null && entity.scoreboard != null){
                this.#vanillaScbId = entity.scoreboard;
            }
        }
    } 
    
    #setValueByNumberId(id){
        let vanillaScbId;
        for (let s of vanillaScoreboard.getParticipants()){
            if (id == s.id){
                vanillaScbId = s;
                break;
            }
        }
        if (vanillaScbId != null){
            this.#setValueByVanillaScbId(s);
        } else {
            throw new Error("Could not get info from number id "+id);
        }
    }
    
    #setValueByVanillaScbId(vanillaScbId){
        this.#vanillaScbId = vanillaScbId;
        this.#id = vanillaScbId.id;
        this.#type = vanillaScbId.type;
        
        if (vanillaScbId.displayName != null){
            this.#displayName = vanillaScbId.displayName;
        }
        if (this.#type == EntryType.ENTITY){
            displayName = id;
        }
        if (this.#type != EntryType.FAKE_PLAYER){
            try {
                this.#vanillaGetEntity = () => vanillaScbId.getEntity();
            } catch {
                this.#vanillaGetEntity = null;
            }
        }
    }
}
