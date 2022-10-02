import ChatCommand from "yoni/command/ChatCommand.js";
import { printError } from "yoni/util/console.js";
import {
    Minecraft,
    dim
    } from "yoni/basis.js";
import { YoniEntity as Entity } from "yoni/entity.js";
import { YoniEntity } from "yoni/entity.js";
import { tell, say } from "yoni/util/yoni-lib.js";
import Command from "yoni/command.js";
import SimpleScoreboard from "yoni/scoreboard.js";
import { EventListener } from "yoni/event.js";

ChatCommand.registerPrefixCommand("", "@all", (runner, command, label, args) => {
    Command.execute(runner, "title @a title @s");
    Command.execute(runner, "title @a subtitle @了所有人");
    
});

EventListener.register("beforeExplosion", (event) => {
   say("爆炸已取消，影响方块"+event.impactedBlocks.length+"个");   
   event.cancel = true;
});

EventListener.register("entityHurt", (event)=> {
    if (event.damagingEntity === "minecraft:player"){
        Command.execute(event.damagingEntity,"title @s actionbar §c伤害: " + event.damage);
    } else if (event.hurtEntity.id == "minecraft:player"){
        console.error("y");
        let ent = event.hurtEntity;
        let maxHealth = Entity.getMaxHealth(ent);
        let currentHealth = Entity.getCurrentHealth(ent);
        let lostHealth = maxHealth - currentHealth;
        Command.execute(ent, "title @s title 损失血量"+lostHealth);
        Command.execute(ent, "title @s subtitle "+event.cause+": "+event.damage);
    }
});

EventListener.register("entityHurt", (event)=>{
    if (YoniEntity.getAliveEntities().includes(event.hurtEntity))
        return;
    let {x, y, z} = event.hurtEntity.location;
    Command.execute(event.hurtEntity, `say 啊我死了\n位置: ${x} ${y} ${z}`);
});

import "WatchBird.js";
import "command.js";
import "debug.js";
import "TagAdapter.js";
import "guxi.js";

import('test.js')
    .then(()=>{
        console.error("已经导入测试");
    })
    .catch((e)=>{
        printError("未能导入测试", e);
    });

console.warn("scripts main end");
