import { VanillaScoreboard, Minecraft, Gametest } from "../basis.js";
import { EntityBase } from "../entity/EntityBase.js";
import { Entity } from "../entity/Entity.js";
import { Player } from "../entity/Player.js";
import { UnknownEntryError } from "./ScoreboardError.js";
import { EntryType, EntryValueType } from "./EntryType.js";

import { debug, useOptionalFasterCode, enableScoreboardIdentityByNumberIdQuery } from "../config.js";

/*
 存十万条就很卡了
 那个时候，建议还是直接让游戏操控吧
*/

let idRecords: Map<number, Entry>;
if (enableScoreboardIdentityByNumberIdQuery){
    idRecords = new Map();
}
let nameRecords: Map<string, Entry> = new Map();
let entityRecords: WeakMap<Minecraft.Entity, Entry> = new WeakMap();
let scbidRecords: WeakMap<Minecraft.ScoreboardIdentity, Entry> = new WeakMap();

if (debug){ // @ts-ignore 测试使用，将记录公开以便于查询
    globalThis.EntryRecords = { idRecords, nameRecords, entityRecords, scbidRecords };
}

/**
 * 一系列用于查询 Entry 的信息。
 * @interface
 * @typedef EntryQueryOptions
 * @property {string} [name]
 * @property {number} [id]
 * @property {Minecraft.ScoreboardIdentity} [scbid]
 * @property {EntityBase|Minecraft.Entity} [entity]
 * @property {EntryType} [type]
 */
/**
 * 一系列用于查询 Entry 的信息。
 */
export interface EntryQueryOptions {
    /**
     * 虚拟记分板实体的名字
     */
    name?: string;
    /**
     * 分数持有者ID
     */
    id?: number;
    /**
     * 分数持有者对象
     */
    scbid?: Minecraft.ScoreboardIdentity;
    /**
     * 实体
     */
    entity?: EntityBase | Minecraft.Entity;
    /**
     * 类型
     */
    type?: EntryType | Minecraft.ScoreboardIdentityType;
}

/**
 * Contains an identity of the scoreboard item.
 */
class Entry {
    
    /**
     * 从可能为分数持有者的值获取其对象。
     * @param {EntryValueType} one - 可能为分数持有者的值
     * @returns {Entry} 与 `one` 对应的分数持有者对象。
     * @throws 若未能根据值得到可能的分数持有者对象，抛出 `UnknownEntryError`。
     */
    static guessEntry(one: EntryValueType): Entry {
        if (one instanceof Entry)
            return one;
        if (one instanceof Minecraft.ScoreboardIdentity)
            return this.getEntry({scbid: one});
        if (EntityBase.isEntity(one))
            return this.getEntry({entity: one as EntityBase});
        if (typeof one === "string")
            return this.getEntry({name: one, type: EntryType.FAKE_PLAYER});
        if (isFinite(one as number)){
            if (!enableScoreboardIdentityByNumberIdQuery)
                throw new Error("scbid search by number id is disable, set 'enableScoreboardIdentityByNumberIdQuery' to 'true' to enable it");
            return this.getEntry({id: one as number});
        }
        throw new UnknownEntryError();
    }
    
    /**
     * 根据 `option` 接口获得分数持有者对象。
     * @param {EntryQueryOptions} option
     * @returns {Entry}
     */
    static getEntry(option: EntryQueryOptions): Entry{
        
        let { entity, id, name, scbid, type } = option;
        entity = EntityBase.isEntity(entity) ? EntityBase.getMinecraftEntity(entity): entity;
        
        let entry;
        
        if (type === EntryType.FAKE_PLAYER && scbid != null)
            name = scbid.displayName;
            
        //优先级: entity, scbid, id, name
        if (entity != null && (type === EntryType.PLAYER || type === EntryType.ENTITY)){
        
            entry = entityRecords.get(entity as Minecraft.Entity);
            
        }
        
        if (entry == null && scbid != null){
            entry = scbidRecords.get(scbid);
        }
        
        if (entry == null && name != null && type === EntryType.FAKE_PLAYER){
        
            entry = nameRecords.get(name);
        
        }
        
        if (entry == null
        && enableScoreboardIdentityByNumberIdQuery
        && id != null
        ){
            entry = idRecords.get(id);
        }
        
        if (entry == null)
            entry = new Entry(option);
        
        if (type != null && entry.type !== type)
            throw new Error("entry type do not matches");
            
        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
        
            let entity = null;
            let hasEntity = false;
            
            try {
                entity = entry.getVanillaEntity();
                hasEntity = true;
            } catch {
            }
            
            if (hasEntity){
                if (entity == null){
                    throw new Error("null entity object");
                }
                entityRecords.set(entity, entry);
            }
        }
        
