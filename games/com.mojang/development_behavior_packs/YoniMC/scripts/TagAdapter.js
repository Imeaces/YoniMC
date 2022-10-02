import {
    Minecraft,
    dim
    } from "yoni/basis.js";
import { YoniEntity as Entity } from "yoni/entity.js";
import { tell, say } from "yoni/util/yoni-lib.js";
import Command from "yoni/command.js";
import SimpleScoreboard from "yoni/scoreboard/SimpleScoreboard.js";
import { EventListener } from "yoni/event.js";
const { EntityDamageCause } = Minecraft;

EventListener.register("tick", (event) => {
    if (event.currentTick % 10 != 0) return;
    
    Array.from(Minecraft.world.getPlayers()).forEach((e)=>{
        if (e.isSneaking === true){
           if (!e.hasTag("stat:is_sneaking")){
               //Command.execute(e, "say 我正在潜行");
               e.addTag("stat:is_sneaking");
           }
        } else if (e.isSneaking === false){
           if (e.hasTag("stat:is_sneaking")){
               //Command.execute(e, "say 我没有再潜行了");
               e.removeTag("stat:is_sneaking");
           }
        }
    });
    
    if (event.currentTick % 20 != 0) return;

    let healthObj = SimpleScoreboard.getObjective("health", true);
    let maxHealthObj = SimpleScoreboard.getObjective("max_health", true);
    Array.from(Minecraft.world.getPlayers({tags:["test:health"]})).forEach((e) => {
        let comp = e.getComponent("minecraft:health");
        healthObj.setScore(e, Math.floor(comp.current));
        maxHealthObj.setScore(e, Math.floor(comp.value));
    });
    
});

EventListener.register("itemUse", (event) => {
    if (event.source != null && event.source instanceof Minecraft.Player){
        let ent = event.source;
        if (ent.hasTag("event:itemUse")){
           ent.removeTag("event:itemUse");
        }
    }
});

EventListener.register("itemUseOn", (event) => {
    if (event.source != null && event.source instanceof Minecraft.Player){
        let ent = event.source;
        if (ent.hasTag("event:itemUseOn")){
           ent.removeTag("event:itemUseOn");
        }
    }
});

EventListener.register("beforeItemUseOn", (event) => {
    if (event.source != null && event.source instanceof Minecraft.Player){
        let ent = event.source;
        if (!ent.hasTag("event:itemUseOn")){
            ent.addTag("event:itemUseOn");
        }
    }
});

EventListener.register("beforeItemUse", (event)=> {
    if (event.source != null && event.source instanceof Minecraft.Player){
        let ent = event.source;
        if (!ent.hasTag("event:itemUse")){
           ent.addTag("event:itemUse");
        }
    }
});