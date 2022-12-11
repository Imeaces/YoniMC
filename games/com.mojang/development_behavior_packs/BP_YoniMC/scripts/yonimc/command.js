import ChatCommand from "yoni/util/ChatCommand.js";
import Scoreboard from "yoni/scoreboard.js";
import { EventListener } from "yoni/event.js";
import { isDebug } from "./config.js";
(async function (){
//scripts start

//切换物种命令（使用id作为参数）
if (isDebug())
ChatCommand.registerCommand("species", (...args)=>{runFuncAsync(async (sender, rawCommand, label, args) => {
    if (Number.isInteger(Number(args[0])))
        await Scoreboard.getObjective("species", true).setScore(sender, Number(args[0]));
    else
        sender.sendMessage("不是整数");
}, ...args);});

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
