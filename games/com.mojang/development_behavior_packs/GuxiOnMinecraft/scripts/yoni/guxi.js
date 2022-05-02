import { Data } from "./Data.js";
import { ChatCommand as chatCommand } from "./ChatCommand.js";
import * as yoni from "./yoni-lib.js";
import { events, world, dim, runCmd, log, say } from "./yoni-lib.js";
import * as mc from "mojang-minecraft";

chatCommand.registerCommand("suicide", (runner) => {
  runner.kill();
});

chatCommand.registerCommand("test", (runner, ...args) => {
  for (let obj in world){
    say(mc[obj]);
  }
});

chatCommand.registerCommand("run", (runner, params) => {
  try {
    runner.runCommand(params.arg);
  }
  catch (err){
    say(err);
  }
});

chatCommand.registerCommand("getEntitiesFromViewVector", (runner) => {
  say("执行getEntitiesFromViewVector");
  try {
    say("正在获取");
    let ents = runner.getEntitiesFromViewVector();
    for (let e of ents){
      say("正在转化");
      let text = JSON.stringify(e);
      say(`输出：${text}`);
      say(`输出：${e.id}`);
    }
  } catch(err) {
    say(`[err]${JSON.stringify(err)}`);
    say("执行getEntitiesFromViewVector失败");
  }
  say("执行结束");
});

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
  for (let e of yoni.getLoadedEntities()){
    if (e.hasTag("test:health")){
      yoni.scbObjAdd("HEALTH");
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
