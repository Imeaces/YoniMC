import { Data } from "../lib/Data.js";
import { ChatCommand } from "../lib/ChatCommand.js";
import * as yoni from "../lib/yoni-lib.js";
import { events, world, dim, runCmd, log, say } from "../lib/yoni-lib.js";
import { Callback } from "../lib/Callback-lib.js";
import * as mc from "mojang-minecraft";

Callback.addCallback("itemUse", (event) => {
  if (!Data.get("playersUseItem")){
    Data.put("playersUseItem",[]);
  }
//  log("event.itemUse",event.source);
  let arr = Data.get("playersUseItem");
  arr.push(event.source);
  Data.put("playersUseItem",arr);
});

Callback.addCallback("itemUseOn",(event) => {
  if (!Data.get("playersUseItemOn")){
    Data.put("playersUseItemOn",[]);
  }
//  log("event.itemUseOn",event.source);
  let arr = Data.get("playersUseItemOn");
  arr.push(event.source);
  Data.put("playersUseItemOn",arr);
});
Callback.addCallback("tick", () => {
//检测玩家使用物品
  try {
    //为使用了物品的玩家添加标签
    for (let pl of world.getPlayers()){
      if (pl.hasTag("event:itemUse")){
        runCmd("tag @s remove event:itemUse",pl);
      }
      if (pl.hasTag("event:itemUseOn")){
        runCmd("tag @s remove event:itemUseOn",pl);
      }
    }
    
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
        runCmd(`scoreboard players set @s HEALTH ${health}`,e);
      }
    }
  } catch(err){
    log(err)
  }
});
