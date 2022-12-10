import {
    Minecraft,
    Gametest,
    VanillaWorld } from "yoni/basis.js";
import { dealWithCmd } from "yoni/lib/utils.js";
import { Location } from "yoni/Location.js";
import { Command } from "yoni/command.js";
import { Entry } from "yoni/scoreboard/Entry.js";

const { EntityTypes } = Minecraft;

const entityMap = new WeakMap();

const entitySymbol = Symbol();

class Entity {
    
    vanillaEntity;
    
    /**
     * @hideconstructor
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
            return `[object Entity]: { type: ${this.typeId} }`;
        return "[object Object]";
    }
    
    get entityType(){
        return EntityTypes.get(this.typeId);
    }
    
    getMinecraftEntity(){
        //我该说这是历史遗留问题吗
        return this.vanillaEntity;
    }
    
    get location(){
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
    
    hasFamily(family){
        return Entity.hasAnyFamily(this, family);
    }
    
    hasAnyFamily(...families){
        return Entity.hasAnyFamily(this, ...families);
    }
    
    fetchCommand(cmd){
        return Command.fetchExecute(this, cmd);
    }
    
    say(message){
        let command = "say " + message;
        return Command.fetchExecute(this, command);
    }
    
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
     * @param {ILocation1|ILocation2} arg1
     * @param {boolean} [arg22]
     * @param {
     */
    teleport(arg1, arg11, arg2, arg21, arg22){
        let args = [arg1, arg11, arg2, arg21, arg22].filter(v => v != null);
        if (args.length <= 2){
            let keepVelocity = null;
            if (args.length === 2){
                keepVelocity = args.pop();
            }
            let location = new Location(...args);
            let { rx, ry, dimension } = location;
            this.vanillaEntity.teleport(location, dimension, rx, ry, keepVelocity);
        } else {
            this.vanillaEntity.teleport(...args);
        }
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
            rt = new Entity(entity, entitySymbol);
        else if (entity instanceof Minecraft.Player)
            rt = new Player(entity, entitySymbol);
        else if (entity instanceof Gametest.SimulatedPlayer)
            rt = new SimulatedPlayer(entity, entitySymbol);
        
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
        return getAliveEntities().map(_=>Entity.from(_));
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
        return getLoadedEntities().map(_=> Entity.from(_));
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
     * @param entity
     * @returns <? extends Minecraft.Entity>
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
     * 得到一个Entity，如果无法根据参数得到一个Entity将会抛出错误
     * @param entity
     * @returns <? extends Entity>
     */
    static getYoniEntity(entity){
        Entity.checkIsEntity(entity);
        return Entity.from(entity);
    }
    
    /**
     * 检测一个实体是否有某个种族
     * 由于无法同步执行命令，只能用其他方法来检测了
     * 性能不确定
     */
    static hasAnyFamily(entity, ...families){
        entity = Entity.getMinecraftEntity(entity);
        let ents = getLoadedEntities({ families: families });
        if (ents.includes(entity)){
            return true;
        } else {
            return false;
        }
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
        return getLoadedEntities().includes(entity);
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
     * 检测参数是否为YoniEntity
     * @param any
     */
    static isYoniEntity(object){
        if (object instanceof Entity)
            return true;
        else
            return false;
    }
    
    /**
     * 获取实体的血量
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
     * @returns {number}
     */
    get experienceLevel(){
        let level = 0;
        for (let i = 16384; i >= 1; i /= 2){
            let arr = VanillaWorld.getPlayers({ minLevel: i});
            if (Array.from(arr).includes(this.vanillaEntity)){
                level += i;
            }
        }
        return level;
    }
    
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
    
    sendMessage(message){
        let rawtext = { rawtext: [{ text: String(message) }] };
        return this.sendRawMessage(rawtext);
    }
    
    sendRawMessage(rawtext){
        let command = "tellraw @s " + JSON.stringify(rawtext, dealWithCmd);
        return Command.addExecute(Command.PRIORITY_HIGH, this, command);
    }
}

class SimulatedPlayer extends Player {
    get [Symbol.toStringTag](){
        if (this instanceof SimulatedPlayer)
            return `[object SimulatedPlayer]: { type: ${this.typeId} }`;
        return "[object Object]";
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
    let entities = [];
    
    Object.values(Minecraft.MinecraftDimensionTypes)
        .forEach((dimid)=>{
            for (let ent of VanillaWorld.getDimension(dimid).getEntities(option)){
                entities.push(ent);
            }
        });
    return entities;
}

function getLoadedEntities(option){
    if (("location" in option || "maxDistance" in option || "minDistance" in option) && !("dimension" in option)){
        throw new Error("'location', 'maxDistance' or 'minDistance' usage in options is not allow, unless specified 'dimension' filed");
    }
    let entities = [];
    let players = [];
    if (option.dimension != null){
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
    //虽然很好看，但是可能有隐患
    //不过如果不想它的话，这个代码的确挺好看的
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#%E4%BD%BF%E7%94%A8_apply_%E5%92%8C%E5%86%85%E7%BD%AE%E5%87%BD%E6%95%B0
    entities.push.apply(entities, players.filter(player => {
        return false === entities.includes(player);
    }));
    
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
