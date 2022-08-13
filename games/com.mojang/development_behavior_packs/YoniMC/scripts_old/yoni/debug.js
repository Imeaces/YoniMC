import { Data } from "../lib/Data.js";
import { ChatCommand } from "../lib/ChatCommand.js";
import * as yoni from "../lib/yoni-lib.js";
import { events, world, dim, runCmd, log, say } from "../lib/yoni-lib.js";
import { Callback } from "../lib/Callback-lib.js";
import * as mc from "mojang-minecraft";

ChatCommand.registerCommand("test1", (runner) => {
  if (!runner.hasTag("yoni:debug")){
    return
  }
  Callback.addCallback("tick", () => { //检测实体是否消失
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
  ChatCommand.registerCommand("getThis", () => {
    for (let c in this){
      say(c)
    }
  });
});


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

/*
ChatCommand.registerCommand("getEntitiesFromViewVector", (runner) => {
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

ChatCommand.registerCommand("test2", () => {
  if (!runner.hasTag("yoni:debug")){
    return
  }
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
