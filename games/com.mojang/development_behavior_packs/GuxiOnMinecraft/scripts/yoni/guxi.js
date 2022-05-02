import * as chatCommand from "./chatCommand.js";
import { Data, world, events, dim, getLoadedEntities, say, runCmd, scbObjAdd, scbObjRem, log } from "./lib.js";
import * as mc from "mojang-minecraft";

events.entityHurt.subscribe(event => {
  if (event.damage == 0){
    return
  }
  if (event.hurtEntity.id == "minecraft:player"){
    runCmd(`tellraw @s {"rawtext":[{"text":"受到${event.damage}点伤害"}]}`,event.hurtEntity);
  }
});

Data.put("playersUseItem",[]);
events.itemUse.subscribe(event => {
  log("event.itemUse",event.source);
  Data.put("playersUseItem",Data.get("playersUseItem").push(event.source));
});

Data.put("playersUseItemOn",[]);
events.itemUseOn.subscribe(event => {
  log("event.itemUseOn",event.source);
  Data.put("playersUseItemOn",Data.get("playersUseItemOn").push(event.source));
});

events.tick.subscribe(eventToDoSomething => {
  //如果实体tag=test:health，为它设置血量
  for (let e of getLoadedEntities()){
    if (e.hasTag("test:health")){
      scbObjAdd("HEALTH");
      let health = Math.floor(e.getComponent("minecraft:health").current);
      runCmd(`scoreboard players set @s HEALTH ${health}`,e);
    }
  }
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
