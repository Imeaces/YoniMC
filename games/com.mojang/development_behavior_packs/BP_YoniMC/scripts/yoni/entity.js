import {
    Minecraft,
    Gametest,
    VanillaWorld, 
    StatusCode } from "yoni/basis.js";
import { dealWithCmd } from "yoni/lib/utils.js";
import { Location } from "yoni/Location.js";
import { Command } from "yoni/command.js";
import { Entry } from "yoni/scoreboard/Entry.js";

const { EntityTypes } = Minecraft;

const entityMap = new WeakMap();

const entitySymbol = Symbol();

/**
 * @typedef {Entity|Player|SimulatedPlayer} YoniEntityType
 * @typedef {Minecraft.Player|Minecraft.Entity|Gametest.SimulatedPlayer} MinecraftEntityType
 * @typedef {YoniEntityType|MinecraftEntityType} EntityType
 */
class Entity {
    
    /**
     * @type {MinecraftEntityType}
     */
    // @ts-ignore
    vanillaEntity;
    
    /**
     * @hideconstructor
     * @param {MinecraftEntityType} entity
     */
    constructor(entity){
        
        if (arguments[1] !== entitySymbol){
            throw new Error("not allow create a entity object use constructor, use Entity.from()");
        }
        
        //如果不是MCEntity则报错
        if (!Entity.isMinecraftEntity(entity))
            throw new TypeError("There is not a Minecraft Entity type");
        
        Object.defineProperty(this, "vanillaEntity", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: entity
        });
    }
    
    get [Symbol.toStringTag](){
        if (this instanceof Entity)
            return `Entity: { type: ${this.typeId} }`;
        return "Object";
    }
    
    get id() { 
        return this.vanillaEntity.id;
    }

    get typeId() {
        return this.vanillaEntity.typeId
    }

    get velocity() {
        return this.vanillaEntity.velocity;
    }
    
    get entityType() {
        return EntityTypes.get(this.typeId);
    }
    
    get dimension() {
        return this.vanillaEntity.dimension;
    }

    getMinecraftEntity(){
        //我该说这是历史遗留问题吗
        return this.vanillaEntity;
    }
    
    get location() {
        return new Location(this.vanillaEntity);
    }
    
    //这东西其实也可以说是历史遗留问题
    //本来想自己给实体弄个唯一id的，然后……官方加了
    get uniqueId(){
        return this.id;
    }
    
    get scoreboard(){
        return Entry.getEntry({entity: this});
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
    
    /**
     * @param {string} family
     */
    hasFamily(family){
        return Entity.hasAnyFamily(this, family);
    }
    /**
     * 
     * @param  {...string} families 
     * @returns 
     */
    hasAnyFamily(...families){
        return Entity.hasAnyFamily(this, ...families);
    }
    
    /**
     * 
     * @param {string} cmd 
     * @returns {Promise<Minecraft.CommandResult>}
     */
    fetchCommand(cmd){
        return Command.fetchExecute(this, cmd);
    }
    
    /**
     * @param {string} message
     */
    say(message){
        let command = "say " + message;
        return Command.fetchExecute(this, command);
    }
    
    /**
     * @param {number} v
     */
    setCurrentHealth(v){
        return Entity.setCurrentHealth(this, v);
    }
    
    /**
     * 传入位置，将实体传送到指定位置
     * 允许两种长度的参数
     * 当传入了1个参数，被认为是yoni的方法
     * 当传入了2个参数，被认为是yoni的方法
     * 当传入了4个参数，被认为是原版的方法
     * 当传入了5个参数，被认为是原版的方法
     * yoni方法中，第一个参数认为是位置，第二个参数认为是keepVelocity
     * 原版方法中参数顺序为[location, dimension, rx, ry, keepVelocity?=null]
     * @param {import("./Location.js").Location1Arg|import("@minecraft/server").Vector3} argLocation
     * @param {Minecraft.Dimension} [argDimension]
     * @param {number} [argRx]
     * @param {number} [argRy]
     * @param {boolean} [keepVelocity]
     */
    teleport(argLocation, argDimension, argRx, argRy, keepVelocity){
        let args = [argLocation, argDimension, argRx, argRy, keepVelocity].filter(v => v !== undefined);
        if (args.length <= 2){
            let location = new Location(argLocation);
            let { rx, ry, dimension } = location;
            if (keepVelocity == null){
                this.vanillaEntity.teleport(location, dimension, rx, ry);
            } else {
                this.vanillaEntity.teleport(location, dimension, rx, ry, keepVelocity);
            }
        } else {
            this.vanillaEntity.teleport(...args);
        }
    }
    
    /**
     * 检查一个东西是否为实体
     * @param {any} obj 任意
     * @throws 当不是实体的时候抛出错误
     */
    static checkIsEntity(obj){
        if (!Entity.isEntity(obj))
            throw new TypeError("Not a Entity type");
    }
    
    /**
     * 从一个实体中获得YoniEntity
     * @param {any} entity - 可以被认为是实体的东西
     * @return {YoniEntityType|null} 如果无法获得，返回null
     */
    static from(entity){
        // 如果有记录，直接返回对应实体
        if (entityMap.has(entity))
            return entityMap.get(entity);
        
        //如果已经封装为YoniEntity，则直接返回原实体
        if (entity instanceof Entity)
            return entity;
        
        let rt = null;
        if (entity instanceof Gametest.SimulatedPlayer)
            rt = new SimulatedPlayer(entity, entitySymbol);
        else if (entity instanceof Minecraft.Player)
            rt = new Player(entity, entitySymbol);
        else if (entity instanceof Minecraft.Entity)
            rt = new Entity(entity, entitySymbol);
        
        if (rt !== null)
            entityMap.set(entity, rt);
        
        return rt;

    }
    
    /**
     * 检测某个实体是否为玩家
     * @param {EntityType} entity 要检测的实体
     * @returns {Boolean}
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
     * @param {Minecraft.EntityQueryOptions} option
     * @return {YoniEntityType[]}
     */
    static getAliveEntities(option){
        return getAliveEntities(option).map(_=>Entity.from(_));
    }
    
    /**
     * 获取实体的minecraft:health组件
     * @param {EntityType} entity 
     * @returns {Minecraft.EntityHealthComponent}
     */
    static getHealthComponent(entity){
        Entity.checkIsEntity(entity);
        return entity.getComponent("minecraft:health");
    }
    
    /**
     * 获取实体的物品栏
     * @param {EntityType} entity 
     * @returns {Minecraft.InventoryComponentContainer}
     */
    static getInventory(entity){
        Entity.checkIsEntity(entity);
        return entity.getComponent("minecraft:inventory").container;
    }
    
    /**
     * 获取实体的血量
     * @param {EntityType} entity
     * @returns {number}
     */
    static getCurrentHealth(entity){
        let component = Entity.getHealthComponent(entity);
        return (component === undefined) ? 0 : component.current;
    }
    
    /**
     * 获取所有存在的实体（包括死亡的玩家）
     * 注意，此方法的closest, farthest功能在在一定程度上遭到破坏
     * @param {Minecraft.EntityQueryOptions} option
     * @returns {EntityType[]}
     */
    static getLoadedEntities(option){
        return getLoadedEntities(option).map(_=> Entity.from(_));
    }
    
    /**
     * 获取实体最大血量
     * @param {EntityType} entity
     * @returns {number}
     */
    static getMaxHealth(entity){
        let component = Entity.getHealthComponent(entity);
        return (component === undefined) ? 0 : component.value;
    }
    
    /**
     * 得到一个Minecraft.Entity
     * @param {EntityType} entity
     * @returns {MinecraftEntityType|null}
     */
    static getMinecraftEntity(entity){
        Entity.checkIsEntity(entity);
        if (Entity.isMinecraftEntity(entity))
            return entity;
        else if (Entity.isYoniEntity(entity))
            return entity.vanillaEntity;
        return null;
    }
    
    /**
     * 得到一个Entity
     * @param {EntityType} entity
     * @returns {YoniEntityType|null}
     * @throws 如果参数不是实体将会抛出错误
     */
    static getYoniEntity(entity){
        Entity.checkIsEntity(entity);
        return Entity.from(entity);
    }
    
    /**
     * 检测一个实体是否有指定的所有种族
     * @param {EntityType} entity
     * @param {...string} families
     * @returns {boolean}
     */
    static hasFamilies(entity, ...families){
        entity = Entity.getMinecraftEntity(entity);
        return getLoadedEntities({ dimension: entity.dimension, type: entity.typeId, families: families }).includes(entity);
    }
    
    /**
     * 检测一个实体是否任一指定的种族
     * @param {EntityType} entity
     * @param {...string} families
     * @returns {boolean}
     */
    static hasAnyFamily(entity, ...families){
        entity = Entity.getMinecraftEntity(entity);
        for (const family of families){
            if (getLoadedEntities({ dimension: entity.dimension, type: entity.typeId, families: families }).includes(entity)){
                return true;
            }
        }
        return false;
    }
    
    /**
     * 检测一个实体是否有某个种族
     * @param {EntityType} entity
     * @param {string} family
     * @returns {boolean}
     */
    static hasFamily(entity, family){
        return Entity.hasAnyFamily(entity, family);
    }
    
    /**
     * 检测一个实体是否存在于世界上
     * @param {EntityType} entity
     * @returns {boolean}
     */
    static isAliveEntity(entity){
        entity = Entity.getMinecraftEntity(entity);
        return getLoadedEntities().includes(entity);
    }
    
    /**
     * 检测一个实体是否活着
     * 物品、箭、烟花等不是活的
     * 死了的实体也不是活的
     * @param {EntityType} entity
     * @returns {boolean}
     */
    static isAlive(entity){
        return Entity.getCurrentHealth(entity) > 0;
    }
    
    /**
     * 检测参数是否为实体
     * @param {any} obj
     * @returns {boolean}
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
     * @param {any} object
     * @returns {boolean}
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
     * @param {any} ent1
     * @param {any} ent2
     */
    static isSameEntity(ent1, ent2){
        if (Entity.isYoniEntity(ent1))
            ent1 = ent1.vanillaEntity;
        if (Entity.isYoniEntity(ent2))
            ent2 = ent2.vanillaEntity;
        return ent1 === ent2;
    }

    /**
     * 检测参数是否为YoniEntity
     * @param {any} object
     * @returns {boolean}
     */
    static isYoniEntity(object){
        if (object instanceof Entity)
            return true;
        else
            return false;
    }
    
    /**
     * 设置实体的血量
     * @param {EntityType} entity
     * @param {number} val
     */
    static setCurrentHealth(entity, val){
        let component = Entity.getHealthComponent(entity);
        if (!component){
            throw new Error("No health component for this entity");
        }
        component.setCurrent(val);
    }
    
}

