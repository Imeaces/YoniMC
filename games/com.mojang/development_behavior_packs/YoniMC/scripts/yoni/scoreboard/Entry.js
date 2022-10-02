import { VanillaScoreboard, Minecraft } from "yoni/basis.js";
import { YoniEntity } from "yoni/entity.js";

let idRecords = new Map();
let entityRecords = new Map();
let nameRecords = new Map();
let scbidRecords = new Map();

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
    
    static getEntry(option){
        
        let { entity, id, name, scbid, type } = option;
        entity = (entity instanceof YoniEntity) ? entity.vanillaEntity : entity;
        let entry;
        
        if (type === EntryType.FAKE_PLAYER && scbid !== undefined)
            name = scbid.displayName;
            
        //优先级: entity, scbid, id, name
        if (entityRecords.has(entity))
            entry = entityRecords.get(entity);
        else if (type === EntryType.FAKE_PLAYER && nameRecords.has(name))
            entry = nameRecords.get(name);
        else if (scbidRecords.has(scbid))
            entry = scbidRecords.get(scbid);
        else if (idRecords.has(id))
            entry = idRecords.get(id);
        else
            entry = new Entry(option);
        
        if (type != null && entry.type !== type)
            throw new Error("entry type do not matches");
            
        if (entry.getEntity() !== null)
            entityRecords.set(entry.getEntity(), entry);
        if (entry.id !== undefined)
            idRecords.set(entry.id, entry);
        if (entry.vanillaScbid !== undefined)
            scbidRecords.set(entry.vanillaScbid, entry);
        if (type === EntryType.FAKE_PLAYER && entry.displayName !== undefined)
            nameRecords.set(entry.displayName, entry);
        
        return entry;
    }
    
    #type;
    #id;
    #name;
    #vanillaScbid;
    #entity;
    
    get type(){
        return this.#type;
    }
    
    get id(){
        if (this.vanillaScbid?.id !== this.#id)
            this.#id = this.vanillaScbid?.id;
        return this.#id;
    }
    
    get displayName(){
        if (this.vanillaScbid !== undefined && this.#vanillaScbid.displayName !== undefined)
            return this.vanillaScbid.displayName;
        if (this.#type == EntryType.PLAYER)
            return this.#entity.name;
        if (this.#type  == EntryType.ENTITY)
            return this.id;
        if (this.#type === EntryType.FAKE_PLAYER)
            return this.#name;
        
    }
    
    get vanillaScbid(){
        if (this.#type === EntryType.PLAYER || this.#type === EntryType.ENTITY && this.#entity.scoreboard !== this.#vanillaScbid)
            this.#vanillaScbid = this.#entity.scoreboard;
        if (this.#vanillaScbid !== undefined && scbidRecords.get(this.#vanillaScbid) !== this)
            scbidRecords.set(this.#vanillaScbid, this);
        return this.#vanillaScbid;
    }
    
    getEntity(){
        if (this.#type === EntryType.FAKE_PLAYER)
            this.#entity = null;
        return this.#entity;
    }
    
    update(){
        if (this.#type === EntryType.FAKE_PLAYER){
            this.#vanillaScbid = undefined;
            for (let s of VanillaScoreboard.getParticipants()){
                if (s.displayName === this.#name && s.type === this.#type){
                    this.#vanillaScbid = s;
                    break;
                }
            }
        } else {
            let i = this.vanillaScbid;
        }
        return this;
    }
    
    constructor(option){
        let { entity, id, name, scbid, type } = option;
        entity = (entity instanceof YoniEntity) ? entity.vanillaEntity : entity;
        
        if (entity !== undefined){
            if (entity instanceof Minecraft.Player)
                type = EntryType.PLAYER;
            else if (entity instanceof Minecraft.Entity)
                type = EntryType.ENTITY;
            else throw new TypeError("Unknown entity type");
            scbid = entity.scoreboard;
            id = scbid?.id;
        } else {
            let condF = null;
            if (type === EntryType.FAKE_PLAYER && name !== "" && name !== scbid?.displayName){
                condF = (_)=>{
                    return _.displayName === name && type === _.type;
                };
            } else if (id !== undefined && scbid === undefined){
                condF = (_)=>{
                    return _.id === id;
                };
            }
            
            if (condF !== null){
                scbid = undefined;
                for (let s of VanillaScoreboard.getParticipants()){
                    if (condF(s)){
                        scbid = s;
                        break;
                    }
                }
                if (scbid !== undefined){
                    type = scbid.type;
                    name = scbid.displayName;
                    id = scbid.id;
                    entity = scbid.getEntity();
                } else if (id !== undefined){
                    throw new Error(`Unable to determine the scbid ${id}`);
                }
            }
        }
        
        this.#id = id;
        this.#entity = entity;
        this.#name = name;
        this.#type = type;
        this.#vanillaScbid = scbid;
        
    }
}

export { Entry, EntryType, EntryOption };
export default Entry;
