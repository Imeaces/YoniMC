import { EntityBase } from "./EntityBase.js";

export class EntityClassRegistry {
    static #entityMap = new WeakMap();
    
    static #entityClassRegistry = new Map();
    static get entityClassRegistry(){
        return new Map(EntityClassRegistry.#entityClassRegistry.entries());
    }
    
    static #entityClassPrototypeRegistry = new Map();
    static get entityClassPrototypeRegistry(){
        return new Map(EntityClassRegistry.#entityClassPrototypeRegistry.entries());
    }
    
    static #entitySrcClassRegistry = new Map();
    static get entitySrcClassRegistry(){
        return new Map(EntityClassRegistry.#entitySrcClassRegistry.entries());
    }
    
    static #entitySrcClassPrototypeRegistry = new Map();
    static get entitySrcClassPrototypeRegistry(){
        return new Map(EntityClassRegistry.#entitySrcClassPrototypeRegistry.entries());
    }
    
    static from(entity){
        if (entity instanceof EntityBase)
            return entity;
        
        if (EntityClassRegistry.#entityMap.has(entity))
            return EntityClassRegistry.#entityMap.get(entity);
        
        let prototypeObject;
        try {
            prototypeObject = Object.getPrototypeOf(entity);
        } catch {
            return null;
        }
        let mappingClass = null;
        
        if (EntityClassRegistry.#entityClassPrototypeRegistry.has(prototypeObject))
            mappingClass = EntityClassRegistry.#entityClassPrototypeRegistry.get(prototypeObject);
        
        if (mappingClass === null)
            return null;
        
        let mappedEntity = new mappingClass(entity);
        
        EntityClassRegistry.#entityMap.set(entity, mappedEntity);
        
        return mappedEntity;
        
    }
    static register(entityClass, originalEntityClass){
        if (! (entityClass.prototype instanceof EntityBase))
            throw new TypeError("the entityClass has not implemented EntityBase");
        
        EntityClassRegistry.#entityClassPrototypeRegistry.set(originalEntityClass.prototype, entityClass);
        EntityClassRegistry.#entityClassRegistry.set(originalEntityClass, entityClass);
        
        EntityClassRegistry.#entitySrcClassPrototypeRegistry.set(entityClass.prototype, originalEntityClass);
        EntityClassRegistry.#entitySrcClassRegistry.set(entityClass, originalEntityClass);
    }
    static unregister(entityClass, originalEntityClass){
        EntityClassRegistry.#entityClassPrototypeRegistry.delete(originalEntityClass.prototype);
        EntityClassRegistry.#entityClassRegistry.delete(originalEntityClass);
        
        EntityClassRegistry.#entitySrcClassPrototypeRegistry.delete(entityClass.prototype);
        EntityClassRegistry.#entitySrcClassRegistry.delete(entityClass);
    }
    
    static includesInSrcPrototype(object){
        return EntityClassRegistry.#entityClassPrototypeRegistry.has(object);
    }
    static includesInMappedPrototype(object){
        return EntityClassRegistry.#entitySrcClassPrototypeRegistry.has(object);
    }
    static includesInSrcClass(object){
        return EntityClassRegistry.#entityClassRegistry.has(object);
    }
    static includesInMappedClass(object){
        return EntityClassRegistry.#entitySrcClassRegistry.has(object);
    }
}