class Player extends Entity {
    
    get inventory(){
        return Entity.getInventory(this);
    }
    
    get [Symbol.toStringTag](){
        if (this instanceof Player)
            return `[object Player]: { type: ${this.typeId} }`;
        return "[object Object]";
    }
    
    /**
     * @type {number}
     */
    get experienceLevel(){
        let level = 0;
        for (let i = 16384; i >= 1; i /= 2){
            level += i;
            let rt = VanillaWorld.getPlayers({ minLevel: level });
            if ( ! Array.from( rt ).includes( this.vanillaEntity ) )
            {
                level -= i;
            }
        }
        return level;
    }
    
   /**
     * @param {number} level
     */
   setExperienceLevel(level){
       if (isFinite(level) && level >= 0 && Number.isInteger(level)){
           return Promise.all([
               Command.addExecute(Command.PRIORITY_HIGH, this, "xp -24791l @s"),
               Command.addExecute(Command.PRIORITY_HIGH, this, `xp ${level}l @s`)
           ]);
       } else {
           throw new TypeError("level not allowed");
       }
    }
    
    /**
     * 踢出玩家
     * @param {string} [msg] - 踢出玩家时显示的消息
     */
    async kick(msg){
        let rt = await Command.addParams(Command.PRIORITY_HIGHEST, "kick", this.name, msg);
        if (rt.statusCode !== StatusCode.success){
            throw new Error(rt.statusMessage);
        }
    }
    
