import { Data } from "../lib/Data.js";
import { ChatCommand } from "../lib/ChatCommand.js";
import * as yoni from "../lib/yoni-lib.js";
import { events, world, dim, runCmd, log, say } from "../lib/yoni-lib.js";
import { Callback } from "../lib/Callback-lib.js";
import * as mc from "mojang-minecraft";

ChatCommand.registerCommand("boom", (runner, params) => {
  if (yoni.entitiesHasAnyFamily(runner, "guxi"){
    let radius = Number(params.args[0]);
    if (isNaN(radius)){
      tell(runner, "范围多大？");
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
  try{
    if (event.projectile.id == "guxi:flow_energy"){
      let { dimension, location, projectile } = event;
      if (event.entityHit)
        dimension.spawnEntity("guxi:energy", location);
      runCmd("tp ~ ~-32768 ~", projectile);
      runCmd("kill", projectile);
    }
  } catch {}
});
