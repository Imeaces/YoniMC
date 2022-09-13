import { Minecraft, dim } from "scripts/yoni/basis.js";
import Entry from "scripts/yoni/scoreboard/Entry.js";
import Command from "scripts/yoni/command.js";

//need more info

export default class YoniEntity {
    #vanillaEntity;
    getMinecraftEntity(){
        return this.#vanillaEntity;
    }
    get nameTag(){
        if (YoniEntity.entityIsPlayer(this.#vanillaEntity))
            return this.#vanillaEntity.name;
        let vname = this.#vanillaEntity.nameTag;
        if (vname == null)
            return "";
        else
            return vname;
    }
    set nameTag(name){
        this.#vanillaEntity.nameTag = name;
    }
    get scoreboard(){
        if (this.#vanillaEntity.scoreboard != null){
            return this.#vanillaEntity.scoreboard;
        } else {
            return Entry.getEntry(this);
        }
    }
    get isPlayer(){
        if (this.#vanillaEntity instanceof Minecraft.Player)
            return true;
        else return false;
    }
    constructor(entity){
        if (YoniEntity.isYoniEntity(entity)) //如果已经封装为YoniEntity，则直接返回原实体
            return entity;
        if (!YoniEntity.isMinecraftEntity(entity)) //如果不是MCEntity则报错
            throw new TypeError("There is not a Minecraft Entity type");
        this.#vanillaEntity = entity; //如果是MCEntity则保存
        for (let s in this.#vanillaEntity){ //建立变量,函数
            if (this[s])
                continue;
            if (typeof this.#vanillaEntity[s] == "function"){
                this[s] = function (...args){ return this.#vanillaEntity[s](...args); };
            } else {
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
        }
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
    static getAliveEntities(){
        let entities = [];
        
        for (dimid in Minecraft.MinecraftDimensionTypes){
            entities.push(...Array.from(dim(dimid).getEntities()));
        }
        return entities;
    }
    
    /**
     * 获取所有存在的实体
     */
    static getLoadedEntities(){
        let entities = this.getAliveEntities();
        Array.from(VanillaWorld.getPlayers()).forEach((_)=>{
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