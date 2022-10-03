import ChatCommand from "scripts/yoni/command/ChatCommand.js";
import { printError } from "scripts/yoni/util/console.js";
import {
    Minecraft,
    dim
    } from "scripts/yoni/basis.js";
import { YoniEntity as Entity } from "scripts/yoni/entity.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { tell, say } from "scripts/yoni/util/yoni-lib.js";
import Command from "scripts/yoni/command.js";
import SimpleScoreboard from "scripts/yoni/scoreboard.js";
import { EventListener, Events } from "scripts/yoni/event.js";

ChatCommand.registerPrefixCommand("", "@all", (runner, command, label, args) => {
    Command.execute(runner, "title @a title @s");
    Command.execute(runner, "title @a subtitle @了所有人");
    
});

EventListener.register("yonimc:playerJoined", (event)=>{
    Command.execute(event.player, "say 各位好啊");
    if (SimpleScoreboard.getObjective("species").getScore(event.player) === undefined){
        say("正在设置玩家");
        SimpleScoreboard.getObjective("species").setScore(event.player, 42);
    }
});

EventListener.register("beforeExplosion", (event) => {
   say("爆炸已取消，影响方块"+event.impactedBlocks.length+"个");   
   event.cancel = true;
});

EventListener.register("entityHurt", (event)=> {
console.error("entityHurt");
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

EventListener.register("yonimc:playerDead", (event)=>{
    let pl = new YoniEntity(event.player);
    let {x, y, z} = pl.location;
    let dim = pl.dimension;
    pl.sendMessage(`你死在了 ${dim.id} 的 ${x.toFixed(1)} ${y.toFixed(1)} ${z.toFixed(1)}`);
});

import "scripts/WatchBird.js";
import "scripts/command.js";
import "scripts/debug.js";
import "scripts/TagAdapter.js";
import "scripts/guxi.js";

import('scripts/test.js')
    .then(()=>{
        console.error("已经导入测试");
    })
    .catch((e)=>{
        printError("未能导入测试", e);
    });

console.warn("scripts main end");