        if (enableScoreboardIdentityByNumberIdQuery
        && entry.id != null)
            idRecords.set(entry.id, entry);
        
        if (entry.vanillaScbid != null)
            scbidRecords.set(entry.vanillaScbid, entry);
        
        if (type === EntryType.FAKE_PLAYER)
            nameRecords.set(entry.displayName, entry);
        
        return entry;
    }
    
    /**
     * 根据 `option` 获得原始分数持有者对象（需要启用 `useOptionalFasterCode`）。
     * @function getVanillaScoreboardParticipant
     * @param {EntryQueryOptions} option
     * @returns {Minecraft.ScoreboardIdentity}
     */
    static getAndUpdateVanillaScoreboardParticipants(){
        throw new Error("To use this function, you have to enable 'useOptionalFasterCode' in the config");
    }
    
    #type: EntryType;
    #id: number | undefined;
    #name: string;
    #vanillaScbid: Minecraft.ScoreboardIdentity | undefined;
    #entity: Minecraft.Entity | null;
    
    /**
     * 分数持有者的类型。
     * @returns {EntryType}
     */
    get type(){
        return this.#type;
    }
    
    /**
     * 分数持有者ID，如果尚未在记分板中初始化，则为 `undefined`。
     * @returns {number|undefined}
     */
    get id(): number | undefined {
        if (this.vanillaScbid?.id !== this.#id)
            this.#id = this.vanillaScbid?.id;
        return this.#id as unknown as number;
    }
    
    /**
     * 分数持有者的可被玩家查看的名字。
     * @returns {string}
     */
    get displayName(){
        if (this.vanillaScbid !== undefined){
            return this.vanillaScbid.displayName;
        }
        if (this.#type === EntryType.PLAYER)
            return (this.#entity as unknown as Minecraft.Player).name; 
        if (this.#type === EntryType.ENTITY)
            return String(this.getEntity().id);
        if (this.#type === EntryType.FAKE_PLAYER)
            return this.#name;
        throw new Error("unknown name");
    }
    
    /**
     * 原始分数持有者对象，可能为空。
     * @returns {Minecraft.ScoreboardIdentity|undefined}
     */
    get vanillaScbid(): Minecraft.ScoreboardIdentity | undefined {
        
        Entry.updateEntry(this);
        
        return this.#vanillaScbid;
    }
    
    /**
     * 更新Entry
     * @param {Entry} entry
     * @param {boolean} force
     */
    static updateEntry(entry: Entry, force: boolean = false){

        //更新实体分数持有者的scbid
        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
            if (force && entry.#vanillaScbid !== undefined){
                try {
                    entry.#entity = entry.#vanillaScbid.getEntity();
                } catch {
                    entry.#entity = null;
                }
            } else if (entry.#entity !== null
            && entry.#entity.scoreboard !== entry.#vanillaScbid
            ){
                let scbid = entry.#entity.scoreboard;
                if (scbid instanceof Minecraft.ScoreboardIdentity){
                    entry.#vanillaScbid = scbid;
                } else {
                    entry.#vanillaScbid = undefined;
                }
            }
        }
        
        //TODO: 更新虚拟记分板实体的scbid
        if (force && entry.#type === EntryType.FAKE_PLAYER){
            entry.#vanillaScbid = undefined;
            for (let scbid of VanillaScoreboard.getParticipants()){
                if (scbid.displayName === entry.#name
                && scbid.type as unknown as EntryType === entry.#type){
                    entry.#vanillaScbid = scbid;
                    break;
                }
            }
        }
        
        if (entry.#vanillaScbid !== undefined && scbidRecords.get(entry.#vanillaScbid) !== entry){
            scbidRecords.set(entry.#vanillaScbid, entry);
        }
    }
    
    /**
     * 如果此分数持有者不是虚拟玩家，返回此分数持有者对应实体的对象。
     * @returns {Entity|null} 若为虚拟玩家类型的分数持有者，则返回 `null`。
     */
    getEntity(){
        return EntityBase.from(this.getVanillaEntity()) as unknown as Entity;
    }
    
    /**
     * If the scoreboard identity is an entity or player, returns 
     * the entity that this scoreboard item corresponds to.
     * @returns {Minecraft.Entity|null} 若为虚拟玩家类型的分数持有者，则返回 `null`。
     * @throws 若实体尚未加载或已死亡，将抛出错误。
     */
    getVanillaEntity(){
        if (this.#type === EntryType.FAKE_PLAYER){
            this.#entity = null;
        } else if (this.#entity === null){
            Entry.updateEntry(this);
            let scbid = this.#vanillaScbid;
            if (scbid === undefined){
                throw new Error("错误引用的Entry对象，实体类型的分数持有者对象必须能够指向有效的实体或香草分数持有者对象");
            }
            try {
                this.#entity = scbid.getEntity();
            } catch {
                throw new Error("实体可能尚未加载");
            }
        }
        return this.#entity;
    }
    
    /**
     * 更新此分数持有者对象与原始分数持有者对象的映射关系。
     * @returns {Entry} 更新完成后，返回对象自身。
     */
    update(){
        Entry.updateEntry(this, true);
        return this;
    }
    
    /**
     * @hideconstructor
     */
    constructor(option: EntryQueryOptions){
        let { entity, name, id, scbid, type } = option;
        //处理时使用原版实体对象
        entity = (entity instanceof EntityBase) ? entity.vanillaEntity : entity;
        
        if (entity != null){
            if (entity instanceof Minecraft.Player || entity instanceof Gametest.SimulatedPlayer)
                type = EntryType.PLAYER;
            else if (entity instanceof Minecraft.Entity)
                type = EntryType.ENTITY;
            else throw new TypeError("Unknown entity type");
            scbid = (entity as Minecraft.Entity).scoreboard;
            id = scbid?.id;
        } else {
            let condF: ((scbid: Minecraft.ScoreboardIdentity) => boolean) | null = null;
            if (scbid == null
            && type === EntryType.FAKE_PLAYER
            && name !== ""
            && name != null){
                condF = (scbid) => {
                    return (scbid.displayName === name && type === scbid.type);
                }
            } else if (scbid == null && id !== null){
                condF = (scbid) => {
                    return scbid.id === id;
                }
            }
            
            if (condF !== null){
                scbid = Array.from(VanillaScoreboard.getParticipants()).find(condF);
                console.debug("finding scbid for entry");
            }
            
            if (scbid != null){
                type = scbid.type as unknown as EntryType;
                name = scbid.displayName;
                id = scbid.id;
                if (EntryType.PLAYER === type
                || EntryType.ENTITY === type
                ){
                    try {
                        entity = scbid.getEntity();
                    } catch {
                        entity = undefined;
                    }
                }
            } else if (id != null){
                throw new Error(`Unable to determine the scbid ${id}`);
            }
        }
        
        this.#id = id != null ? id : undefined;
        this.#entity = entity != null ? entity as Minecraft.Entity : null;
        this.#name = name as string;
        this.#type = type as unknown as EntryType;
        this.#vanillaScbid = scbid != null ? scbid : undefined
        
    }
}

export { Entry, EntryType };
export default Entry;

if (useOptionalFasterCode){
    //等待下一次优化
    
    let YoniScheduler, console: any;

    // 缓存分数持有者映射 //
    import("../schedule.js")
    .then(m => {
        YoniScheduler = m.YoniScheduler
        return import("../util/Logger.js");
    })
    .then(m => {
        console = m.console;
    })
    .then(() => {
        throw new Error("temp disable mapping caching");
        YoniScheduler.runCycleTickTask(async ()=>{
            console.trace("缓存分数持有者映射");
            let count = 0;
            for (let scbid of Array.from(VanillaScoreboard.getParticipants())){
                //scbid为空
                //可能是mojang抽风了
                //不用担心，忽略就行
                //就是可能会报错
                //那个没办法
                //存多了就会这样
                //目前没法解决
                if (!scbid)
                    return;
                await Entry.getEntry({ scbid: scbid, id: scbid.id, type: scbid.type }); //to cache entry result
                count++;
            }
            if (debug){
                console.trace("重新映射了{}位分数持有者的Entry", count);
            }
        }, 0, 600, true); //每600t运行一次任务，异步
    });

}
