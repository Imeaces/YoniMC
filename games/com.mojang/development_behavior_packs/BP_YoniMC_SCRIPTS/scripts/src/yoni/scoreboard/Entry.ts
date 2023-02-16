import { VanillaScoreboard, Minecraft, Gametest } from "../basis.js";
import { EntityBase } from "../entity/EntityBase.js";
import { EntityType } from "../entity/EntityTypeDefs.js";
import Entity from "../entity/Entity.js";
import Player from "../entity/Player.js";
import { UnknownEntryError } from "./ScoreboardError.js";
import { EntryType, EntryValueType } from "./EntryType.js";

const { ScoreboardIdentityType } = Minecraft;

import { debug, useOptionalFasterCode, enableScoreboardIdentityByNumberIdQuery } from "../config.js";
import { system as System } from "../system.js";

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
 * 一系列用于查询记录的信息。
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
 * 代表记分板上 持有着一系列分数记录的对象（分数持有者）。
 */
class Entry {
    
    /**
     * 寻找指定对象在记分板上使用的分数持有者对象。
     * @param {EntryValueType} one - 可能为分数持有者的值。
     * @returns {Entry} 与 `one` 对应的分数持有者对象。
     * @throws 若未能根据值得到可能的分数持有者对象，抛出 `UnknownEntryError`。
     */
    static guessEntry(one: EntryValueType): Entry {
        if (one instanceof Entry)
            return one;
        if (one instanceof Minecraft.ScoreboardIdentity)
            return Entry.findEntry({scbid: one});
        if (EntityBase.isEntity(one))
            return Entry.findEntry({entity: one as EntityType});
        if (typeof one === "string")
            return Entry.findEntry({name: one, type: EntryType.FAKE_PLAYER});
        if (isFinite(one as number)){
            return Entry.findEntry({id: one as number});
        }
        throw new UnknownEntryError();
    }
    
