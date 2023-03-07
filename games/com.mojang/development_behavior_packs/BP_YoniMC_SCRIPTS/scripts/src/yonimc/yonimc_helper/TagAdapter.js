import { Minecraft, VanillaWorld, dim } from "../yoni/basis.js";
import { EntityBase } from "../yoni/entity.js";
import Command from "../yoni/command.js";
import { Scoreboard } from "../yoni/scoreboard.js";
import { EventListener } from "../yoni/event.js";
import { World } from "../yoni/world.js";
import { YoniScheduler, Schedule } from "../yoni/schedule.js";

YoniScheduler.runCycleTickTask(() => {
    World.getAllPlayers().forEach((e)=>{
        if (e.isSneaking === true
        && !e.hasTag("stat:is_sneaking"))
            e.addTag("stat:is_sneaking");
        else if (e.isSneaking === false
        && e.hasTag("stat:is_sneaking"))
            e.removeTag("stat:is_sneaking");
    });
}, 4, 1, false);

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
