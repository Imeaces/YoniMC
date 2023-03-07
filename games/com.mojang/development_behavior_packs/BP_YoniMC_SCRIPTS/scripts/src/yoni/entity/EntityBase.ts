import {
    Minecraft,
    Gametest,
    VanillaWorld,
} from "../basis.js";
import { EntityClassRegistry } from "./EntityClassRegistry.js";
import { DimensionLike } from "../Location.js";
import { Dimension } from "../dimension.js";
import { EntityValue } from "./EntityTypeDefs.js";

import YoniEntity from "./Entity.js";

import YoniPlayer from "./Player.js";

/**
 * 代表一个实体
 */
class EntityBase {
    
    /**
     * @type {Minecraft.Entity}
     */
    // @ts-ignore
    readonly vanillaEntity: Minecraft.Entity;
    
    /**
     * @hideconstructor
     * @param {Minecraft.Entity} entity
     */
    constructor(entity: Minecraft.Entity){
    
        if (!EntityClassRegistry.includesInSrcPrototype(Object.getPrototypeOf(entity)))
            throw new TypeError("no mapping for the object proto");
        
        Object.defineProperty(this, "vanillaEntity", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: entity
        });
    }
    
    /**
     * 检查一个东西是否为实体
     * @param {any} object - 任意
     * @throws 当不是实体的时候抛出错误
     */
    static checkIsEntity(object: any){
        if (!EntityBase.isEntity(object))
            throw new TypeError("Not a Entity type");
    }
    
    /**
     * 由实体对象创建对应的 YoniEntity 实体对象，这个方法确保了实体对象的唯一。
     * 
     * 如果要确保一定能获取到 YoniEntity 对象，请使用 {@link EntityBase.getYoniEntity}
     * @param {any} entity - 可以被认为是实体的东西，出于代码便利，允许传入任何值。实际上只有实体类型的对象才有效果。
     * @return {YoniEntity} 如果 `entity` 不为实体类型，则返回 `null`。
     */
    static from(entity: any): YoniEntity | null {
        return EntityClassRegistry.from(entity);
    }
    
    /**
     * 检测某个实体是否为玩家
     * @param {EntityValue} entity 要检测的实体
     * @returns {boolean}
     * @throws 当参数不是实体时抛出错误
     */
    static entityIsPlayer(entity: EntityValue): entity is (Minecraft.Player | YoniPlayer ) {
        entity = EntityBase.getMinecraftEntity(entity);
        if (entity instanceof Minecraft.Player)
            return true;
        return false;
    }
    
    /**
     * 获取所有存活的实体
     * @param {Minecraft.EntityQueryOptions} option
     * @return {YoniEntity[]}
     */
    static getAliveEntities(option: Minecraft.EntityQueryOptions): YoniEntity[] {
        return Array.from(EntityBase.getDimensionEntities()).map(EntityBase.from) as unknown as YoniEntity[];
    }
    
    /**
     * 获取实体的minecraft:health组件
     * @param {EntityValue} entity 
     * @returns {Minecraft.EntityHealthComponent}
     */
    static getHealthComponent(entity: EntityValue): Minecraft.EntityHealthComponent {
        EntityBase.checkIsEntity(entity);
        return entity.getComponent("minecraft:health") as Minecraft.EntityHealthComponent;
    }
    
    /**
     * 获取实体的物品栏
     * @param {EntityValue} entity 
     * @returns {Minecraft.InventoryComponentContainer}
     */
    static getInventory(entity: EntityValue): Minecraft.InventoryComponentContainer {
        EntityBase.checkIsEntity(entity);
        return (<Minecraft.EntityInventoryComponent>entity.getComponent("minecraft:inventory")).container;
    }
    
    /**
     * 获取实体的血量
     * @param {EntityValue} entity
     * @returns {number}
     */
    static getCurrentHealth(entity: EntityValue): number {
        let component = EntityBase.getHealthComponent(entity);
        return (component === undefined) ? 0 : component.current;
    }
    
    /**
     * @param {import('../Location.js').DimensionLike} dimension
     * @param {Minecraft.EntityQueryOptions} [options]
     */
    static getDimensionEntities(dimension?: DimensionLike, options?: Minecraft.EntityQueryOptions): Iterable<Minecraft.Entity> {
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
            return Dimension.dim(dimension).vanillaDimension.getEntities();
        }
        
        return Dimension.dim(dimension).vanillaDimension.getEntities(options);
    }
    
    /**
     * @param {import('.../Location.js').DimensionLike}
     * @param {Minecraft.EntityQueryOptions} [options]
     */
    static getWorldPlayers(options?: Minecraft.EntityQueryOptions): Iterable<Minecraft.Player> {
        if (!options){
            return VanillaWorld.getPlayers();
        }
        
        return VanillaWorld.getPlayers(options);
    }
    
    /**
     * 获取所有存在的实体（包括死亡的玩家）
     * @returns {EntityValue[]}
     */
    static getLoadedEntities(): Minecraft.Entity[] {
        let entities = new Set<Minecraft.Entity>();
        for (let e of EntityBase.getDimensionEntities()){
            entities.add(e);
        }
        for (let p of EntityBase.getWorldPlayers()){
            entities.add(p);
        }
        return Array.from(entities);
    }
    
    /**
     * 获取实体最大血量
     * @param {EntityValue} entity
     * @returns {number}
     */
    static getMaxHealth(entity: EntityValue){
        let component = EntityBase.getHealthComponent(entity);
        return (component === undefined) ? 0 : component.value;
    }
    
    /**
     * 得到一个Minecraft.Entity
     * @param {EntityValue} entity
     * @returns {MinecraftEntityType}
     */
    static getMinecraftEntity(entity: EntityValue): Minecraft.Entity {
        EntityBase.checkIsEntity(entity);
        if (EntityBase.isMinecraftEntity(entity))
            return entity;
        else if (EntityBase.isYoniEntity(entity))
            return entity.vanillaEntity;
        throw new Error("no reference");
    }
    
    /**
     * 得到一个Entity
     * @param {EntityValue} entity
     * @returns {YoniEntityType}
     * @throws 如果参数不是实体将会抛出错误
     */
    static getYoniEntity(entity: EntityValue): YoniEntity {
        EntityBase.checkIsEntity(entity);
        return EntityBase.from(entity) as unknown as YoniEntity;
    }
    
    /**
     * 检测一个实体是否有指定的所有种族
     * @param {EntityValue} entity
     * @param {...string} families
     * @returns {boolean}
     */
    static hasFamilies(entity: EntityValue, ...families: string[]){
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
     * @param {EntityValue} entity
     * @param {...string} families
     * @returns {boolean}
     */
    static hasAnyFamily(entity: EntityValue, ...families: string[]){
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
     * @param {EntityValue} entity
     * @param {string} family
     * @returns {boolean}
     */
    static hasFamily(entity: EntityValue, family: string){
        return EntityBase.hasFamilies(entity, family);
    }
    
    /**
     * 检测一个实体是否存在于世界上
     * @param {EntityValue} entity
     * @returns {boolean}
     */
    static isAliveEntity(entity: EntityValue){
        entity = EntityBase.getMinecraftEntity(entity);
        for (let e of EntityBase.getDimensionEntities()){
            if (e === entity) return true;
        }
        for (let p of EntityBase.getWorldPlayers()){
            if (p === entity) return true;
        }
        return false;
    }
    
    /**
     * 检测一个实体是否活着
     * 物品、箭、烟花等不是活的
     * 死了的实体也不是活的
     * @param {EntityValue} entity
     * @returns {boolean}
     */
    static isAlive(entity: EntityValue){
        EntityBase.checkIsEntity(entity);
        let comp = entity.getComponent("minecraft:health");
        if (comp == null)
            return false;
        if ((<Minecraft.EntityHealthComponent>comp).current > 0)
            return true;
        return false;
    }
    
    /**
     * 检测参数是否为实体
     * @param {any} obj
     * @returns {boolean}
     */
    static isEntity(obj: any): obj is (YoniEntity | Minecraft.Entity){
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
    static isMinecraftEntity(object: any): object is Minecraft.Entity {
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
    static isSameEntity(ent1: any, ent2: any){
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
    static isYoniEntity(object: any): object is YoniEntity {
        return object instanceof EntityBase;
    }
    
    /**
     * 设置实体的血量
     * @param {EntityValue} entity
     * @param {number} val
     */
    static setCurrentHealth(entity: EntityValue, val: number){
        let component = EntityBase.getHealthComponent(entity);
        if (!component){
            throw new Error("No health component for this entity");
        }
        component.setCurrent(val);
    }
    
}

export { EntityBase };
