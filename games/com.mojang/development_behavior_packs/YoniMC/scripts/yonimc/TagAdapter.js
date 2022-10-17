import { Minecraft, VanillaWorld, dim } from "scripts/yoni/basis.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import Command from "scripts/yoni/command.js";
import { Scoreboard } from "scripts/yoni/scoreboard.js";
import { EventListener } from "scripts/yoni/event.js";
import { World } from "scripts/yoni/world.js";
import { YoniScheduler, Schedule } from "scripts/yoni/schedule.js";

YoniScheduler.addSchedule(new Schedule ({
    async: false,
    type: Schedule.tickCycleSchedule,
    delay: 0,
    period: 10,
    callback: () => {
        World.getPlayers().forEach((e)=>{
        if (e.isSneaking === true
        && !e.hasTag("stat:is_sneaking"))
            e.addTag("stat:is_sneaking");
        else if (e.isSneaking === false
        && e.hasTag("stat:is_sneaking"))
            e.removeTag("stat:is_sneaking");
        });
    }
}));

YoniScheduler.addSchedule(new Schedule ({
    async: false,
    type: Schedule.tickCycleSchedule,
    delay: 0,
    period: 20,
    callback: () => {
        let healthO = Scoreboard.getObjective("health");
        let maxHealthO = Scoreboard.getObjective("max_health");
        World.getPlayers().forEach((player) => {
            let component = player.getHealthComponent();
            
            healthO.setScore(player, Math.floor(component.current));
            maxHealthO.setScore(player, Math.floor(component.value));
        });
    }
}));

EventListener.register("itemUse", (event) => {
    let ent = event.source;
    if (ent.hasTag("event:itemUse"))
        ent.removeTag("event:itemUse");
});

EventListener.register("itemUseOn", (event) => {
    let ent = event.source;
    if (ent.hasTag("event:itemUseOn"))
        ent.removeTag("event:itemUseOn");
});

EventListener.register("beforeItemUseOn", (event) => {
    let ent = event.source;
    if (!ent.hasTag("event:itemUseOn"))
        ent.addTag("event:itemUseOn");
});

EventListener.register("beforeItemUse", (event)=> {
    let ent = event.source;
    if (!ent.hasTag("event:itemUse"))
       ent.addTag("event:itemUse");
});