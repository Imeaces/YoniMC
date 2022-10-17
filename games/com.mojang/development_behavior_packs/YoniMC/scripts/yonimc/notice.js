import { EventListener } from "scripts/yoni/event.js";
import Scoreboard from "scripts/yoni/scoreboard.js";
import { say } from "scripts/yoni/util/utils.js";
import { Logger } from "scripts/yoni/util/Logger.js";
import { isServerMode } from "./server.js";
import Command from "scripts/yoni/command.js";

const logger = new Logger("LOG");

EventListener.register("yonimc:playerJoined", (event)=>{
    if (Scoreboard.getObjective("species",true).getScore(event.player) === undefined){
        logger.info("正在设置玩家{}", event.player.name);
        Scoreboard.getObjective("species").setScore(event.player, 42);
    }
    if (isServerMode()){
        say(`欢迎${event.player.name}游玩本服务器`, "服务器");
    } else {
        say(`欢迎${event.player.name}的加入`, "多人游戏");
    }
});

EventListener.register("entityHurt", (event)=> {
    if (event.damagingEntity?.id === "minecraft:player"){
        Command.execute(event.damagingEntity, "title @s title §r")
        .next("title @s subtitle §c伤害: " + event.damage);
    }
    if (event.hurtEntity.id === "minecraft:player"){
        let ent = event.hurtEntity;
        Command.execute(ent, "title @s title §r")
        .next("title @s subtitle "+event.cause+": "+event.damage);
    }
});

EventListener.register("yonimc:playerDead", (event)=>{
    let pl = event.player;
    let {x, y, z} = pl.location;
    let dim = pl.dimension;
    logger.info(`玩家 ${pl.name} 死在了 ${dim.id} 的 ${x.toFixed(1)} ${y.toFixed(1)} ${z.toFixed(1)}`);
    pl.sendMessage(`你死在了 ${dim.id} 的 ${x.toFixed(1)} ${y.toFixed(1)} ${z.toFixed(1)}`);
});
