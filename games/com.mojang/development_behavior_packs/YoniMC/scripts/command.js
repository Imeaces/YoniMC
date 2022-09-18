import ChatCommand from "scripts/yoni/command/ChatCommand.js";
import {
    Minecraft,
    dim
    } from "scripts/yoni/basis.js";
import { YoniEntity as Entity } from "scripts/yoni/entity.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { tell, say } from "scripts/yoni/util/yoni-lib.js";
import Command from "scripts/yoni/command.js";
import SimpleScoreboard from "scripts/yoni/scoreboard/SimpleScoreboard.js";
import { EventListener } from "scripts/yoni/event.js";
import { EntityDamageCause } from "mojang-minecraft";

//切换物种命令（使用id作为参数）
ChatCommand.registerCommand("species", (sender, rawCommand, label, args) => {
        let obj = SimpleScoreboard.getObjective("species", true);
        obj.setScore(sender, Number(args[0]));
    }
);
//自杀命令
ChatCommand.registerCommand("suicide", (sender) => sender.kill() );
//清理聊天信息
ChatCommand.registerCommand("cls", (sender) => {
    sender = new YoniEntity(sender);
    for (let i = 0; i<100; i++){
        sender.sendMessage("");
    }
});
