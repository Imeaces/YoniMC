import ChatCommand from "yoni/command/ChatCommand.js";
import {
    Minecraft,
    dim
    } from "yoni/basis.js";
import { YoniEntity as Entity } from "yoni/entity.js";
import { YoniEntity } from "yoni/entity.js";
import { tell, say } from "yoni/util/yoni-lib.js";
import Command from "yoni/command.js";
import SimpleScoreboard from "yoni/scoreboard/SimpleScoreboard.js";
import { EventListener } from "yoni/event.js";
const { EntityDamageCause } = Minecraft;

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
