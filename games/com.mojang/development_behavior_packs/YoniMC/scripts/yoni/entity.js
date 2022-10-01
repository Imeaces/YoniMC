import { Minecraft, Gametest, dim } from "scripts/yoni/basis.js";
import Entry from "scripts/yoni/scoreboard/Entry.js";
import Command from "scripts/yoni/command.js";

//need more info
let entityMap = new WeakMap();

export default class YoniEntity {
    #vanillaEntity;
    constructor(entity, symbol){
        // 如果有记录，直接返回对应实体
        if (entityMap.has(entity)) return entityMap.get(entity);
        
        if (entity instanceof YoniEntity) //如果已经封装为YoniEntity，则直接返回原实体
            return entity;
        
        //为了兼容，不得不这么做
        if (symbol !== entity) return YoniEntity.getEntity(entity);
        
        if (!YoniEntity.isMinecraftEntity(entity)) //如果不是MCEntity则报错
            throw new TypeError("There is not a Minecraft Entity type");
        
        this.#vanillaEntity = entity; //如果是MCEntity则保存
        
        for (let s in this.#vanillaEntity){ //建立变量,函数
            if (s in this)
                continue;
            Object.defineProperties(this, {
                [s]: {
                    get(){
                        return this.#vanillaEntity[s];
                    },
                    set(t){
                        return this.#vanillaEntity[s] = t;
                    }
                }
            });
        }
        
        entityMap.set(entity, this);
    }
    
    static getEntity(entity){
        if (entity instanceof Minecraft.Player)
            return new Player(entity, entity);
        if (entity instanceof Minecraft.Entity)
            return new Entity(entity, entity);
        if (entity instanceof Gametest.SimulatedPlayer)
            return new SimulatedPlayer(entity, entity);
    }
    
    /**
     * 获取所有存在的实体
     */
    static getLoadedEntities(...args){
        let entities = this.getAliveEntities(...args);
        Array.from(VanillaWorld.getPlayers(...args)).forEach((_)=>{
            if (!entities.includes(_)){
                entities.push(_);
            }
        });
        return entities;
    }
    
    static getMaxHealth(entity){
        entity = new YoniEntity(entity);
        let component = entity.getHealthComponent();
        
        return component.value;
    }
    
    static getMinecraftEntity(object, verbose=true){
        if (YoniEntity.isMinecraftEntity(object))
            return object;
        else if (YoniEntity.isYoniEntity(object))
            return object.getVanillaEntity();
        else if (verbose)
            throw new TypeError("Not a entity");
        return null;
    }

    static hasAnyFamily(entity, ...families){
        entity = YoniEntity.getMinecraftEntity(entity, false);
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
        return YoniEntity.hasAnyFamily(entity, family);
    }
    
    static isAliveEntity(entity){
        if (!YoniEntity.isEntity(object))
            return false;
        entity = YoniEntity.getMinecraftEntity(entity);
        for (let ent of YoniEntity.getLoadedEntities()){
            if (entity.getMinecraftEntity() === ent)
                return true;
        }
        return false;
    }

    static isAlive(entity){
        return YoniEntity.getCurrentHealth(entity) > 0;
    }
    
    static isMinecraftEntity(object){
        if (object instanceof Minecraft.Entity)
            return true;
        if (object instanceof Minecraft.Player)
            return true;
        return false
    }
    
    static isPlayer(object){
        if (object == null)
            return false;
        if (object instanceof Minecraft.Player)
            return true;
        if (object instanceof YoniEntity && object.isPlayer)
            return true;
        return false;
    }
    
    static isSameEntity(ent1, ent2){
        try {
            let ent1 = YoniEntity.getMinecraftEntity(ent1);
            let ent2 = YoniEntity.getMinecraftEntity(ent2);
        } catch (err){
            return false;
        }
        if (ent1 === ent2)
            return true;
        return false;
    }

    static isYoniEntity(object){
        if (object instanceof YoniEntity)
            return true;
    }
}

export { YoniEntity }

export class Entity extends YoniEntity {
    
    get vanillaEntity(){
        return this.#vanillaEntity;
    }
    getMinecraftEntity(){
        return this.#vanillaEntity;
    }
    get scoreboard(){
        return Entry.getEntry(this);
    }
    isAliveEntity(){
        return YoniEntity.isAliveEntity(this.#vanillaEntity);
    }
    getCurrentHealth(){
        let comp = this.getHealthComponent();
        if (comp != null){
            return comp.current;
        } else {
            return null;
        }
    }
    getHealthComponent(){
        try {
            return this.#vanillaEntity.getComponent("minecraft:health");
        } catch {
            return null;
        }
    }
    hasFamily(family){
        return YoniEntity.hasFamily(this.#vanillaEntity, familiy);
    }
    hasAnyFamily(...families){
        return YoniEntity.hasAnyFamily(this.#vanillaEntity, ...families);
    }
    say(message){
        let command = "say +" + message;
        return Command.execute(this, command);
    }
    
    static entityIsPlayer(entity){
        entity = YoniEntity.getMinecraftEntity(entity);
        if (entity instanceof Minecraft.Player)
            return true;
        return false;
    }

    static getCurrentHealth(entity){
        entity = new YoniEntity(entity);
        let component = entity.getHealthComponent();
        if (component != null)
            return component.current;
        else 
            return 0;
    }
    
    /**
     * 获取所有存活的实体
     */
    static getAliveEntities(...args){
        let entities = [];
        
        for (dimid in Minecraft.MinecraftDimensionTypes){
            entities.push(...Array.from(dim(dimid).getEntities(...args)));
        }
        return entities;
    }
    
}

export class Player extends Entity {
    sendMessage(message){
        if (!this.isPlayer) return false;
        let rawtext = JSON.stringify({ rawtext: [ { text: String(message) } ]});
        return this.sendRawMessage(rawtext);
    }
    sendRawMessage(messageJson){
        if (!this.isPlayer) return false;
        let command = "tellraw @s " + messageJson;
        try {
            if (Command.execute(this, command).statusCode == 0)
                return true;
            else return false;
        } catch { return false; }
        return false;
    }
}

export class SimulatedPlayer extends Player {}
