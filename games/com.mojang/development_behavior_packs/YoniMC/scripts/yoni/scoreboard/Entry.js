import { VanillaScoreboard, Minecraft } from "scripts/yoni/basis.js";
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

export default class Entry {
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

export { Entry } 
