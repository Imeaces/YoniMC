import { Data } from "scripts/lib/Data.js";
import { ChatCommand } from "scripts/command/ChatCommand.js";
import * as yoni from "scripts/lib/yoni-lib.js";
import { tell, events, world, dim, runCmd, log, say } from "scripts/util/yoni-lib.js";
import { Callback } from "scripts/lib/Callback-lib.js";
import * as mc from "mojang-minecraft";

ChatCommand.registerCommand("boom", (runner, command, label, args) => {
  if (YoniEntity.hasAnyFamily(runner, "guxi")){
    let radius = 0;
    if (!args[0]){
      tell(runner, "范围多大？");
      return;
    }
    radius = Number(args[0]);
    if (isNaN(radius)){
      tell(runner, "范围得是数字");
      return;
    }
    let location = runner.location;

    let opts = new Minecraft.ExplosionOptions();
    opts.breaksBlocks = true;
    opts.source = runner;

    say("boom!", runner);
    runner.dimension.createExplosion(location, radius, opts);
  } else {
    tell(runner, "您无法使用此命令");
  }
  return;
});

//咕西获取能量的方式：杀死实体
Callback.addCallback("entityHurt", (event) => {
  if (!yoni.entitiesHasAnyFamily(event.damagingEntity, "guxi"))
    return
  if (event.hurtEntity.getComponent("minecraft:health").current == 0){
    let damageEnergyEntity = event.hurtEntity.dimension.spawnEntity("guxi:energy", event.hurtEntity.location);
    let damageEnergy = event.hurtEntity.getComponent("minecraft:health").value ^ 5 * 32;
    let damageEnergies = Math.floor(damageEnergy / 10000000);
    damageEnergy = damageEnergy % 10000000;
    runCmd("scoreboard players set @s guxi:energies "+damageEnergies, damageEnergyEntity);
    runCmd("scoreboard players set @s guxi:energy "+damageEnergy, damageEnergyEntity);
  }
  return
});

//检测伤害
Callback.addCallback("entityHurt", (event) => {
  if (!yoni.entitiesHasAnyFamily(event.hurtEntity, "guxi"))
    return
  runCmd("scoreboard objectives add guxi:damage dummy");
  runCmd("scoreboard objectives add guxi:damageCause dummy");
  runCmd("scoreboard players set @s guxi:damage "+event.damage, event.hurtEntity);
  return
});

Callback.addCallback("entityHurt", (event) => {
  try {
    let rawtext = [{
      translate: "实体%%s 受到了 %%s 的 %%s 点伤害",
      with: {
        rawtext: [
          { translate: yoni.getEntityLocaleName(event.hurtEntity) },
          { text: event.cause },
          { text: ""+event.damage }
        ]
      }
    }]
    runCmd("tellraw @a "+JSON.stringify({rawtext}));
  } catch(err){
    say(err)
  }
  return
});