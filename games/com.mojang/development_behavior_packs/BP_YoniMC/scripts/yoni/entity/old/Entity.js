import { Minecraft } from "yoni/basis.js";
import { Command } from "yoni/command.js";
import { Entry } from "yoni/scoreboard/Entry.js";
import { Location } from "yoni/Location.js";
import { getLoadedEntities, getAliveEntities, defineEntityPrototypeFor } from "./basis.js";

import { Static } from "./static.js";

const { EntityTypes } = Minecraft;

const entityMap = new WeakMap();

const entitySymbol = Symbol();

export class Entity {
    
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
    
    vanillaEntity;
    
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
    
}
/* 修补 */
//定义不存在的属性
defineEntityPrototypeFor(Entity.prototype, Minecraft.Entity.prototype);
/*修复结束*/
