import { Entity } from "./Entity.js";
import { Player } from "./Player.js";
import { SimulatedPlayer } from "./SimulatedPlayer.js";

export class StaticEntity {
    
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