    /**
     * 向玩家发送消息
     * @param {string} message
     */
    sendMessage(message){
        let rawtext = { rawtext: [{ text: String(message) }] };
        return this.sendRawMessage(rawtext);
    }
    
    /**
     * @param {Minecraft.IRawMessage} rawtext 
     */
    sendRawMessage(rawtext){
        let command = "tellraw @s " + JSON.stringify(rawtext, dealWithCmd);
        return Command.addExecute(Command.PRIORITY_HIGH, this, command);
    }
}

class SimulatedPlayer extends Player {
    get [Symbol.toStringTag](){
        if (this instanceof SimulatedPlayer)
            return `SimulatedPlayer: { type: ${this.typeId} }`;
        return "Object";
    }
}

function defineEntityPrototypeFor(targetPrototype, srcPrototype){
    let undefinedKeys = [];
    for (let key in srcPrototype){
        if (key in targetPrototype){
            continue;
        }
        
        let propertyDescriptor = Object.getOwnPropertyDescriptor(srcPrototype, key);
        if ("value" in propertyDescriptor && typeof propertyDescriptor.value === "function"){
            Object.defineProperty(targetPrototype, key, {
                configurable: true,
                enumerable: false,
                writable: false,
                value: function (){
                    return this.vanillaEntity[key].apply(this.vanillaEntity, arguments);
                }
            });
        } else {
            Object.defineProperty(targetPrototype, key, {
                configurable: true,
                enumerable: false,
                get: function (){
                    return this.vanillaEntity[key];
                },
                set: function (value){
                    this.vanillaEntity[key] = value;
                }
            });
        }
    }
}

