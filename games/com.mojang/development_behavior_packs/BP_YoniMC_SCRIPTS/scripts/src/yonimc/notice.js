import { EventListener } from "../yoni/event.js";
import Scoreboard from "../yoni/scoreboard.js";
import { say } from "../yoni/util/utils.js";
import { logger } from "./logger.js";
import { isServerMode } from "./server.js";
import Command from "../yoni/command.js";
import { EntityBase } from "../yoni/entity.js";
import { YoniScheduler } from "../yoni/schedule.js";
import { system } from "../yoni/system.js";

logger.info("订阅yoni:playerJoined");
EventListener.register("yoni:playerJoined", (event)=>{
logger.info("检查yoni:playerJoined");
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
logger.info("已订阅yoni:playerJoined");

EventListener.register("minecraft:entityHurt", (event)=> {
    let { damagingEntity, hurtEntity, damage, cause } = event;
    damagingEntity = EntityBase.from(damagingEntity);
    hurtEntity = EntityBase.from(hurtEntity);
    
    if (damagingEntity?.typeId === "minecraft:player"){
        let o = damagingEntity.onScreenDisplay;
        o.setTitle("§r");
        o.updateSubtitle(`§c伤害: ${damage}\n剩余: ${hurtEntity.getCurrentHealth()}`);
    }
    if (hurtEntity.typeId === "minecraft:player"){
        let o = hurtEntity.onScreenDisplay;
        o.setTitle("§r");
        o.updateSubtitle(`${cause}: ${damage}`);
    }
});
EventListener.register("yoni:playerDead", (event)=>{
    let pl = event.player;
    let {x, y, z} = pl.location;
    let dim = pl.dimension;
    logger.info(`玩家 ${pl.name} 死在了 ${dim.id} 的 ${x.toFixed(1)} ${y.toFixed(1)} ${z.toFixed(1)}`);
    pl.sendMessage(`你死在了 ${dim.id} 的 ${x.toFixed(1)} ${y.toFixed(1)} ${z.toFixed(1)}`);
});

let lTick = system.currentTick;
YoniScheduler.runCycleTimerTask(()=>{
    let cTick = system.currentTick
    let passTick = cTick - lTick;
    let tps = passTick/2;
    lTick = cTick;
    Command.fetch("title @a actionbar TPS: " + tps);
}, 2000, 2000);
