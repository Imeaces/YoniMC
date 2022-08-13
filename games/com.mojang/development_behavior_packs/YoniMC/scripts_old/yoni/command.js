import { Data } from "../lib/Data.js";
import { ChatCommand } from "../lib/ChatCommand.js";
import * as yoni from "../lib/yoni-lib.js";
import { events, world, dim, runCmd, log, say } from "../lib/yoni-lib.js";
import { Callback } from "../lib/Callback-lib.js";
import * as mc from "mojang-minecraft";

ChatCommand.registerCommand("suicide", (runner) => {
  runner.kill();
});


ChatCommand.registerCommand("clearScreen", (runner, ...args) => {
  for (let i = 0; i<100; i++){
    runCmd("tellraw @s {\"rawtext\":[{\"text\":\"\"}]}",runner);
  }
});

ChatCommand.registerCommand("rmscb", (runner, ...args) => {
  if (!runner.hasTag("yoni:debug")){
    return
  }
  for (let obj of world.scoreboard.getObjectives()){
    say("removed"+obj.id);
    runCmd("scoreboard objectives remove " + obj.id);
  }
});

ChatCommand.registerCommand("run", (runner, params) => {
  if (!runner.hasTag("yoni:debug")){
    return
  }
  tell(runner, runCmd(params.arg));
});
