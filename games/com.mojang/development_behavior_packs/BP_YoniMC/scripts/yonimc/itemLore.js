import { EventListener } from "yoni/event.js";
import { VanillaWorld } from "yoni/basis.js";

let defaultItemLoreMap = new Map()
    .set("yonimc:apple_diamond", `看起来是一个苹果的钻石，可食用\n但是其实它真是一颗钻石`)
    
EventListener.register("tick", (event)=>{
    if (event.currentTick % 10 !== 0) return;
    
    [...VanillaWorld.getPlayers()].forEach((player)=>{
        let inv = player.getComponent("minecraft:inventory");
    });
});
