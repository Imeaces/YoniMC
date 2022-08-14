import { Minecraft, dim } from "scripts/yoni/basis.js";
import Entry from "scripts/yoni/scoreboard/Entry.js";
import Command from "scripts/yoni/command.js";

//need more info

export default class Entity {
    #vanillaEntity;
    getVanillaEntity(){
        return this.#vanillaEntity;
    }
    get location(){
        return this.#vanillaEntity.location;
    }
    get headLocation(){
        return this.#vanillaEntity.headLocation;
    }
    get id(){
        return this.#vanillaEntity.id;
    }
    get isSneaking(){
        return this.#vanillaEntity.isSneaking;
    }
    get nameTag(){
        if (Entity.entityIsPlayer(this.#vanillaEntity))
            return this.#vanillaEntity.name;
        let vname = this.#vanillaEntity.isSneaking;
        if (vname == null)
            return "";
        else
            return vname;
    }
    get rotation(){
        this.#vanillaEntity.rotation;
    }
    get scoreboard(){
        Entry.getEntry(this.#vanillaEntity);
    }
    get target(){
        this.#vanillaEntity.target;
    }
    get velocity(){
        this.#vanillaEntity.velocity;
    }
    get viewVector(){
        this.#vanillaEntity.viewVector;
    }
    get dimension(){
        return this.#vanillaEntity.dimension;
    }
    constructor(entity){
        if (Entity.isYoniEntity(entity)) //如果已经封装为YoniEntity，则直接返回原实体
            entity = entity.getVanillaEntity();
        if (!Entity.isMinecraftEntity(entity)) //如果不是MCEntity则报错
            throw new TypeError("There is not a Minecraft Entity type");
        this.#vanillaEntity = entity; //如果是MCEntity则保存
        for (let s in this.#vanillaEntity){
            if (this[s])
                continue;
            if (typeof this.#vanillaEntity[s] == "function")
                this[s] = function (...args){ return this.#vanillaEntity[s](...args); };
        }
    }
    isAliveEntity(){
        return Entity.isAliveEntity(this.#vanillaEntity);
    }
// get vanilla health component
// internal function for YoniEntity
    getHealthComponent(){
        try {
            return this.#vanillaEntity.getComponent("minecraft:health");
        } catch {
            return null;
        }
    }
    hasFamily(family){
        return Entity.hasFamily(this.#vanillaEntity, familiy);
    }
    hasAnyFamily(...families){
        return EntityhasAnyFamily(this.#vanillaEntity, ...families);
    }
    
    static entityIsPlayer(entity){
        entity = Entity.getMinecraftEntity(entity);
        if (entity instanceof Minecraft.Player)
            return true;
        return false;
    }

    static getCurrentHealth(entity){
        entity = new Entity(entity);
        let component = entity.getHealthComponent();
        if (component != null)
            return component.current;
        else 
            return 0;
    }
    
    static getLoadedEntities(){
        let loadedEntities = [];
        Array.from(dim(0).getEntities()).forEach((entity) => {
            loadedEntities.push(entity);
        });
        Array.from(dim(1).getEntities()).forEach((entity) => {
            loadedEntities.push(entity);
        });
        Array.from(dim(-1).getEntities()).forEach((entity) => {
            loadedEntities.push(entity);
        });
        return loadedEntities;
    }
    
    static getMaxHealth(entity){
        entity = new Entity(entity);
        let component = entity.getHealthComponent();
        
        let currentHealth = component.current;
        component.setToMax();
        let maxHealth = component.current;
        component.setToValue(currentHealth);
        return maxHealth;
    }
    
    static getMinecraftEntity(object, verbose=true){
        if (Entity.isMinecraftEntity(object))
            return object;
        else if (Entity.isYoniEntity(object))
            return object.getVanillaEntity();
        else if (verbose)
            throw new TypeError("Not a entity");
        return null;
    }

    static hasAnyFamily(entity, ...families){
        entity = Entity.getMinecraftEntity(entity, false);
        if (entity == null) return false;
        for (let fam of families){
            fam = String(fam);
            let command = "execute if entity @s[family="+fam+"]";
            if (Command.execute(entity, command).statusCode == 0)
                return true;
        }
        return false;
    }

    static hasFamily(entity, family){
        return Entity.hasAnyFamily(entity, family);
    }
    
    static isAliveEntity(entity){
        if (!Entity.isEntity(object))
            return false;
        entity = Entity.getMinecraftEntity(entity);
        for (let ent of getLoadedEntities()){
            if (entity === ent)
                return true;
        }
        return false;
    }

    static isAlive(entity){
        return Entity.getCurrentHealth(entity) > 0;
    }
    
    static isMinecraftEntity(object){
        if (object instanceof Minecraft.Entity)
            return true;
        if (object instanceof Minecraft.Player)
            return true;
        return false
    }
    
    static isSameEntity(ent1, ent2){
        try {
            let ent1 = Entity.getMinecraftEntity(ent1);
            let ent2 = Entity.getMinecraftEntity(ent2);
        } catch (err){
            return false;
        }
        if (ent1 === ent2)
            return true;
        return false;
    }

    static isYoniEntity(object){
        if (object instanceof Entity)
            return true;
    }
}
