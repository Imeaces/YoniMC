import { Data } from "scripts/lib/Data.js";
import { ChatCommand } from "scripts/lib/ChatCommand.js";
import * as yoni from "scripts/lib/yoni-lib.js";
import { events, world, dim, runCmd, log, say } from "../lib/yoni-lib.js";
import { Callback } from "scripts/lib/Callback-lib.js";
import * as mc from "mojang-minecraft";

Callback.addCallback("itemUse", (event) => {
  if (!Data.get("playersUseItem")){
    Data.put("playersUseItem",[]);
  }
  let playersUseItem = Data.get("playersUseItem");
  playersUseItem.push(event.source);
  Data.put("playersUseItem",playersUseItem);
});

Callback.addCallback("itemUseOn",(event) => {
  if (!Data.get("playersUseItemOn")){
    Data.put("playersUseItemOn",[]);
  }
  let playersUseItemOn = Data.get("playersUseItemOn");
  playersUseItemOn.push(event.source);
  Data.put("playersUseItemOn",playersUseItemOn);
});

Callback.addCallback("tick", () => {
//检测玩家使用物品
  runCmd("tag @a remove event:itemUse");
  runCmd("tag @a remove event:itemUseOn");
  //为使用了物品的玩家添加标签
  try {  
    for (let pl of Data.get("playersUseItem")){
      runCmd("tag @s add event:itemUse",pl);
    }
    Data.put("playersUseItem",[]);
      
    for (let pl of Data.get("playersUseItemOn")){
      runCmd("tag @s add event:itemUseOn",pl);
    }
    Data.put("playersUseItemOn",[]);
  } catch {}
});

Callback.addCallback("tick", () => {
  //在记分板上实体血量
  try {
    for (let e of yoni.getLoadedEntities()){
      if (e.hasTag("test:health")){
        yoni.scbObjAdd("HEALTH");
        let health = Math.floor(e.getComponent("minecraft:health").current);
        runCmd("scoreboard players set @s HEALTH "+health, e);
      }
    }
  } catch(err){
    log(err)
  }
});
/*
Callback.addCallback("itemStartUseOn", (event) => {
   say("itemStartUseOn", event.source)
});

Callback.addCallback("itemStopUseOn", (event) => {
   say("itemStopUseOn", event.source)
});

*/