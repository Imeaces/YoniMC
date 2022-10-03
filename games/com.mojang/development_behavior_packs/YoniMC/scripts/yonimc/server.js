import { http, HttpRequest, HttpHeader } from "mojang-net";
import { EventListener } from "scripts/yoni/event.js";
import { ChatCommand } from "scripts/yoni/command/ChatCommand.js";
import { Command } from "scripts/yoni/command.js";
import { VanillaWorld } from "scripts/yoni/basis.js";

import { API_URL, API_KEY, QQNumber, GroupNumber } from "./config.js";

let session = null;

let fetchDelay = 240;

async function post(url="/", content={}, headers){
    content.sessionKey = await getSession();
    let req = new HttpRequest(API_URL+url)
        .setMethod("POST")
        .setTimeout(3000)
        .setBody(JSON.stringify(content));
    for (let h in headers){
        req.addHeader(h, headers[h]);
    }
    return await http.request(req);
}

async function get(url="/", argus={}, headers={}){
    url += "?sessionKey=" + await getSession();
    for (let a in argus){
        url += `&${encodeURIComponent(a)}=${encodeURIComponent(argus[a])}`
    }
    let req = new HttpRequest(API_URL+url)
        .setMethod("GET")
        .setTimeout(3000);
    for (let h in headers){
        req.addHeader(h, headers[h]);
    }
    return await http.request(req);
}

async function getSession(i=0){
    if (session == null) session = await newSessionKey();
    let u = API_URL + "/sessionInfo?sessionKey=" + session;
    let req = new HttpRequest(u)
        .setMethod("GET")
        .setTimeout(3000);
    let rt = await http.request(req);
    let body = JSON.parse(rt.body);
    if (body.code !== 0){
        if (i < 3){
            session = await newSessionKey();
            return getSessionInfo(i+1);
        } else {
            throw new Error();
        }
    } else {
        return session;
    }
}

async function newSessionKey(){
    let req = new HttpRequest(API_URL+"/verify")
        .setMethod("POST")
        .setTimeout(3000)
        .setBody(JSON.stringify({verifyKey: API_KEY}));
    let rt = await http.request(req);
    let sK = JSON.parse(rt.body).session;
    if (await bindSession(sK)){
        return sK;
    } else {
        return null;
    }
}

async function bindSession(sK){
    let req = new HttpRequest(API_URL+"/bind")
        .setMethod("POST")
        .setTimeout(3000)
        .setBody(JSON.stringify({
            sessionKey: sK,
            qq: QQNumber
        }));
    let rt = await http.request(req);
    return (JSON.parse(rt.body).code === 0) ? true : false;
}
/*
ChatCommand.registerCommand("qq", (sender, rawCommand, label)=>{
    sender.sendMessage("正在发送消息");
    let body = {
        target: 532861538,
        messageChain: [
            {
                type: "Plain",
                text: rawCommand.slice(label.length+1)
            }
        ]
    };
    let headers = { "Content-Type": "application/json" };
    sender.sendMessage(post("/sendGroupMessage", body, headers).messageId);
});

ChatCommand.registerCommand("getSession", (sender, rawCommand, label)=>{
    sender.sendMessage(getSession());
});
*/
EventListener.register("minecraft:playerLeave", (event)=>{
    let body = {
        target: 532861538,
        messageChain: [
            {
                type: "Plain",
                text: `玩家 ${event.playerName} 离开了游戏`
            }
        ]
    };
    let headers = { "Content-Type": "application/json" };
    post("/sendGroupMessage", body, headers);

});

EventListener.register("yonimc:playerJoined", (event)=>{
    let body = {
        target: 532861538,
        messageChain: [
            {
                type: "Plain",
                text: `玩家 ${event.player.name} 加入了游戏`
            }
        ]
    };
    let headers = { "Content-Type": "application/json" };
    post("/sendGroupMessage", body, headers);

});

EventListener.register("chat", (event)=>{
    let { message, sender } = event;
    let body = {
        target: 532861538,
        messageChain: [
            {
                type: "Plain",
                text: `<${sender.name}> ${message}`
            }
        ]
    };
    let headers = { "Content-Type": "application/json" };
    post("/sendGroupMessage", body, headers);

});

EventListener.register("tick", async (event)=>{
    if (event.currentTick % fetchDelay !== 2) return;
    if ([...VanillaWorld.getPlayers()].length === 0) return;
    if (fetchDelay < 240) fetchDelay += 10;

    let rt = await get("/fetchLatestMessage", {
        count: 10
    });
    let body = JSON.parse(rt.body);
    if (body.code !== 0) return;
    
    for (let d of body.data){
        if (d.type !== "GroupMessage") continue;
        let { sender } = d;
        if (sender.group.id !== GroupNumber) continue;
        for (let a of d.messageChain){
            switch(a.type){
                case "Plain":
                    fetchDelay = 20;
                    ()=>{
                        let rawtext = [
                            { text: `[QQ][${sender.memberName}]: ${a.text}` }
                        ]
                            
                        Command.run(`tellraw @a ${JSON.stringify({rawtext})}`);
                    }();
                    break;
            }
        }
    }

});

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