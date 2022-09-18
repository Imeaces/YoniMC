import ChatCommand from "scripts/yoni/command/ChatCommand.js";
import {
    Minecraft,
    dim
    } from "scripts/yoni/basis.js";
import { YoniEntity as Entity } from "scripts/yoni/entity.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { tell, say } from "scripts/yoni/util/yoni-lib.js";
import Command from "scripts/yoni/command.js";
import SimpleScoreboard from "scripts/yoni/scoreboard/SimpleScoreboard.js";
import { EventListener } from "scripts/yoni/event.js";
/*
let cent = new YoniEntity(Array.from(Minecraft.world.getPlayers())[0]);
ChatCommand.registerCommand("test", (sender, raw, label, args)=>{
    sender = new YoniEntity(sender);
    say(cent === sender);
});
*/
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
        let ent = event.hurtEntity;
        let maxHealth = Entity.getMaxHealth(ent);
        let currentHealth = Entity.getCurrentHealth(ent);
        let lostHealth = maxHealth - currentHealth;
        Command.execute(ent, "title @s title 损失血量"+lostHealth);
        Command.execute(ent, "title @s subtitle "+event.cause+": "+event.damage);
    }
});

import "scripts/WatchBird.js";
import "scripts/command.js";
import "scripts/debug.js";
import "scripts/TagAdapter.js";
import "scripts/guxi.js";

console.warn("scripts main end");
