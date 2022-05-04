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
Callback.addCallback("tick", () => {
//检测实体是否消失
  let loadedEntities = yoni.getLoadedEntities();
  let disappearedEntities = [];
  let lastTickLoadedEntities = Data.get("loadedEntities");
  Data.put("loadedEntities", loadedEntities);
  for (let lte of lastTickLoadedEntities){
    let isDisappear = true;
    for (let te of loadedEntities){
      if (te === lte){
        isDisappear = false;
        break;
      }
    }
    if (isDisappear){
      runCmd("tellraw @a " + JSON.stringify({rawtext:[{translate:yoni.getEntityLocaleName(lte)},{text:"消失了"}]}));
      runCmd("tellraw @a " + JSON.stringify({rawtext:[{text:"位置："+Math.floor(lte.location.x)+", "+Math.floor(lte.location.y)+", "+Math.floor(lte.location.z)}]}));
    }
  }
});

  say(runner.getComponents());
chatCommand.registerCommand("getThis", () => {
  for (let c in this){
    say(c)
  }
});
});

chatCommand.registerCommand("back", (runner, ...args) => {
  let p = Data.get("deadPoint")
  if (p[runner.name]){
    let pos = p[runner.name];
    runner.runCommand(`tp ${pos[0]} ${pos[1]} ${pos[2]}`);
  }
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
  say(runCmd(params.arg));
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
/*
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

*/
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

chatCommand.registerCommand("test2", () => {
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
      if (!Data.get("deadPoint")){
        Data.put("deadPoint",{})
      }
      let a = Data.get("deadPoint");
      a[pl.name] = [Math.floor(pl.location.x),Math.floor(pl.location.y),Math.floor(pl.location.z)];
      Data.put("deadPoint",a);
      say("使用!back返回死亡点:"+a[pl.name]);

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

Callback.addCallback("projectileHit", (event) => {
  try {
  if (event.blockHit)
    runCmd(
      "tellraw @a " + JSON.stringify({
        rawtext: [
          {text: "["},
          {translate:yoni.getEntityLocaleName(event.projectile)},
          {text: "] 打中了方块"},
          {text:event.blockHit.block.id},
          {text:"("+event.blockHit.block.type.id+")"},
          {text:"，位置："+Math.floor(event.location.x)+", "+Math.floor(event.location.y)+", "+Math.floor(event.location.z)}
        ]
      })
    );
  } catch {}
  try{
  if (event.entityHit)
    runCmd(
      "tellraw @a " + JSON.stringify({
        rawtext: [
          {text: "["},
          {translate:yoni.getEntityLocaleName(event.projectile)},
          {text: "] 打中了"},
          {translate:yoni.getEntityLocaleName(event.entityHit.entity)},
          {text:"，位置："+Math.floor(event.location.x)+", "+Math.floor(event.location.y)+", "+Math.floor(event.location.z)}
        ]
      })
    );
  } catch {}
});