import { EventListener } from "yoni-mcscripts-lib";
import { Utils } from "yoni-mcscripts-lib";
import { logger } from "./../util/logger.js";
import { isServerMode } from "../config.js";
import { EntityBase } from "yoni-mcscripts-lib";
import { YoniScheduler } from "yoni-mcscripts-lib";
import { World } from "yoni-mcscripts-lib";
import { TPSCounter } from "../../util/TPSCounter.js";
const say = Utils.say;
EventListener.register("yoni:playerJoined", (event) => {
    if (isServerMode()) {
        say(`欢迎${event.player.name}游玩本服务器`, "服务器");
    }
    else {
        say(`欢迎${event.player.name}的加入`, "多人游戏");
    }
});
EventListener.register("mcyoni:entityHurt", (event) => {
    let { damagingEntity, hurtEntity, damage, cause } = event;
    damagingEntity = EntityBase.from(damagingEntity);
    hurtEntity = EntityBase.from(hurtEntity);
    if (damagingEntity?.typeId === "minecraft:player") {
        let o = damagingEntity.onScreenDisplay;
        o.setTitle("§r");
        o.updateSubtitle(`§c伤害: ${damage}\n剩余: ${hurtEntity.getCurrentHealth()}`);
    }
    if (hurtEntity.typeId === "minecraft:player") {
        let o = hurtEntity.onScreenDisplay;
        o.setTitle("§r");
        o.updateSubtitle(`${cause}: ${damage}`);
        //hurtEntity.sendMessage(`${cause}: ${damage}`);
    }
});
EventListener.register("playerDead", (event) => {
    let pl = event.player;
    let { x, y, z } = pl.location;
    let dim = pl.dimension;
    logger.info(`玩家 ${pl.name} 死在了 ${dim.id} 的 ${x.toFixed(1)} ${y.toFixed(1)} ${z.toFixed(1)}`);
    pl.sendMessage(`你死在了 ${dim.id} 的 ${x.toFixed(1)} ${y.toFixed(1)} ${z.toFixed(1)}`);
});
TPSCounter.maxRecordTicks += 18000;
YoniScheduler.runCycleTickTask(function () {
    const tps1s = TPSCounter.getTPS();
    const tps1m = TPSCounter.getTPS(60);
    const tps5m = TPSCounter.getTPS(5 * 60);
    const tps15m = TPSCounter.getTPS(15 * 60);
    const text = `TPS from last 1s, 1m, 5m, 15m: ${tps1s}, ${tps1m}, ${tps5m}, ${tps15m}`;
    World.getAllPlayers().forEach(p => p.onScreenDisplay.setActionBar(text));
}, 1, 1, false);
