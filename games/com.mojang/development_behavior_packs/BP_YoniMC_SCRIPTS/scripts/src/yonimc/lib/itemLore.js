import { system } from "yoni-mcscripts-lib";
import { VanillaWorld } from "yoni-mcscripts-lib";

let defaultItemLoreMap = new Map()
    .set("yonimc:apple_diamond", `看起来是一个苹果的钻石，可食用\n但是其实它真是一颗钻石`)
    
system.setInterval(function(){
    if (event.currentTick % 10 !== 0) return;
    
    [...VanillaWorld.getPlayers()].forEach((player)=>{
        let inv = player.getComponent("minecraft:inventory");
    });
}, 1);
