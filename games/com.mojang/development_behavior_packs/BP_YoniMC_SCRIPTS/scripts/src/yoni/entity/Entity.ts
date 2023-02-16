// @ts-nocheck

import { Minecraft } from "../basis.js";
import { Location } from "../Location.js";
import { Command } from "../command.js";
import { Entry } from "../scoreboard/Entry.js";
import { copyPropertiesWithoutOverride } from "../lib/ObjectUtils.js";

import { EntityBase } from "./EntityBase.js";
import { EntityClassRegistry } from "./EntityClassRegistry.js";

const { EntityTypes } = Minecraft;

/**
 * @typedef {Entity|Player|SimulatedPlayer} YoniEntityType
 * @typedef {Minecraft.Player|Minecraft.Entity|import("../basis.js").Gametest.SimulatedPlayer} MinecraftEntityType
 * @typedef {YoniEntityType|MinecraftEntityType} EntityType
 */

/**
 * 代表一个实体
 */
class Entity extends EntityBase implements Minecraft.Entity {
    
    get [Symbol.toStringTag](){
        if (this instanceof Entity)
            return `Entity: { type: ${this.typeId} }`;
        return "Object (Entity)";
    }
    
    get id() { 
        return this.vanillaEntity.id;
    }

    get typeId() {
        return this.vanillaEntity.typeId ?? this.vanillaEntity.id;
    }

    get velocity() {
        return this.vanillaEntity.velocity;
    }
    
    get entityType() {
        return EntityTypes.get(this.typeId);
    }
    
    get dimension() {
        return this.vanillaEntity.dimension;
    }

    getMinecraftEntity(){
        //我该说这是历史遗留问题吗
        return this.vanillaEntity;
    }
    
    get location() {
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
        return EntityBase.isAliveEntity(this);
    }
    
    isAlive(){
        return EntityBase.isAlive(this);
    }
    
    getCurrentHealth(){
        return EntityBase.getCurrentHealth(this);
    }
    
    getHealthComponent(){
        return EntityBase.getHealthComponent(this);
    }
    
    getInventory(){
        return EntityBase.getInventory(this);
    }
    
    getMaxHealth(){
        return EntityBase.getMaxHealth(this);
    }
    
    /**
     * @param {string} family
     */
    hasFamily(family){
        return EntityBase.hasAnyFamily(this, family);
    }
    /**
     * 
     * @param  {...string} families 
     * @returns 
     */
    hasAnyFamily(...families){
        return EntityBase.hasAnyFamily(this, ...families);
    }
    
    /**
     * 
     * @param {string} cmd 
     * @returns {Promise<Minecraft.CommandResult>}
     */
    fetchCommand(cmd){
        return Command.fetchExecute(this, cmd);
    }
    
    /**
     * @param {string} message
     */
    say(message){
        let command = "say " + message;
        return Command.fetchExecute(this, command);
    }
    
    /**
     * @param {number} v
     */
    setCurrentHealth(v){
        return EntityBase.setCurrentHealth(this, v);
    }
    
    /**
     * 传入位置，将实体传送到指定位置
     * 允许两种长度的参数，由于此特性，补全提示可能会出现一些错误，已在补全中尝试修复。
     * 当传入了1个参数，被认为是yoni的方法  
     * 当传入了2个参数，被认为是yoni的方法  
     * 当传入了4个参数，被认为是原版的方法   
     * 当传入了5个参数，被认为是原版的方法  
     * yoni方法中，第一个参数认为是位置，第二个参数认为是keepVelocity
     * 原版方法中参数顺序为[location, dimension, rx, ry, keepVelocity?=null]
     * 所以你可以直接传入实体对象、方块对象、或者普通位置对象，或者接口
     * @param {import("./Location.js").Location1Arg|Minecraft.Vector3} argLocation
     * @param {Minecraft.Dimension} [argDimension]
     * @param {number} [argRx]
     * @param {number} [argRy]
     * @param {boolean} [keepVelocity]
     */
    teleport(...args: [import("./Location.js").Location1Arg|Minecraft.Vector3, boolean]){
        let [ argLocation, argDimension, argRx, argRy, keepVelocity ] : [ import("./Location.js").Location1Arg|Minecraft.Vector3, number, number, number, boolean ] = args;
        
        args = args.filter(v => v !== undefined);
        if (args.length <= 2){
            let location = new Location(argLocation);
            let { rx, ry, dimension } = location;
            if (keepVelocity == null){
                this.vanillaEntity.teleport(location, dimension, rx, ry);
            } else {
                this.vanillaEntity.teleport(location, dimension, rx, ry, keepVelocity);
            }
        } else {
            this.vanillaEntity.teleport(...args);
        }
    }
}

/* 修补 */
copyPropertiesWithoutOverride(Entity.prototype, Minecraft.Entity.prototype, "vanillaEntity");
/*修复结束*/

EntityClassRegistry.register(Entity, Minecraft.Entity);

type YoniEntity = Entity & Minecraft.Entity;

export default YoniEntity;
export { YoniEntity, Entity };
