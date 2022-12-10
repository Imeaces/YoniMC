import { defineEntityPrototypeFor } from "./basis.js";
import { Minecraft } from "yoni/basis.js";
import { Entity } from "./Entity.js";
import { Command } from "yoni/command.js";
import { dealWithCmd } from "yoni/lib/utils.js";

export class Player extends Entity {
    
    get inventory(){
        return Entity.getInventory(this);
    }
    
    get [Symbol.toStringTag](){
        if (this instanceof Player)
            return `[object Player]: { type: ${this.typeId} }`;
        return "[object Object]";
    }
    
    /**
     * @returns {number}
     */
    get experienceLevel(){
        let level = 0;
        for (let i = 16384; i >= 1; i /= 2){
            let arr = VanillaWorld.getPlayers({ minLevel: i});
            if (Array.from(arr).includes(this.vanillaEntity)){
                level += i;
            }
        }
        return level;
    }
    
   setExperienceLevel(level){
       if (isFinite(level) && level >= 0 && Number.isInteger(level)){
           return Promise.all([
               Command.addExecute(Command.PRIORITY_HIGH, this, "xp -24791l @s"),
               Command.addExecute(Command.PRIORITY_HIGH, this, `xp ${level}l @s`)
           ]);
       } else {
           throw new TypeError("level not allowed");
       }
    }
    
    /**
     * 踢出玩家
     * @param {string} [msg] - 踢出玩家时显示的消息
     */
    async kick(msg){
        let rt = await Command.addParams(Command.PRIORITY_HIGHEST, "kick", this.name, msg);
        if (rt.statusCode !== StatusCode.success){
            throw new Error(rt.statusMessage);
        }
    }
    
    sendMessage(message){
        let rawtext = { rawtext: [{ text: String(message) }] };
        return this.sendRawMessage(rawtext);
    }
    
    sendRawMessage(rawtext){
        let command = "tellraw @s " + JSON.stringify(rawtext, dealWithCmd);
        return Command.addExecute(Command.PRIORITY_HIGH, this, command);
    }
}
/* 修补 */
//定义不存在的属性
defineEntityPrototypeFor(Player.prototype, Minecraft.Player.prototype);

/*修复结束*/
