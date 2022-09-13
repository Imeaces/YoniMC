import { VanillaScoreboard, Minecraft } from "scripts/yoni/basis.js";
import EntryType from "scripts/yoni/scoreboard/EntryType.js";
import { YoniEntity } from "scripts/yoni/entity.js";

let idRecords = new Map();
let entityRecords = new Map();
let nameRecords = new Map();
let scbidRecords = new Map();
let symbolRecords = new Map();

export class EntryType {
    static PLAYER = Minecraft.ScoreboardIdentityType.player;
    static ENTITY = Minecraft.ScoreboardIdentityType.entity;
    static FAKE_PLAYER = Minecraft.ScoreboardIdentityType.fakePlayer;
}

export class EntryOption {
    name;
    id;
    scbid;
    entity;
    type;
}

export default class Entry2 {
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
        this.#scbid = scbid;
        this.#entity = entity;
        this.#type = type;
        
    }
}

export { Entry2 } 

export class Entry {
    
    static getEntries(){
        let entries = [];
        Array.from(VanillaScoreboard.getParticipants()).forEach((scbId) => {
            let entry = this.getEntry(scbId);
            if (!entries.includes(entry))
                entries.push(entry);
            
        });
        return entryRecords.slice();
    }
    
    static getEntry(id, type, displayName, entity){
        //只传入一个参数时
        if (id != null && type == null && displayName == null && entity == null){
            if (id instanceof Minecraft.Player || id instanceof Minecraft.Entity || id instanceof YoniEntity){ //实体
                if (id instanceof YoniEntity){ //兼容YoniEntity
                    entity = id.getMinecraftEntity();
                } else {
                    entity = id;
                }
                id = null;
                if (entity instanceof Minecraft.Player)
                   type = EntryType.PLAYER;
                else if (entity instanceof Minecraft.Entity)
                   type = EntryType.Entity
            } else if (isNaN(Number(id)) && typeof id == "string"){ //名字/假玩家
                displayName = id;
                type = EntryType.FAKE_PLAYER;
                id = null;
            } else if (!isNaN(Number(id))){
                let vanillaScbId;
                for (let s of VanillaScoreboard.getParticipants()){
                    if (id == s.id){
                        vanillaScbId = s;
                        break;
                    }
                }
                if (vanillaScbId != null){
                    id = vanillaScbId;
                } else {
                    throw new Error("Could not get info from number id "+id);
                }
            }
        }
        //scbid, null, null, null
        //number, null, null, null
        //null, entity type, null, entity
        //null, fake, name, null

        //根据原版scbid获取需要的信息
        let vanillaScbId;
        if (id instanceof Minecraft.ScoreboardIdentity){
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
        
        //从entry记录中获取信息
        let entityRecord;
        let idRecord;
        let nameRecord;
        let record;
        
        //实体从实体获取
        if (type != EntryType.FAKE_PLAYER && entity != null)
            entityRecord = entityRecords.get(entity);
        //如果是数字id则从数字id获取
        if (!isNaN(Number(id)))
            idRecord = idRecords.get(id);
        //假玩家从假玩家获取
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
        
        //如果没有记录，并且获取到了scbid
        if (record == null){
            if (vanillaScbId != null){
                record = new Entry(vanillaScbId);
            } else { //如果没有获取到scbid，先创建没有scbid的
                record = new Entry(id, type, displayName, entity);
            }
        }
        
        //如果记录不为空或者根据信息成功，记录到记录
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
                for (let s of VanillaScoreboard.getParticipants()){
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
        if (id instanceof Minecraft.ScoreboardIdentity)
        {
            this.#setValueByVanillaScbId(id);
        } else if (typeof id == "number" && !isNaN(Number(id)) && entity == null && type == null && displayName == null)
        {
            this.#setValueByNumberId(id);
        }/* else if (id == null && displayName == null && type != null &&
                (entity instanceof Minecraft.Player && type == EntryType.PLAYER) ||
                (entity instanceof Minecraft.Entity && type == EntryType.ENTITY)
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
        for (let s of VanillaScoreboard.getParticipants()){
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
