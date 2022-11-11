import { EventListener, Event, EventSignal, EventTriggerBuilder } from "./event.js";
import { Entity } from "./entity.js";
import { YoniScheduler } from "./schedule.js";

import { send } from "./util/utils.js";

const defaultTranslateText = "chat.type.text";
const ChatSendList = [];
const ChatSendQueues = [];
const CommandSendQueues = [];

EventListener.register("minecraft:beforeChat", (event)=>{
    let { sender, message } = event;
    ChatSendList.push({"sender": Entity.from(sender), "message": message});
    event.cancel = true;
});

YoniScheduler.runCycleTickTask(()=>{
    ChatSendList.forEach(internalChatEvent);
    ChatSendList.length = 0;
    if (ChatSendQueues.length !== 0) sendChats();
    if (CommandSendQueues.length !== 0) sendCommands();
}, 0, 1, true);

function internalChatEvent(chat){
    if (chat.message.startsWith("!")){
        CommandSendQueues.push(chat);
    }
    ChatSendQueues.push(chat);
}

//命令触发为同步事件
function triggerCommand(chat){
}

//聊天发送为异步事件
async function triggerChat(chat){
}

async function sendChats(){
}

function sendCommands(){
}

beforeChatTrigger = new EventTriggerBuilder("yoni:beforeChat")