import * as Minecraft from "mojang-minecraft";
import { dim } from "scripts/lib/yoni/basis.js";
import { Entity } from "scripts/lib/yoni/entity.js";
import Callback from "scripts/lib/yoni/Callback.js";
import LightSource from "scripts/LightSource.js";

let originBlocks = [];
let lightingEntities = [];
Callback.addCallback("tick", ()=>{
  let ents = Entity.getLoadedEntities();
  ents.forEach((e)=>{
    if (e.id == "minecraft:item"){
      
    } else {
    }
  });
}