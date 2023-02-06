// @ts-nocheck
import {
    Minecraft,
    Gametest,
    VanillaWorld,
    dim } from "../basis.js";
import { EntityClassRegistry } from "./EntityClassRegistry.js";

import { EntityType, EntityType, MinecraftEntityType } from "./EntityTypeDefs.js";

/**
 * 代表一个实体
 */
class EntityBase {
    
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
    
        //如果不是MCEntity则报错
        if (!EntityBase.isMinecraftEntity(entity))
            throw new TypeError("There is not a Minecraft Entity type");
        
        Object.defineProperty(this, "vanillaEntity", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: entity
        });
    }
    
    /**
     * 检查一个东西是否为实体
     * @param {any} obj - 任意
     * @throws 当不是实体的时候抛出错误
     */
    static checkIsEntity(obj){
        if (!EntityBase.isEntity(obj))
            throw new TypeError("Not a Entity type");
    }
    
    /**
     * 由实体对象创建对应的 YoniEntity 实体对象，这个方法确保了实体对象的唯一。
     * 
     * 如果要确保一定能获取到 YoniEntity 对象，请使用 {@link EntityBase.getYoniEntity}
     * @param {any} entity - 可以被认为是实体的东西，出于代码便利，允许传入任何值。实际上只有实体类型的对象才有效果。
     * @return {YoniEntityType} 如果 `entity` 不为实体类型，则返回 `null`。
     */
    static from(entity): YoniEntityType | null {
        return EntityClassRegistry.from(entity);
    }
    
    /**
     * 检测某个实体是否为玩家
     * @param {EntityType} entity 要检测的实体
     * @returns {Boolean}
     * @throws 当参数不是实体时抛出错误
     */
    static entityIsPlayer(entity){
        entity = EntityBase.getMinecraftEntity(entity);
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
        return getAliveEntities(option).map(_=>EntityBase.from(_));
    }
    
    /**
     * 获取实体的minecraft:health组件
     * @param {EntityType} entity 
     * @returns {Minecraft.EntityHealthComponent}
     */
    static getHealthComponent(entity){
        EntityBase.checkIsEntity(entity);
        return entity.getComponent("minecraft:health");
    }
    
    /**
     * 获取实体的物品栏
     * @param {EntityType} entity 
     * @returns {Minecraft.InventoryComponentContainer}
     */
    static getInventory(entity: EntityType): Minecraft.InventoryComponentContainer {
        EntityBase.checkIsEntity(entity);
        return (<Minecraft.InventoryComponent>entity.getComponent("minecraft:inventory")).container;
    }
    
    /**
     * 获取实体的血量
     * @param {EntityType} entity
     * @returns {number}
     */
    static getCurrentHealth(entity){
        let component = EntityBase.getHealthComponent(entity);
        return (component === undefined) ? 0 : component.current;
    }
    
    /**
     * @param {import('.../Location.js').DimensionLike}
     * @param {Minecraft.EntityQueryOptions} [options]
     */
    static getDimensionEntities(dimension, options, optionClass = Minecraft.EntityQueryOptions){
        if (!dimension){
            let ents = Object
                .getOwnPropertyNames(Minecraft.MinecraftDimensionTypes)
                .map(k => VanillaWorld.getDimension(k))
                .map(dim => dim.getEntities());
            let generator = function * (){
                for (let es of ents){
                    yield* es;
                }
            }
            return generator();
        }
        
        if (!options){
            return dim(dimension).getEntities();
        }
        
        let useInterface = false;
        let requireTest = false;
        try {
            useInterface = this.#useInterface;
            if (useInterface === null){
                requireTest = true;
            }
        } catch {
            requireTest = true;
        }
        
        if (requireTest){
            try {
                new Minecraft.EntityQueryOptions();
                useInterface = false;
            } catch {
                useInterface = true;
            }
            try {
                this.#useInterface = useInterface;
            } catch {}
        }
        
        let useOptions = options;
        if (!useInterface){
            useOptions = new Minecraft.EntityQueryOptions();
            
            Object.assign(useOptions, options);
        }
        
        return dim(dimension).getEntities(useOptions);
    }
    static #useInterface = null;
    /**
     * @param {import('.../Location.js').DimensionLike}
     * @param {Minecraft.EntityQueryOptions} [options]
     */
    static getWorldPlayers(options, optionClass = Minecraft.EntityQueryOptions){
        if (!options){
            return VanillaWorld.getPlayers();
        }
        
        let useInterface = false;
        let requireTest = false;
        try {
            useInterface = this.#useInterface2;
            if (useInterface === null){
                requireTest = true;
            }
        } catch {
            requireTest = true;
        }
        
        if (requireTest){
            try {
                new Minecraft.EntityQueryOptions();
                useInterface = false;
            } catch {
                useInterface = true;
            }
            try {
                this.#useInterface2 = useInterface;
            } catch {}
        }
        
        let useOptions = options;
        if (!useInterface){
            useOptions = new Minecraft.EntityQueryOptions();
            
            Object.assign(useOptions, options);
        }
        
        return dim(dimension).getEntities(useOptions);
    }
    static #useInterface2 = null;
    
    /**
     * 获取所有存在的实体（包括死亡的玩家）
     * @returns {EntityType[]}
     */
    static getLoadedEntities(){
        return getLoadedEntities().map(_=> EntityBase.from(_));
    }
    
    /**
     * 获取实体最大血量
     * @param {EntityType} entity
     * @returns {number}
     */
    static getMaxHealth(entity){
        let component = EntityBase.getHealthComponent(entity);
        return (component === undefined) ? 0 : component.value;
    }
    
    /**
     * 得到一个Minecraft.Entity
     * @param {EntityType} entity
     * @returns {MinecraftEntityType|null}
     */
    static getMinecraftEntity(entity){
        EntityBase.checkIsEntity(entity);
        if (EntityBase.isMinecraftEntity(entity))
            return entity;
        else if (EntityBase.isYoniEntity(entity))
            return entity.vanillaEntity;
        return null;
    }
    
    /**
     * 得到一个Entity
     * @param {EntityType} entity
     * @returns {YoniEntityType}
     * @throws 如果参数不是实体将会抛出错误
     */
    static getYoniEntity(entity: EntityType): YoniEntityType {
        EntityBase.checkIsEntity(entity);
        return EntityBase.from(entity) as unknown as YoniEntityType;
    }
    
    /**
     * 检测一个实体是否有指定的所有种族
     * @param {EntityType} entity
     * @param {...string} families
     * @returns {boolean}
     */
    static hasFamilies(entity, ...families){
        entity = EntityBase.getMinecraftEntity(entity);
        const dimension = entity.dimension;
        const tryEntities = EntityBase.getDimensionEntities(dimension, {
                type: entity.typeId,
                families: families
        });
        for (const cEntity of tryEntities){
            if (entity === cEntity){
                return true;
            }
        }
        return false;
    }
    
    /**
     * 检测一个实体是否任一指定的种族
     * @param {EntityType} entity
     * @param {...string} families
     * @returns {boolean}
     */
    static hasAnyFamily(entity, ...families){
        entity = EntityBase.getMinecraftEntity(entity);
        const dimension = entity.dimension;
        for (const family of families){
            const tryEntities = EntityBase.getDimensionEntities(dimension, {
                type: entity.typeId,
                families: Array.of(family)
            });
            for (const cEntity of tryEntities){
                if (entity === cEntity){
                    return true;
                }
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
        return EntityBase.hasFamilies(entity, family);
    }
    
    /**
     * 检测一个实体是否存在于世界上
     * @param {EntityType} entity
     * @returns {boolean}
     */
    static isAliveEntity(entity){
        entity = EntityBase.getMinecraftEntity(entity);
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
        EntityBase.checkIsEntity(entity);
        let comp = ent.getComponent("minecraft:health");
        if (comp == null)
            return false;
        if (comp.current > 0)
            return true;
        return false;
    }
    
    /**
     * 检测参数是否为实体
     * @param {any} obj
     * @returns {boolean}
     */
    static isEntity(obj): obj is (EntityBase | Minecraft.Entity){
        if (EntityBase.isYoniEntity(obj))
            return true;
        if (EntityBase.isMinecraftEntity(obj))
            return true;
         return false;
    }
    
    /**
     * 检测参数是否为原版实体
     * @param {any} object
     * @returns {boolean}
     */
    static isMinecraftEntity(object){
        if (object == null) return false;
        return EntityClassRegistry.includesInSrcPrototype(
            Object.getPrototypeOf(object)
        );
    }
    
    /**
     * 检测两个参数是否为同一实体
     * @param {any} ent1
     * @param {any} ent2
     */
    static isSameEntity(ent1, ent2){
        if (EntityBase.isYoniEntity(ent1))
            ent1 = ent1.vanillaEntity;
        if (EntityBase.isYoniEntity(ent2))
            ent2 = ent2.vanillaEntity;
        return ent1 === ent2;
    }

    /**
     * 检测参数是否为YoniEntity
     * @param {any} object
     * @returns {boolean}
     */
    static isYoniEntity(object){
        if (object instanceof EntityBase)
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
        let component = EntityBase.getHealthComponent(entity);
        if (!component){
            throw new Error("No health component for this entity");
        }
        component.setCurrent(val);
    }
    
}

export { EntityBase };
