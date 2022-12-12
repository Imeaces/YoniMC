import ChatCommand from "yoni/util/ChatCommand.js";
import Scoreboard from "yoni/scoreboard.js";
import { isDebug } from "./config.js";
import { runFuncAsync } from "./lib/runFunc.js"

(async function (){
//scripts start

//切换物种命令（使用id作为参数）
if (isDebug())
ChatCommand.registerCommand("species", async (sender, _rawCommand, _label, args) => {
    if (Number.isInteger(Number(args[0]))) {
        try {
            await Scoreboard.getObjective("species", true).setScore(sender, Number(args[0]));
        } catch (e) {
            console.error(e);
        }
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

//scripts end
})().catch(console.error);
