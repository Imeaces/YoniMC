import { Data } from "scripts/lib/Data.js";
import { ChatCommand } from "scripts/lib/ChatCommand.js";
import * as yoni from "scripts/lib/yoni-lib.js";
import { tell, events, world, dim, runCmd, log, say } from "scripts/lib/yoni-lib.js";
import { Callback } from "scripts/lib/Callback-lib.js";
import * as mc from "mojang-minecraft";

ChatCommand.registerCommand("boom", (runner, params) => {
  if (yoni.entitiesHasAnyFamily(runner, "guxi")){
    let radius = 0;
    if (!params.args[0]){
      tell(runner, "范围多大？");
      return;
    }
    radius = Number(params.args[0]);
    if (isNaN(radius)){
      tell(runner, "范围得是数字");
      return;
    }
    let location = runner.location;

    let opts = new mc.ExplosionOptions();
    opts.breaksBlocks = true;
    opts.source = runner;

    say("boom!", runner);
    runner.dimension.createExplosion(location, radius, opts);
  } else {
    tell(runner, "您无法使用此命令");
  }
  return;
});

Callback.addCallback("projectileHit", (event) => {
  try {
    if (event.projectile.id == "guxi:flow_energy"){
      let { dimension, location, projectile } = event;
      if (event.entityHit)
        dimension.spawnEntity("guxi:energy", location);
    }
  } catch {}
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
});
