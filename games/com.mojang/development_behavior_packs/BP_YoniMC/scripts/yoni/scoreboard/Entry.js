import { VanillaScoreboard, Minecraft } from "../basis.js";
import { YoniEntity } from "../entity.js";

let idRecords = new Map();
let nameRecords = new Map();
let entityRecords = new WeakMap();
let scbidRecords = new WeakMap();

/**
 * Represents an entry type of scoreboard
 * @readonly
 * @enum
 */
class EntryType {
    /** @type {EntryType} */
    static PLAYER = Minecraft.ScoreboardIdentityType.player;
    /** @type {EntryType} */
    static ENTITY = Minecraft.ScoreboardIdentityType.entity;
    /** @type {EntryType} */
    static FAKE_PLAYER = Minecraft.ScoreboardIdentityType.fakePlayer;
}

/**
 * @interface
 * @typedef {Object} EntryOption
 * @property {string} [name]
 * @property {number} [id]
 * @property {Minecraft.ScoreboardIdentity} [scbid]
 * @property {YoniEntity|Minecraft.Entity|Minecraft.Player} [entity]
 * @property {EntryType} [type]
 */

/**
 * Contains an identity of the scoreboard item.
 */
class Entry {
    
    /**
     * @param {Minecraft.ScoreboardIdentity|Minecraft.Entity|Minecraft.Player|string|number|YoniEntity} any
     * @returns {Entry}
     */
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
    
    /**
     * 
     * @param {EntryOption} option 
     * @returns {Entry}
     */
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
            
        if (entry.getEntity() != null)
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
    
    /**
     * Type of the scoreboard identity.
     * @returns {EntryType}
     */
    get type(){
        return this.#type;
    }
    
    /**
     * Identifier of the scoreboard identity.
     * @returns {number}
     */
    get id(){
        if (this.vanillaScbid?.id !== this.#id)
            this.#id = this.vanillaScbid?.id;
        return this.#id;
    }
    
    /**
     * Returns the player-visible name of this identity.
     * @returns {string}
     */
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
    
    /**
     * @returns {Minecraft.ScoreboardIdentity}
     */
    get vanillaScbid(){
        if ((this.#type === EntryType.PLAYER || this.#type === EntryType.ENTITY)
        && this.#entity.scoreboard !== this.#vanillaScbid)
            this.#vanillaScbid = this.#entity.scoreboard;
        if (this.#vanillaScbid !== undefined && scbidRecords.get(this.#vanillaScbid) !== this)
            scbidRecords.set(this.#vanillaScbid, this);
        return this.#vanillaScbid;
    }
    
    /**
     * If the scoreboard identity is an entity or player, returns 
     * the entity that this scoreboard item corresponds to.
     * @returns {Minecraft.Entity}
     */
    getEntity(){
        if (this.#type === EntryType.FAKE_PLAYER)
            this.#entity = null;
        return this.#entity;
    }
    /** @returns {Entry} Returns self, after update the vanillaScbid record */
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
            //使用getter重新初始化变量
            let i = this.vanillaScbid;
        }
        return this;
    }
    
    /**
     * @hideconstructor
     */
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
        
        this.#id = id;
        this.#entity = entity;
        this.#name = name;
        this.#type = type;
        this.#vanillaScbid = scbid;
        
    }
}

export { Entry, EntryType };
export default Entry;
