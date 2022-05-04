import { Data } from "./Data.js";
import { ChatCommand as chatCommand } from "./ChatCommand.js";
import * as yoni from "./yoni-lib.js";
import { events, world, dim, runCmd, log, say } from "./yoni-lib.js";
import * as mc from "mojang-minecraft";
import { Callback } from "./Callback-lib.js";

chatCommand.registerCommand("suicide", (runner) => {
  runner.kill();
});

chatCommand.registerCommand("test", (runner, ...args) => {
  say(runner.getComponents());
});

chatCommand.registerCommand("back", (runner, ...args) => {
});

chatCommand.registerCommand("clearScreen", (runner, ...args) => {
  for (let i = 0; i<100; i++){
    runCmd("tellraw @a {\"rawtext\":[{\"text\":\"\"}]}");
  }
});
/*
chatCommand.registerCommand("rmscb", (runner, ...args) => {
    for (let obj of world.scoreboard.getObjectives()){
        say("removed"+obj.id);
        runCmd("scoreboard objectives remove " + obj.id);
    }
});
chatCommand.unregisterCommand("rmscb");
*/
chatCommand.registerCommand("run", (runner, params) => {
  try {
    say(runner.runCommand(params.arg));
  }
  catch (err){
    say(err);
  }
});
/*
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
*/
Callback.addCallback("entityHurt", (event) => {
  try {
    if (event.damage == 0){
      return
    }
    if (event.hurtEntity.id == "minecraft:player"){
      runCmd(`tellraw @s {"rawtext":[{"text":"受到${event.damage}点伤害"}]}`,event.hurtEntity);
    }
    if (event.damagingEntity.id == "minecraft:player"){
      runCmd(`titleraw @s actionbar {"rawtext":[{"text":"§c造成${event.damage}点伤害"}]}`,event.damagingEntity);
    }
  } catch {}
});


Callback.addCallback("entityHit", (event) => {
  try{
    if (!event.hitEntity)
      return
    let { entity, hitEntity } = event;
    if (entity.id == "minecraft:player"){
      if (hitEntity.getComponent("minecraft:health").current == 0){
        let name = yoni.getEntityLocaleName(hitEntity);
        runCmd(`titleraw @s actionbar {"rawtext":[{"text":"§c杀死了§e"},{"translate":"${name}"}]}`,event.entity);
      }
    }
  } catch {}
});
chatCommand.unregisterCommand("test");
chatCommand.registerCommand("test", () => {
  if (Data.get("testFuncID")){
    say("remove test");
    Callback.removeCallback(Data.get("testFuncID"));
    Data.put("testFuncID", null)
  } else {
    say("add test");
    Data.put(
      "testFuncID",
      Callback.addCallback("entityHit", (event) => {
        try {
          let hitEntity = yoni.getEntityLocaleName(event.hitEntity);
          let entity = yoni.getEntityLocaleName(event.entity);
          let rawtext = {
            rawtext: [
              {text:"§e触碰事件被触发§r\n"},
              {text:"§e触碰者:§r"},{translate:entity},{text:"\n"},
              {text:"§e被触碰者:§r"},{translate:hitEntity}
            ]
          }
          runCmd("tellraw @a " + JSON.stringify(rawtext));
        } catch (err){
          say(err)
        }
      })
    );
  }
});

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
//检测玩家死亡
  //获取被标记死亡的玩家
  if (!Data.get("playersDead"))
    Data.put("playersDead",[])
  //遍历当前玩家，检测是否死亡
  for (let pl of world.getPlayers()){
    
    let dead = false;
    let hasDead = true;
    let deadPlayers = Data.get("playersDead");
    
    if (pl.getComponent("minecraft:health").current == 0)
     dead = true;
    if (deadPlayers.indexOf(pl.name) == -1)
      hasDead = false;
    
    if (dead == true && hasDead == false){ //如果死了却未标记
      deadPlayers.push(pl.name);
      Data.put("playersDead",deadPlayers);
    } else if (dead == false && hasDead == true){ //标记为死了却活着
      deadPlayers.splice(deadPlayers.indexOf(pl.name),1)
      Data.put("playersDead",deadPlayers);
    } else {
      continue;
    }
  }
});

Callback.addCallback("tick", () => {
//检测实体

  for (let e of yoni.getLoadedEntities()){
    try {
      if (e.getComponent("minecraft:health").current == 0)
        say(yoni.getEntityLocaleName(e) + "死了")
    } catch {
      continue
    }
  }
});

Callback.addCallback("tick", () => {
  //检测实体血量
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
/*
getGuxis(){
  let guxis = [];
  for (let e of yoni.getEntities()){
    for (let ef of e.getCompoment("minecraft:type_family");
    if (
  }
}*/