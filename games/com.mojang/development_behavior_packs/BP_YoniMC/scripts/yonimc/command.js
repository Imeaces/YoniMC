import ChatCommand from "../yoni/util/ChatCommand.js";
import Scoreboard from "../yoni/scoreboard.js";
import { isDebug } from "./config.js";
import { runFuncAsync } from "./lib/runFunc.js"
import { logger } from "./logger.js";

//切换物种命令（使用id作为参数）
if (isDebug())
ChatCommand.registerCommand("species", async (sender, _rawCommand, _label, args) => {
    let id = Number(args[0]);
    if (Number.isInteger(id)) {
        Scoreboard.getObjective("species", true).postSetScore(sender, id).catch(logger.error);
    } else {
        sender.sendMessage("不是整数");
    }
});

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