    /**
     * 查找符合 `option` 中列出的条件的分数持有者对象。
     * @param {EntryQueryOptions} option
     * @returns {Entry}
     */
    static findEntry(option: EntryQueryOptions): Entry {
        
        let { entity, id, name, scbid, type } = option;
        entity = EntityBase.isEntity(entity) ? EntityBase.getMinecraftEntity(entity): null;
        
        let entry;
        
        if (type === EntryType.FAKE_PLAYER && scbid != null){
            name = scbid.displayName;
        }
        
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
     * 获取所有记分标识符对象。
     * @param {EntryQueryOptions} option
     * @returns {Minecraft.ScoreboardIdentity[]}
     */
    static getVanillaScoreboardParticipants(): Readonly<Minecraft.ScoreboardIdentity[]> {
        let currentTick = System.currentTick;
        if (currentTick !== Entry.#vanillaScbidsLastUpdateTime){
            let scbids = VanillaScoreboard.getParticipants();
            if (! Array.isArray(scbids)){
                scbids = Array.from(scbids);
            }
            Entry.#vanillaScbids = Object.freeze(scbids);
            Entry.#vanillaScbidsLastUpdateTime = currentTick;
        }
        return Entry.#vanillaScbids;
    }
    static #vanillaScbids: Readonly<Minecraft.ScoreboardIdentity[]>;
    static #vanillaScbidsLastUpdateTime: number | null = null;
    
    static findVanillaScoreboardParticipant(
        filter: (scbid: Minecraft.ScoreboardIdentity) => boolean
    ): Minecraft.ScoreboardIdentity | undefined {
        return Entry.getVanillaScoreboardParticipants()
            .find(filter);
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
    
    static isScbidValidity(scbid: any){
        try {
            return Entry.checkScbidValidity(scbid);
        } catch {
            return false;
        }
    }
    
    /**
     * 检查传入的值是否为可用的分数持有者对象。若不是，则抛出错误。
     */
    static checkScbidValidity(scbid: any){
        if (! (scbid instanceof Minecraft.ScoreboardIdentity)){
            throw new TypeError("不是分数持有者对象。");
        }
        
        let desc = Object.getOwnPropertyDescriptor(Minecraft.ScoreboardIdentity.prototype, "id");
        if (desc?.get){
            try {
                desc.get.call(scbid);
            } catch {
                throw new Error("指定的分数持有者对象已不可用");
            }
        } else {
            throw new Error("出现了意料之外的情况，可能是当前版本尚未支持");
        }
        
        return true;
    }
    
    /**
     * 更新Entry
     * @param {Entry} entry
     */
    static updateEntry(entry: Entry){
        
        //更新实体分数持有者的scbid
        if (entry.type === EntryType.PLAYER || entry.type === EntryType.ENTITY){
            if (entry.#vanillaScbid !== undefined && entry.#entity === null){
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
        } else if (entry.#type === EntryType.FAKE_PLAYER){
            if (entry.#vanillaScbid !== undefined
            && !Entry.isScbidValidity(entry.#vanillaScbid)
            ){
                entry.#vanillaScbid = undefined;
            }
            
            if (entry.#vanillaScbid === undefined){
                let recordedScbid = Entry.findVanillaScoreboardParticipant((scbid: Minecraft.ScoreboardIdentity) => {
                    return scbid.type === ScoreboardIdentityType.fakePlayer
                        && scbid.displayName === entry.#name;
                });
                if (recordedScbid){
                    entry.#vanillaScbid = recordedScbid;
                }
            }
        }
        
        if (entry.#vanillaScbid !== undefined
        && scbidRecords.get(entry.#vanillaScbid) !== entry){
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
     * @returns {Minecraft.Entity} 记分对象所对应的实体对象。
     * @throws 若实体尚未加载或已死亡，将抛出错误。
     * @throws 若记分对象不是实体类型，将抛出错误。
     */
    getVanillaEntity(): Minecraft.Entity {
        if (this.#type === EntryType.FAKE_PLAYER){
            throw new Error("此记分对象代表的不是实体");
        } else if (this.#type === EntryType.PLAYER
        || this.#type === EntryType.ENTITY){
            
            if (this.#entity === null){
                if (this.vanillaScbid === undefined){
                    throw new Error("此记分对象未关联任何一个实体，这可能是在创建记分对象的时候出现了逻辑错误。未能找到关联的实体对象或香草记分对象。");
                }
                try {
                    this.#entity = this.vanillaScbid.getEntity();
                } catch {
                    throw new Error("实体可能尚未加载");
                }
            }
        }
        return this.#entity as unknown as Minecraft.Entity;
    }
    
    /**
     * 更新此分数持有者对象与原始分数持有者对象的映射关系。
     * @returns {Entry} 更新完成后，返回对象自身。
     */
    update(){
        Entry.updateEntry(this);
        return this;
    }
    
    /**
     * @hideconstructor
     */
    constructor(option: EntryQueryOptions){
        let { entity, name, id, scbid, type } = option;
        
        //处理时使用原版实体对象
        if (entity != null){
            entity = EntityBase.getMinecraftEntity(entity);
        }
        
        if (entity != null){
            if (EntityBase.entityIsPlayer(entity)){
                type = EntryType.PLAYER;
            } else {
                type = EntryType.ENTITY;
            }
            scbid = (<Minecraft.Entity>entity).scoreboard;
            
            //若实体在计分板上所有记分项中都没有分数记录
            //其scbid为空
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
            
            } else if (scbid == null && id != null){
                condF = (scbid) => {
                    return scbid.id === id;
                }
            }
            
            if (condF !== null){
                scbid = Entry.findVanillaScoreboardParticipant(condF);
            }
            
            if (scbid != null){
                type = scbid.type as unknown as EntryType;
                name = scbid.displayName;
                id = scbid.id;
                if (EntryType.PLAYER === type
                || EntryType.ENTITY === type
                ){
                    try {
                        //若记分对象所代表的实体没有被加载
                        //获取的时候可能会报错
                        entity = scbid.getEntity();
                    } catch {
                        entity = undefined;
                    }
                }
            } else if (id != null){
                throw new Error(`Unable to determine the scbid ${id}`);
                //未能根据scbid找到记分对象的实例
            }
        }
        
        this.#id = id != null
            ? id
            : undefined;
        
        this.#entity = entity != null
            ? EntityBase.getMinecraftEntity(entity) as Minecraft.Entity
            : null;
            
        this.#name = name as string;
        this.#type = type as unknown as EntryType;
        
        this.#vanillaScbid = scbid != null
            ? scbid
            : undefined
        
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
                await Entry.findEntry({ scbid: scbid, id: scbid.id, type: scbid.type }); //to cache entry result
                count++;
            }
            if (debug){
                console.trace("重新映射了{}位分数持有者的Entry", count);
            }
        }, 0, 600, true); //每600t运行一次任务，异步
    });
//接下来的想法是弄好原版scbid的信息缓存
//但比较麻烦的是小概率事件
}

