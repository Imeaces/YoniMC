import { http, HttpRequest, HttpHeader } from "mojang-net";
import { EventListener, Events, EventSignal } from "scripts/yoni/event.js";
import { ChatCommand } from "scripts/yoni/command/ChatCommand.js";
import { Command } from "scripts/yoni/command.js";
import { World } from "scripts/yoni/world.js";
import { getErrorMsg } from "scripts/yoni/util/console.js";
import { say } from "scripts/yoni/util/utils.js";
import { Logger } from "scripts/yoni/util/Logger.js";

const logger = new Logger("Server");

const log = (...args)=>{ logger.trace(...args); };

import { API_URL, API_KEY, QQNumber, GroupNumber, AdminList } from "./mirai-config.js";

let timeoutDelay = 1200;

let session = null;

//ms
let fetchDelay = 5000;

async function post(url="/", content={}, headers, i=0){
    log("post");
    try {
        log(`requset getting session...`);
        content.sessionKey = await getSession((i===0)?true:false, (i===0)?false:true);
    } catch {
        log(`requset get session failed`);
        throw new Error(`requset get session failed`);
    }
    log(`post use session: ${content.sessionKey}`);
    try {
    let req = new HttpRequest(API_URL+url)
        .setMethod("POST")
        .setTimeout(timeoutDelay)
        .setBody(JSON.stringify(content));
    for (let h in headers){
        req.addHeader(h, headers[h]);
    }
    try {
        log(`start request to ${url}`);
        let rt = await http.request(req);
        log(`successfully request to ${url}`);
        return rt;
    } catch {
        log(`failed request to ${url}, try again: ${i}`);
        if (i < 2){
            return await post(url, content, headers, i+1);
        } else {
            throw new Error();
            log(`err: try again to much`);
        }
    }
    }catch(e){ log(getErrorMsg(e).errMsg); }
}

async function get(url="/", argus={}, headers={}, i=0){
    log("get");
    let urls = url;
    urls += "?sessionKey=" + await getSession((i===0)?true:false, (i===0)?false:true);
    log(`get url with session: ${urls}`);
    for (let a in argus){
        urls += `&${encodeURIComponent(a)}=${encodeURIComponent(argus[a])}`
    }
    log(`get url with session and args: ${urls}`);
    let req = new HttpRequest(API_URL+urls)
        .setMethod("GET")
        .setTimeout(timeoutDelay);
    for (let h in headers){
        req.addHeader(h, headers[h]);
    }
    try {
        log(`start get ${urls}`);
        let rt = await http.request(req);
        log(`successfully get ${urls}`);
        return rt;
    } catch {
        log(`failed get ${urls}, try again: ${i}`);
        if (i < 2){
            return await get(url, argus, headers, i+1);
        } else {
            log(`err: try again to much`);
            throw new Error();
        }
    }
}

let lastSessionUpdateTime = 0;

async function getSession(retry=true, force=false){
    log("getSession: will retry "+retry);
    try {
        if (session === null) session = await newSessionKey(retry);
    } catch {
        return await getSession(false, true);
    }
    if (!force && Date.now() - lastSessionUpdateTime < 240000){
        log(`use last cached session: ${session}`);
        return session;
    }
    log(`check session: ${session}`);
    let u = API_URL + "/sessionInfo?sessionKey=" + session;
    let req = new HttpRequest(u)
        .setMethod("GET")
        .setTimeout(timeoutDelay);
    let rt;
    try {
        rt = await http.request(req);
    } catch {
        if (retry){
            log(`check session failed: ${session}, try again`);
            return await getSession(false, true);
        } else {
            log(`check session failed: ${session}`);
            throw new Error();
        }
    }
    let body = JSON.parse(rt.body);
    log(rt.body);
    if (body.code !== 0){
        if (retry){
            log(`check session failed: ${session}, ${rt.body}, try again`);
            session = null;
            return await getSession(false, true);
        } else {
            log(`check session failed: ${session}, ${rt.body}`);
            throw new Error();
        }
    } else {
        log(`check session successfully: ${session}, ${rt.body}`);
        lastSessionUpdateTime = Date.now();
        return session;
    }
}

async function newSessionKey(retry=true){
    log("getting newSessionKey");
    let req = new HttpRequest(API_URL+"/verify")
        .setMethod("POST")
        .setTimeout(timeoutDelay)
        .setBody(JSON.stringify({verifyKey: API_KEY}));
    let rt;
    try {
        rt = await http.request(req);
    } catch {
        if (retry)
            return await newSessionKey(false);
        else
            throw new Error();
    }
    let sK = JSON.parse(rt.body).session;
    if (await bindSession(sK)){
        log(`newSessionKey ${sK}`);
        return sK;
    } else if (retry){
        log(`failed in getting newSessionKey, try again`);
        return await newSessionKey(false);
    } else {
        log(`failed to get newSessionKey`);
        throw new Error();
    }
}

