// @ts-nocheck

import {
    Minecraft,
    VanillaWorld, 
    StatusCode } from "../basis.js";
import { dealWithCmd } from "../lib/utils.js";
import { Command } from "../command.js";
import { PlayerOnScreenDisplay } from "./player/PlayerOnScreenDisplay.js";
import { copyPropertiesWithoutOverride } from "../lib/ObjectUtils.js";
import { getNumber } from "../lib/getNumber.js";
import { Entity } from "./Entity.js";
import { EntityBase } from "./EntityBase.js";
import { EntityClassRegistry } from "./EntityClassRegistry.js";

const { MinecraftEntityTypes } = Minecraft;

class Player extends Entity {
    
    get vanillaPlayer(): Minecraft.Player {
        return this.vanillaEntity as unknown as Minecraft.Player;
    }
    
    get entityType(){
        return MinecraftEntityTypes.player;
    }
    
    get inventory(){
        return EntityBase.getInventory(this);
    }
    
    get [Symbol.toStringTag](){
        if (this instanceof Player)
            return `Player: { type: ${this.typeId}, name: ${this.name} }`;
        return "Object (Player)";
    }
    
    #onScreenDisplay: Minecraft.OnScreenDisplay = null;
    get onScreenDisplay(){
        if (this.vanillaEntity.onScreenDisplay){
            return this.vanillaEntity.onScreenDisplay;
        }
        if (this.#onScreenDisplay === null){
            this.#onScreenDisplay = new PlayerOnScreenDisplay(this);
        }
        return this.#onScreenDisplay;
    }
    
    /**
     * 玩家的经验等级
     * @type {number}
     */
    get experienceLevel(){
        let level = 0;
        for (let i = 16384; i >= 1; i /= 2){
            level += i;
            let rt = VanillaWorld.getPlayers({ minLevel: level });
            if ( ! Array.from( rt ).includes( this.vanillaEntity ) )
            {
                level -= i;
            }
        }
        return level;
    }
    
    /**
     * 设置玩家的经验等级
     * @param {number} level
     */
    setExperienceLevel(level){
        level = getNumber(level);
        Command.addExecute(Command.PRIORITY_HIGHEST, this, "xp -24791l @s");
        Command.addExecute(Command.PRIORITY_HIGHEST, this, `xp ${level}l @s`);
    }
    
    /**
     * 使玩家离开游戏，玩家将会看到他被服务器踢出游戏。
     * @param {string} [msg] - 踢出玩家时显示的消息。
     * @throws 若未能成功将玩家踢出游戏，抛出错误。
     */
    async kick(msg?: string){
        let rt = await Command.addParams(Command.PRIORITY_HIGHEST, "kick", this.name, msg);
        if (rt.statusCode !== StatusCode.success){
            throw new Error(rt.statusMessage);
        }
    }
    
    static #sendMessageMethod = Minecraft.Player.prototype.tell ?? Minecraft.Player.prototype.sendMessage ?? function sendMessageTo(...args){
        let command = "tellraw @s " + JSON.stringify({ rawtext: [{ text: String(args) }] }, dealWithCmd);
        Command.addExecute(Command.PRIORITY_HIGH, this, command);
    }
    
    /**
     * 向玩家发送消息
     * @param {string} message
     */
    sendMessage(message: string): void {
        Player.#sendMessageMethod.apply(this.vanillaPlayer, arguments);
    }
     
    get gamemode(): "creative"|"survival"|"adventure"|"spectator" {
        for (let gm of Object.getOwnPropertyNames(Minecraft.GameMode).map(k=>Minecraft.GameMode[k])){
            for (let player of VanillaWorld.getPlayers({gameMode: gm})){
                if (EntityBase.isSameEntity(this, player)){
                    return gm;
                }
            }
        }
        throw new Error("unknown gamemode");
    }
    set gamemode(v: 0|1|2|"c"|"a"|"s"|"d"|"creative"|"survival"|"adventure"|"spectator"|"default"){
        let command = `gamemode ${v} @s`;
        Command.addExecute(Command.PRIORITY_HIGHEST, this, command);
    }

}

/* 修补 */
copyPropertiesWithoutOverride(Player.prototype, Minecraft.Player.prototype, "vanillaEntity");
/*修复结束*/

EntityClassRegistry.register(Player, Minecraft.Player);

type YoniPlayer = Player & Minecraft.Player;

export default YoniPlayer;
export { YoniPlayer, Player };
