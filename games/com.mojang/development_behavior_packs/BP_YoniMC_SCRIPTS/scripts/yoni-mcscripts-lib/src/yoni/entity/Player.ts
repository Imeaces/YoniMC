import {
    Minecraft,
    VanillaWorld, 
    StatusCode } from "../basis.js";
import { dealWithCmd } from "../lib/utils.js";
import { Command } from "../command.js";
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
        let player = <YoniPlayer><unknown>this;
        if (player instanceof Player)
            return `Player: { type: ${player.typeId}, name: ${player.name} }`;
        return "Object (Player)";
    }
    
    /**
     * 玩家的经验等级。
     * @type {number}
     */
    get experienceLevel(){
        let player = <YoniPlayer><unknown>this;
        return player.level;
    }
    
    /**
     * 设置玩家的经验等级。
     * @param {number} level
     */
    setExperienceLevel(level: number){
        level = getNumber(level);
        let player = <YoniPlayer><unknown>this;
        if (player.level !== level)
            player.addLevels(level - player.level);
    }
    
    /**
     * 使玩家离开游戏，玩家将会看到他被服务器踢出游戏。
     * @param {string} [msg] - 踢出玩家时显示的消息。
     * @throws 若未能成功将玩家踢出游戏，抛出错误。
     */
    async kick(msg?: string){
        let player = <YoniPlayer><unknown>this;
        let rt;
        if (msg)
            rt = await Command.addParams(Command.PRIORITY_HIGHEST, "kick", player.name, msg);
        else
            rt = await Command.addParams(Command.PRIORITY_HIGHEST, "kick", player.name);
        if (rt.statusCode !== StatusCode.success){
            throw new Error(rt.statusMessage);
        }
    }
    
    sendChatMessage(msg: string){
        let rawtext = JSON.stringify({rawtext:[{text: msg}]}, dealWithCmd);
        Command.addExecute(Command.PRIORITY_HIGH, this.vanillaPlayer, `tellraw @s ${rawtext}`);
    }
    
    get gamemode(): Minecraft.GameMode {
        let player = <YoniPlayer><unknown>this;
        // @ts-ignore
        for (let gm of Object.getOwnPropertyNames(Minecraft.GameMode).map(k=>Minecraft.GameMode[k])){
            for (let splayer of VanillaWorld.getPlayers({gameMode: gm})){
                if (EntityBase.isSameEntity(splayer, player)){
                    return gm;
                }
            }
        }
        throw new Error("unknown gamemode");
    }
    setGamemode(v: PlayerGameModeValue){
        let player = <YoniPlayer><unknown>this;
        let command = `gamemode ${<string>v} @s`;
        Command.addExecute(Command.PRIORITY_HIGHEST, player, command);
    }
    removeXp(xpCount: number){
        let player = <YoniPlayer><unknown>this;
        
        if (player.xpEarnedAtCurrentLevel >= xpCount){
            player.addExperience(-xpCount);
            return;
        }
  
        let v0 = player.xpEarnedAtCurrentLevel;
        xpCount -= v0;
        player.addExperience(-v0);
  
        while (xpCount > 0 && player.level > 0){
            player.addLevels(-1);
            xpCount -= player.totalXpNeededForNextLevel;
        }
  
        if (xpCount < 0)
            player.addExperience(xpCount);
    }
    applyImpulse(vector: Minecraft.Vector3){
        try {
            super.applyImpulse(vector);
        } catch (e){
            //@ts-ignore
            throw new Error(e);
        }
    }
}

type PlayerGameModeValue = Minecraft.GameMode | PlayerGameModeCode | PlayerGameModeId | "default";
type PlayerGameModeCode = 0 | 1 | 2
type PlayerGameModeId = "creative"|"survival"|"adventure"|"spectator";

/* 修补 */
copyPropertiesWithoutOverride(Player.prototype, Minecraft.Player.prototype, "vanillaEntity");
/*修复结束*/

EntityClassRegistry.register(Player, Minecraft.Player);

type YoniPlayer = Player & Minecraft.Player;

export default YoniPlayer;
export { YoniPlayer, Player };
