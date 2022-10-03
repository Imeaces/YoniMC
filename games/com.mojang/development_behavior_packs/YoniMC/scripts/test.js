import ChatCommand from "scripts/yoni/command/ChatCommand.js";
import {
    Minecraft,
    dim,
    VanillaWorld,
    VanillaEvents,
    VanillaScoreboard,
    Gametest
    } from "scripts/yoni/basis.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { tell, say } from "scripts/yoni/util/yoni-lib.js";
import Command from "scripts/yoni/command.js";
import SimpleScoreboard from "scripts/yoni/scoreboard/SimpleScoreboard.js";
import { EventListener } from "scripts/yoni/event.js";
const { EntityDamageCause } = Minecraft;
import { getErrorMsg } from "scripts/yoni/util/console.js";

ChatCommand.registerCommand("test", (sender, rawCommand, label, args)=>{
    
    let e = sender.vanillaEntity;
    
    let func = e.runCommand;
    
    try {
        func("say 成功，这意味着runCommand可能是一个回调函数");
    } catch(err) {
        sender.sendMessage(getErrorMsg(err).errMsg);
    }
    
    YoniEntity.getAliveEntity()[0]
});
