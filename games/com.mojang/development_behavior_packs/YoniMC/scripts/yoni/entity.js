import { fetchCmd, Minecraft, Gametest, dim, overworld, StatusCode, VanillaEvents } from "yoni/basis.js";
import Entry from "yoni/scoreboard/Entry.js";

const { EntityTypes } = Minecraft;

let entityMap = new WeakMap();

function getAliveEntities(option){
    let entities = [];
    
    for (let dimid in Minecraft.MinecraftDimensionTypes){
        entities.push(...dim(dimid).getEntities(option));
    }
    return entities;
}

function getLoadedEntities(option){
    let entities = getAliveEntities(option);
    [...VanillaWorld.getPlayers(option)].forEach((_)=>{
        if (!entities.includes(_)){
            entities.push(_);
        }
    });
    return entities;
}

export class Entity {
    
    get entityType(){
        return EntityTypes.get(this.typeid);
    }
    
    get typeid(){
        //我就喜欢你这种不区分大小写的人（请忽略上方的代码）
        return this.typeId;
    }
    
    #vanillaEntity;
    
    get vanillaEntity(){
        return this.#vanillaEntity;
    }
    
    getMinecraftEntity(){
        //我该说这是历史遗留问题吗
        return this.#vanillaEntity;
    }
    
    constructor(entity, symbol){
    
        if (entity !== symbol){
            return Entity.from(entity);
        }
        
        //如果不是MCEntity则报错
        if (!Entity.isMinecraftEntity(entity))
            throw new TypeError("There is not a Minecraft Entity type");
        
        this.#vanillaEntity = entity; //保存MCEntity
        
        for (let s in this.#vanillaEntity){ //建立变量,函数
            if (s in this)
                continue;
            if (this.#vanillaEntity[s] instanceof Function)
                Object.defineProperty(this, s, {
                    enumerable: true,
                    writable: false,
                    value: (...args)=>{ return this.#vanillaEntity[s](...args); }
                });
            else 
                Object.defineProperty(this, s, {
                    enumerable: true,
                    get: ()=>{
                        return this.#vanillaEntity[s];
                    },
                    set: (t)=>{
                        this.#vanillaEntity[s] = t;
                    }
                });
        }
        
    }
    
    get uniqueId(){
        return this.id;
    }
    
    get scoreboard(){
        return Entry.getEntry(this);
    }
    
    isAliveEntity(){
        return Entity.isAliveEntity(this);
    }
    
    isAlive(){
        return Entity.isAlive(this);
    }
    
    getCurrentHealth(){
        return Entity.getCurrentHealth(this);
    }
    getHealthComponent(){
        return Entity.getHealthComponent(this);
    }
    
    getInventory(){
        return Entity.getInventory(this);
    }
    
    getMaxHealth(){
        return Entity.getMaxHealth(this);
    }
    
    hasFamily(family){
        return Entity.hasAnyFamily(this, family);
    }
    
    hasAnyFamily(...families){
        return Entity.hasAnyFamily(this, ...families);
    }
    async fetchCommand(cmd){
        return await fetchCmd(this, cmd);
    }
    async say(message){
        let command = "say " + message;
        return await this.fetchCommand(command);
    }
    
    /**
     * 检查一个东西是否为实体
     * @param 任意
     * @throws 当不是实体的时候抛出错误
     */
    static checkIsEntity(obj){
        if (!Entity.isEntity(obj))
            throw new TypeError("Not a Entity type");
    }
    
    /**
     * 从一个实体中获得YoniEntity
     * @param 可以被认为是实体的东西
     * @return {Entity} 如果无法获得，返回null
     */
    static from(entity){
        // 如果有记录，直接返回对应实体
        if (entityMap.has(entity))
            return entityMap.get(entity);
        
        //如果已经封装为YoniEntity，则直接返回原实体
        if (entity instanceof Entity)
            return entity;
        
        let rt = null;
        if (entity instanceof Minecraft.Entity)
            rt = new Entity(entity, entity);
        else if (entity instanceof Minecraft.Player)
            rt = new Player(entity, entity);
        else if (entity instanceof Gametest.SimulatedPlayer)
            rt = new SimulatedPlayer(entity, entity);
        
        if (rt !== null)
            entityMap.set(entity, rt);
        
        return rt;

    }
    
    /**
     * 检测某个实体是否为
     * @param 要检测的实体
     * @return {Boolean}
     * @throws 当参数不是实体时抛出错误
     */
    static entityIsPlayer(entity){
        entity = Entity.getMinecraftEntity(entity);
        if (entity instanceof Minecraft.Player)
            return true;
        return false;
    }

    /**
     * 获取所有存活的实体
     * @param {Minecraft.EntityQueryOptions}
     * @return {Entity[]}
     */
    static getAliveEntities(...args){
        return getAliveEntities().map((_)=>{
            return Entity.from(_);
        });
    }
    
    static getHealthComponent(entity){
        Entity.checkIsEntity(entity);
        return entity.getComponent("minecraft:health");
    }
    
    static getInventory(entity){
        Entity.checkIsEntity(entity);
        return entity.getComponent("minecraft:inventory").container;
    }
    
    /**
     * 获取实体的血量
     */
    static getCurrentHealth(entity){
        let component = Entity.getHealthComponent(entity);
        return (component === undefined) ? 0 : component.current;
    }
    
    /**
     * 获取所有存在的实体（包括死亡的玩家）
     * @param {Minecraft.EntityQueryOptions}
     * @return {Entity[]}
     */
    static getLoadedEntities(...args){
        return getLoadedEntities().map((_)=>{
            Entity.from(_);
        });
    }
    
    /**
     * 获取实体最大血量
     */
    static getMaxHealth(entity){
        let component = Entity.getHealthComponent(entity);
        return (component === undefined) ? 0 : component.value;
    }
    
    /**
     * 得到一个Minecraft.Entity
     */
    static getMinecraftEntity(object){
        Entity.checkIsEntity(entity);
        if (Entity.isMinecraftEntity(object))
            return object;
        else if (Entity.isYoniEntity(object))
            return object.vanillaEntity;
        return null;
    }
    
    /**
     * 得到一个Entity
     */
    static getYoniEntity(ent){
        Entity.checkIsEntity(entity);
        return Entity.from(ent);
    }
    
    /**
     * 检测一个实体是否有某个种族
     */
    static hasAnyFamily(entity, ...families){
        Entity.checkIsEntity(entity);
        for (let fam of families){
            fam = String(fam);
            if (execCmd(entity, "execute", "if", "entity", `@s[family=${fam}]`).statusCode == 0)
                return true;
        }
        return false;
    }

    /**
     * 检测一个实体是否有某个种族
     */
    static hasFamily(entity, family){
        return Entity.hasAnyFamily(entity, family);
    }
    
    /**
     * 检测一个实体是否存在于世界上
     */
    static isAliveEntity(entity){
        entity = Entity.getMinecraftEntity(entity);
        for (let ent of Entity.getLoadedEntities()){
            if (entity.getMinecraftEntity() === ent)
                return true;
        }
        return false;
    }
    
    /**
     * 检测一个实体是否活着
     * 物品、箭、烟花等不是活的
     * 死了的实体也不是活的
     */
    static isAlive(entity){
        return Entity.getCurrentHealth(entity) > 0;
    }
    
    /**
     * 检测参数是否为实体
     */
    static isEntity(obj){
        if (Entity.isYoniEntity(obj))
            return true;
        if (Entity.isMinecraftEntity(obj))
            return true;
         return false;
    }
    
    /**
     * 检测参数是否为原版实体
     */
    static isMinecraftEntity(object){
        if (object instanceof Minecraft.Entity)
            return true;
        if (object instanceof Minecraft.Player)
            return true;
        if (object instanceof Gametest.SimulatedPlayer)
            return true;
        return false;
    }
    
    /**
     * 检测两个参数是否为同一实体
     */
    static isSameEntity(ent1, ent2){
        if (Entity.isYoniEntity(ent1))
            ent1 = ent1.vanillaEntity;
        if (Entity.isYoniEntity(ent2))
            ent2 = ent2.vanillaEntity;
        return ent1 === ent2;
    }

    /**
     * 检测两个参数是否为YoniEntity
     */
    static isYoniEntity(object){
        if (object instanceof Entity)
            return true;
    }
    
}

export class Player extends Entity {
    
    /**
     * 踢出玩家
     */
    async postKick(msg){
        let rt = (typeof msg === "string" && msg !== "") ? await fetchCmd(overworld, "kick", this.name, msg) : await fetchCmd(overworld, "kick", this.name);
        if (rt.statusCode !== StatusCode.success){
            throw new Error(rt.statusMessage);
        }
    }
    
    
    async sendMessage(message){
        let rawtext = { rawtext: [{ text: String(message) }] };
        return await this.sendRawMessage(rawtext);
    }
    
    
    async sendRawMessage(rawtext){
        let command = "tellraw @s " + JSON.stringify(rawtext);
        if (await this.fetchCommand(command).statusCode == 0)
            return true;
        else return false;
    }
}

export class SimulatedPlayer extends Player {
}

export { Entity as YoniEntity }
export default Entity;
