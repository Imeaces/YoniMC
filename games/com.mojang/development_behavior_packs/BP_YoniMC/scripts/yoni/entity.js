import { Minecraft, dim, Gametest, VanillaWorld, StatusCode } from "yoni/basis.js";
import { Command } from "yoni/command.js";
import Entry from "yoni/scoreboard/Entry.js";
import { dealWithCmd } from "yoni/lib/utils.js";

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

class Entity {
    
    get entityType(){
        return EntityTypes.get(this.typeid);
    }
    
    get typeid(){
        //我就喜欢你这种不区分大小写的人（请忽略上方的代码）
        return this.typeId;
    }
    
    vanillaEntity;
    
    getMinecraftEntity(){
        //我该说这是历史遗留问题吗
        return this.vanillaEntity;
    }
    
    constructor(entity, symbol){
    
        if (entity !== symbol){
            return Entity.from(entity);
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
    setCurrentHealth(){
        return Entity.setCurrentHealth(this);
    }
    setMaxHealth(){
        return Entity.setMaxHealth(this);
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
    
    /**
     * 获取实体的血量
     */
    static setCurrentHealth(entity, val){
        let component = Entity.getHealthComponent(entity);
        component.setCurrent(val);
    }
    /**
     * 获取实体最大血量
     */
    static setMaxHealth(entity, val){
        let component = Entity.getHealthComponent(entity);
        component.value = val;
    }
}

class Player extends Entity {
    
    /**
     * 踢出玩家
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
}

const defineEntityPrototypeFor = (targetPrototype, srcPrototype) => {
    let definedKeys = (()=>{
        let sa = targetPrototype;
        let keys = [];
        while (sa !== null){
            keys.push(...Object.getOwnPropertyNames(sa));
            sa = Object.getPrototypeOf(sa);
        }
        return keys;
    })();
    Object.getOwnPropertyNames(srcPrototype)
        .filter(key=>{
            return !definedKeys.includes(key);
        })
        .forEach((key)=>{
            if (typeof Object.getOwnPropertyDescriptor(srcPrototype, key).value === "function"){
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
        });
}

defineEntityPrototypeFor(Entity.prototype, Minecraft.Entity.prototype);
defineEntityPrototypeFor(Player.prototype, Minecraft.Player.prototype);
defineEntityPrototypeFor(SimulatedPlayer.prototype, Gametest.SimulatedPlayer.prototype);

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
export default Entity;