function getAliveEntities(option){
    if (option != null && ("location" in option || "maxDistance" in option || "minDistance" in option) && !("dimension" in option)){
        throw new Error("'location', 'maxDistance' or 'minDistance' usage in options is not allow, unless specified 'dimension' filed");
    }
    let entities = [];
    if (option?.dimension != null){
        let absoluteLocation = null;
        try {
            absoluteLocation = new Location(option);
        } catch (e){
            const error = new Error("failed to cover to absolute Location, may not have 'location' field ?");
            error.cause = e;
            throw error;
        }
        let absoluteDimension = absoluteLocation.dimension;
        if (absoluteDimension !== null){
            entities = Array.from(absoluteDimension.getEntities(option));
        }
    } else {
        for (let dimid of Object.values(Minecraft.MinecraftDimensionTypes)){
            for (let ent of VanillaWorld.getDimension(dimid).getEntities(option)){
                entities.push(ent);
            }
        }
    }
    
    return entities;
}

function getLoadedEntities(option){
    if (option != null && ("location" in option || "maxDistance" in option || "minDistance" in option) && !("dimension" in option)){
        throw new Error("'location', 'maxDistance' or 'minDistance' usage in options is not allow, unless specified 'dimension' filed");
    }
    let entities = [];
    let players = [];
    if (option?.dimension != null){
        let absoluteLocation = new Location(option);
        let absoluteDimension = absoluteLocation.dimension;
        if (absoluteDimension !== null){
            entities = Array.from(absoluteDimension.getEntities(option));
            //如果有这个属性的话，获取玩家会报错
            if (! ("entityType" in option && option.entityType === "minecraft:player")){
                players = Array.from(absoluteDimension.getPlayers(option));
            }
        }
    } else {
        entities = getAliveEntities(option);
        players = Array.from(VanillaWorld.getPlayers(option));
    }
    
    //如果玩家实体对象不在entities中，则推入
    players
    .filter(player => {
        return false === entities.includes(player);
    })
    .forEach(player => {
        entities.push(player)
    });
    
    return entities;
}


/* 修补 */
defineEntityPrototypeFor(Entity.prototype, Minecraft.Entity.prototype);
defineEntityPrototypeFor(Player.prototype, Minecraft.Player.prototype);
defineEntityPrototypeFor(SimulatedPlayer.prototype, Gametest.SimulatedPlayer.prototype);
/*修复结束*/

export default Entity;
export {
    SimulatedPlayer,
    Player,
    Entity
};
export {
    SimulatedPlayer as YoniSimulatedPlayer,
    Player as YoniPlayer,
    Entity as YoniEntity
};
