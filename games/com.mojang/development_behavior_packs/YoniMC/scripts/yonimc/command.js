import ChatCommand from "yoni/command/ChatCommand.js";
import Scoreboard from "yoni/scoreboard.js";
import { EventListener } from "yoni/event.js";
import { isDebug } from "./config.js";

if (isDebug()){
//切换物种命令（使用id作为参数）
ChatCommand.registerCommand("species", (sender, rawCommand, label, args) => {
    if (Number.isInteger(Number(args[0])))
        Scoreboard.getObjective("species", true).setScore(sender, Number(args[0]));
    else
        sender.sendMessage("不是整数");
});

//自杀命令
ChatCommand.registerCommand("suicide", (sender) => sender.kill() );

}

//清理聊天信息
//原理：MC只保存100条非空聊天记录，并且只会显示100条聊天记录
ChatCommand.registerCommand("cls", (sender) => {
    for (let i = 0; i<100; i++){
        sender.sendMessage("");
    }
});
