import { Minecraft, VanillaWorld, dim,
    EntityBase, Command, Scoreboard,
    EventListener, World,
    YoniScheduler, Schedule } from "../../yoni/index.js";

YoniScheduler.runCycleTickTask(() => {
    World.getAllPlayers().forEach((e)=>{
        if (e.isSneaking === true
        && !e.hasTag("stat:is_sneaking"))
            e.addTag("stat:is_sneaking");
        else if (e.isSneaking === false
        && e.hasTag("stat:is_sneaking"))
            e.removeTag("stat:is_sneaking");
    });
}, 4, 10, false);

EventListener.register("minecraft:itemUse", (event) => {
    let ent = event.source;
    if (ent.hasTag("event:itemUse"))
        ent.removeTag("event:itemUse");
});

EventListener.register("minecraft:itemUseOn", (event) => {
    let ent = event.source;
    if (ent.hasTag("event:itemUseOn"))
        ent.removeTag("event:itemUseOn");
});

EventListener.register("minecraft:beforeItemUseOn", (event) => {
    let ent = event.source;
    if (!ent.hasTag("event:itemUseOn"))
        ent.addTag("event:itemUseOn");
});

EventListener.register("minecraft:beforeItemUse", (event)=> {
    let ent = event.source;
    if (!ent.hasTag("event:itemUse"))
       ent.addTag("event:itemUse");
});