async function bindSession(sK){
    log("bindSession "+sK);
    let req = new HttpRequest(API_URL+"/bind")
        .setMethod("POST")
        .setTimeout(timeoutDelay)
        .setBody(JSON.stringify({
            sessionKey: sK,
            qq: QQNumber
        }));
    try {
        let rt = await http.request(req);
        return (JSON.parse(rt.body).code === 0) ? true : false;
    } catch {
        return false;
    }
}
let sendMessageSchedules = new Map();

async function doSendQQGroupMessage(currentDateMs){
    let msgSequeneList = [...sendMessageSchedules.keys()]
        .sort((a,b)=>{
            return a - b;
        });
    for (let key of msgSequeneList){
        let func = sendMessageSchedules.get(key);
        sendMessageSchedules.delete(key);
        
        try {
            await func();
        } catch {
            try {
            await func();
            } catch {
                continue;
            }
        }
    }
}

function sendQQGroupMessage(message, retry=true){
    if (message===undefined) throw new Error("empty message");
    let body = {
        target: GroupNumber,
        messageChain: [
            {
                type: "Plain",
                text: `${message}`
            }
        ]
    };
    let headers = { "Content-Type": "application/json" };
    sendMessageSchedules.set(Date.now(), async ()=>{
        return await post("/sendGroupMessage", body, headers);
    });
}

ChatCommand.registerCommand("qq", (sender, rawCommand, label)=>{
    let message = rawCommand.slice(label.length+2);
    sendQQGroupMessage(`<${sender.name}> ${message}`);
});

EventListener.register("minecraft:playerLeave", (event)=>{
    sendQQGroupMessage(`玩家 ${event.playerName} 离开了游戏`);
});

EventListener.register("yonimc:playerJoined", (event)=>{
    sendQQGroupMessage(`玩家 ${event.player.name} 加入了游戏`);
});

EventListener.register("chat", (event)=>{
    let { message, sender } = event;
    sendQQGroupMessage(`<${sender.name}> ${message}`);
});

EventListener.register("yonimc:serverReceiveQQMsg", (event)=>{
    let { memberName, qqid, message } = event;
    if (message.startsWith("+") && AdminList.includes(qqid)){
        let rt = Command.run(event.message.substring(1));
        sendQQGroupMessage(`命令已执行: 状态${rt.statusCode}\n${rt.statusMessage}`);
    } else if (World.getPlayers().length > 0){
        let rawtext = [
            { text: `[QQ][${memberName}]: ${message}` }
        ];
        Command.run(`tellraw @a ${JSON.stringify({rawtext})}`);
    }
});

class QQGroupChatEvent {
    constructor (time, sender, message){
        this.time = time;
        this.sender = sender;
        this.memberName = sender.memberName;
        this.qqid = sender.id;
        this.message = message;
        Object.freeze(this);
    }
}

let lastFetchTimeMs = 0;
let seid;
let signal = new EventSignal("yonimc:serverReceiveQQMsg", QQGroupChatEvent)
    .register(()=>{
        seid = EventListener.register("tick", async (event)=>{
            
            let currentDateMs = Date.now();
            
            if (sendMessageSchedules.size > 0) doSendQQGroupMessage(currentDateMs);
            
            if (currentDateMs - lastFetchTimeMs < fetchDelay)
                return;
            else
                lastFetchTimeMs = currentDateMs;
                
            if (fetchDelay < 20000)
                fetchDelay += 1000;
        
            let rt = await get("/fetchLatestMessage", {
                count: 10
            });
            let body = JSON.parse(rt.body);
            if (body.code !== 0) return;
            
            for (let d of body.data){
                if (d.type !== "GroupMessage")
                    continue;
                    
                let { sender } = d;
                
                //不是特定群聊就检测下一条消息
                if (sender.group.id !== GroupNumber)
                    continue;
                    
                //时间差距过大就放弃此消息
                if (Math.abs(sender.lastSpeakTimestamp - currentDateMs/1000) > 60)
                    continue;
                    
                    
                for (let a of d.messageChain){
                    switch(a.type){
                        case "Plain":
                            fetchDelay = 1500;
                            signal.triggerEvent(currentDateMs, sender, a.text);
                            break;
                    }
                }
            }
        
        });
    })
    .unregister(()=>{
        EventListener.unregister(seid);
    })
    .registerEvent();
        

/*
EventListener.register("playerDead", (event)=>{
    let { player } = event;
    let body = {
        target: 532861538,
        messageChain: [
            {
                type: "Plain",
                text: `${player.name} 不知道怎么就死了`
            }
        ]
    };
    let headers = { "Content-Type": "application/json" };
    post("/sendGroupMessage", body, headers);

});
*/