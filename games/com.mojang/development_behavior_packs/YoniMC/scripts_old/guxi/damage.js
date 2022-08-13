import Scoreboard from "scripts/lib/yoni/scoreboard.js";
import Callback from "scripts/lib/Callback-lib.js";
import { runCmd } from "scripts/lib/yoni/basis.js";
import { isGuxi } from "scripts/guxi/basis.js";

Callback.add("hurtEntity", (event)=>{
  let entity = event.hurtEntity;
  if (!isGuxi(entity))
    return;

  let damage = event.damage;
  if (damage < 1)
    return 

  let cause = event.cause;
  let health = event.getComponent("minecraft:health");
  
  Scoreboard.setScore("guxi:damage", entity, damage);
  runCmd("function yoni/guxi/event_damage", entity);
});
