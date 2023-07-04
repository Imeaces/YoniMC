import { ChatCommand } from "yoni-mcscripts-lib";
import { Scoreboard } from "yoni-mcscripts-lib";
import { isDebug } from "./../config.js";
import { runFuncAsync } from "../lib/runFunc.js"
import { logger } from "../util/logger.js";
import { TPSCounter } from "../../util/TPSCounter.js";

//自杀命令
if (isDebug())
ChatCommand.registerCommand("suicide", (sender) => sender.kill() );

//清理聊天信息
//原理：MC只保存100条聊天记录，并且只会显示100条非空聊天记录
ChatCommand.registerCommand("cls", (sender) => {
    for (let i = 0; i<100; i++){
        sender.sendMessage("");
    }
});

ChatCommand.registerCommand("tps", (sender) => {
    sender.sendMessage(String (TPSCounter.getTPS()));
});