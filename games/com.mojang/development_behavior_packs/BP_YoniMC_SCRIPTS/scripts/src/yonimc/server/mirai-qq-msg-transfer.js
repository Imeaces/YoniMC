import { LegacyEventListener } from "yoni-mcscripts-lib";
import { VanillaWorld } from "yoni-mcscripts-lib";
import { Logger } from "yoni-mcscripts-lib";
import { ChatCommand } from "yoni-mcscripts-lib";
import { MiraiSession } from "./mirai-session.js";
import { YoniScheduler } from "yoni-mcscripts-lib";

import { API_URL, API_KEY, QQNumber, GroupNumbers, AdminList } from "./mirai-config.js";

const logger = new Logger("Server");

const session = new MiraiSession(API_URL, API_KEY, QQNumber);

async function broadcastMessage(message){
    GroupNumbers.forEach(id=>session.sendGroupMessage(id, message)).catch(logger.error);
}

ChatCommand.registerCommand("qq", (sender, rawCommand, label)=>{
    let message = rawCommand.slice(label.length+1);
    broadcastMessage(`<${sender.name}> ${message}`);
});

LegacyEventListener.register("minecraft:afterEvents.playerLeave", (event)=>{
    broadcastMessage(`玩家 ${event.playerName} 离开了游戏`);
});

LegacyEventListener.register("yoni:playerJoined", (event)=>{
    broadcastMessage(`玩家 ${event.player.name} 加入了游戏`);
});

LegacyEventListener.register("afterEvents.chat", (event)=>{
    let { message, sender } = event;
    broadcastMessage(`<${sender.name}> ${message}`);
});

class ServerReceiveQQMsg {
    static maxFetchDelay = 20000;
    static maxLineCount = 4;
    static maxCharLength = 72;
    #lastFetchTime = 0;
    #fetchDelay = 1000;
    #GroupNumbers = null;
    constructor(gps){
        this.#GroupNumbers = Array.from(gps);
        YoniScheduler.runCycleTimerTask(async () => this.polling(), 1500, 1500, true);
    }
    async polling(){
        if (VanillaWorld.getAllPlayers().length === 0) return;
        
        let currentTime = Date.now();
        
        if (currentTime - this.#lastFetchTime < this.#fetchDelay)
            return;
        else
            this.#lastFetchTime = currentTime;
            
        if (this.#fetchDelay < ServerReceiveQQMsg.maxFetchDelay)
            this.#fetchDelay += 1000;
        
        let msgSeqData;
        try {
            msgSeqData = await session.get("/fetchMessage", { count: 40 });
        } catch(e){
            logger.error("无法获取到消息: {}", e);
            return;
        }
        
        let msgSeq = msgSeqData.data;
        for (let msg of msgSeq){
            if (msg.type !== "GroupMessage")
                continue;
            
            let { sender } = msg;
            let sourceGroupInfo = sender.group;
            
            //不是特定群聊就检测下一条消息
            if (! this.#GroupNumbers.includes(sourceGroupInfo.id))
                continue;
            
            //时间差距过大就放弃此消息
            if (Math.abs(sender.lastSpeakTimestamp - currentTime/1000) > 60)
                continue;
            
            this.#fetchDelay = 1500;
            
            let groupName = sourceGroupInfo.name;
            let senderDisplayName = sender.memberName;
            let msgTypeDesc = [];
            let messageStr = "";
            let msgId = null;
            let { messageChain } = msg;
            for (let item of messageChain){
                switch(item.type){
                    case "Source":
                        msgId = item.id;
                        break;
                    case "Quote":
                        msgTypeDesc.push(`§7向§o@${item.senderId}§r§7回复§r`);
                        break;
                    case "At":
                        msgTypeDesc.push(`§7呼叫§o${item.dispaly ?? "@"+item.target}§r`);
                        messageStr += String(item.dispaly ?? `@${item.target}`);
                        break;
                    case "AtAll":
                        msgTypeDesc.push("§l§e@全体成员§r");
                        messageStr += "@全体成员";
                        break;
                    case "Face":
                        messageStr += `[/${item.name}]`;
                        break;
                    case "Plain":
                        messageStr += item.text ?? "";
                        break;
                    case "Image":
                    case "FlashImage":
                        msgTypeDesc.push("§b图片§r");
                        messageStr += "[图片]";
                        break;
                    case "Voice":
                        msgTypeDesc.push("语音消息");
                        messageStr += "[语音消息]";
                        break;
                    case "ForwardMessage":
                        msgTypeDesc.push("转发消息");
                        messageStr += `[转发消息:${item.nodeList.length}]`;
                        break;
                    case "File":
                        msgTypeDesc.push("文件");
                        messageStr += `[上传了文件:${item.name}]`;
                        break;
                    default:
                        msgTypeDesc.push("§4未知消息§r");
                }
            }
            let appendWarnLength = false;
            if (messageStr.length > ServerReceiveQQMsg.maxCharLength){
                messageStr = messageStr.slice(0,ServerReceiveQQMsg.maxCharLength);
                appendWarnLength = true;
                msgTypeDesc.push("§c消息过长§r");
            }
            if (Array.from(messageStr.matchAll("\n")).length > ServerReceiveQQMsg.maxLineCount){
                messageStr = messageStr.split("\n")
                    .slice(0,ServerReceiveQQMsg.maxLineCount)
                    .reduce((lt, ct, i, arr) => {
                        return lt + "\n" + ct;
                    });
                appendWarnLength = true;
                msgTypeDesc.push("§c消息过长§r");
            }
            let message = messageStr.replaceAll(/§[\s\S]/g, "");
            if (message !== messageStr){
                msgTypeDesc.push("§c特殊字符屏蔽§r");
            }
            if (appendWarnLength) message += "[§0消息被截断§r]";
            msgTypeDesc = Array.from(new Set(msgTypeDesc));
            let msgTypeDescText = "";
            if (msgTypeDesc.length !== 0){
                msgTypeDescText = msgTypeDesc.reduce((lastVal, currentVal, idx, array)=>{
                    let rt = lastVal;
                    rt += currentVal;
                    if (idx === (array.length - 1)){
                        rt += "}";
                    } else {
                    rt += ",";
                    }
                    return rt;
                }, "{");
            }
            if (this.#GroupNumbers.length === 1){
                messageStr = `[QQ][${senderDisplayName}] ${message} ${msgTypeDescText}`;
            } else {
                messageStr = `[QQ:G{${groupName}}][${senderDisplayName}] ${message} ${msgTypeDescText}`;
            }
            VanillaWorld.say(messageStr);
        }
    }
}
const serverReceiveQQMsg = new ServerReceiveQQMsg(GroupNumbers);
