import { Data } from "scripts/lib/Data.js";
import { Callback } from "scripts/lib/Callback-lib.js";
import { ChatCommand } from "scripts/lib/ChatCommand.js";
import { say, world } from "scripts/lib/yoni-lib.js";

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

ChatCommand.registerCommand("back", (runner) => {
  let p = Data.get("deadPoint")
  if (p[runner.name]){
    let pos = p[runner.name];
    runner.runCommand(`tp ${pos[0]} ${pos[1]} ${pos[2]}`);
  }
});
