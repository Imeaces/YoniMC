import { http, HttpRequest, HttpHeader } from "@minecraft/server-net";
import { EventListener, Events, EventSignal, EventTriggerBuilder } from "yoni/event.js";
import { Command } from "yoni/command.js";
import { World } from "yoni/world.js";
import { getErrorMsg } from "yoni/util/console.js";
import { say } from "yoni/util/utils.js";
import { Logger } from "yoni/util/Logger.js";
import { ChatCommand } from "yoni/util/ChatCommand.js";

const logger = new Logger("Server");

const log = logger.trace(...args);

import { API_URL, API_KEY, QQNumber, GroupNumber, AdminList } from "./mirai-config.js";

class MiraiSession {
    static logger = new Logger("MiraiSession");
    timeoutDelay = 1200;
    botQQNumber = null;
    API_URL;
    #API_KEY;
    #sessionKey;
    
    constructor (apiUrl, apiKey = "", botQQNumber = null){
        this.API_URL = apiUrl;
        this.#API_KEY = apiKey;
        if (botQQNumber != null){
            this.botQQNumber = botQQNumber;
            this.refreshSession()
                .catch(MiraiSession.logger.error);
        }
    }
    
    /**
     * @param {string} url
     * @param {{[key]: any}} contents
     * @param {Array<{[key]: any}>} headers
     * @returns {Promise<Object>}
     */
    async post(uri, contents={}, headers={}, retryCount = 2){
        let error = null;
        while (retryCount >= 0){
            try {
                let session;
                if (error){
                    session = await this.getSession(true, retryCount);
                } else {
                    session = await this.getSession();
                }
                let request = new HttpRequest(this.API_URL+uri)
                    .setMethod("POST")
                    .setTimeout(this.timeoutDelay)
                    .setBody(JSON.stringify(
                        Object.assign({ sessionKey: session }, contents)
                    ));
                for (let headerKey in headers){
                    request.addHeader(headerKey, headers[headerKey]);
                }
                let result = await http.request(request);
                return JSON.parse(result.body);
            } catch (e){
                error = e;
                retryCount --;
            }
        }
        throw new Error("failed to post request");
    }
    
    /**
     * @param {string} url
     * @param {{[key]: any}} args
     * @param {Array<{[key]: any}>} headers
     */
    async get(uri, args={}, headers={}, retryCount = 2){
        let error = e;
        while (retryCount >= 0){
            try {
                let sessionKey;
                if (error){
                    sessionKey = await this.getSession(true, retryCount);
                } else {
                    sessionKey = await this.getSession();
                }
                let url = `${this.API_URL}${uri}?sessionKey=${sessionKey}`;
                for (let argKey in args){
                    url += `&${encodeURIComponent(argKey)}=${encodeURIComponent(args[argKey])}`
                }
                let request = new HttpRequest(url)
                    .setMethod("GET")
                    .setTimeout(this.timeoutDelay);
                for (let headerKey in headers){
                    request.addHeader(headerKey, headers[headerKey]);
                }
                let result = await http.request(request);
                return JSON.parse(result.body);
            } catch (e){
                retryCount --;
                error = e;
            }
        }
        throw new Error("failed to get request");
    }
    async refreshSession(botQQNumber = this.botQQNumber, retryCount = 5){
        if (botQQNumber == null){
            throw new Error("you must specific a botQQNumber for the new session");
        }
        let verifyApiKeyRequest = new HttpRequest(this.API_URL+"/verify")
            .setMethod("POST")
            .setTimeout(this.timeoutDelay)
            .setBody(JSON.stringify({
                verifyKey: this.#API_KEY
            }));
        let verifyApiKeyResult = await (async ()=>{
            let error;
            while (retryCount >= 0){
                try {
                    return await http.request(verifyApiKeyRequest);
                } catch(e) {
                    error = e;
                    retryCount --;
                }
            }
            throw Object.assign(new Error("failed to verify api key"), { cause: error });
        })();
        let verifyApiKeyResultBody = JSON.parse(verifyApiKeyResult.body);
        let unbindSessionKey = verifyApiKeyResultBody.session;
        if (unbindSessionKey == null){
            throw new Error("未能获取到sessionkey");
        }
        let bindSessionRequest = new HttpRequest(this.API_URL+"/bind")
            .setMethod("POST")
            .setTimeout(this.timeoutDelay)
            .setBody(JSON.stringify({
                sessionKey: unbindSessionKey,
                qq: botQQNumber
            }));
        let bindSessionResult = await (async ()=>{
            let error;
            while (retryCount >= 0){
                try {
                    return await http.request(bindSessionRequest);
                } catch(e) {
                    retryCount --;
                    error = e;
                }
            }
            throw Object.assign(new Error("failed to bind session"), { cause: error });
        })();
        let bindSessionResultBody = JSON.parse(bindSessionResult.body);
        if (bindSessionResultBody.code === 0){
            this.#sessionKey = unbindSessionKey;
            this.sessionLastUpdateTime = Date.now();
            return unbindSessionKey;
        }
        let error = new Error("failed to bind session");
        error.cause = bindSessionResult.body;
        MiraiSession.logger.error(error);
        throw error;
    }
    sessionLastUpdateTime = 0;
    sessionUpdateDelay = 240000;
    /**
     * @param {boolean} force
     * @param {number} retryCount
     */
    async getSession(force = false, retryCount = 1){
        let error = null;
        if (!force
            && (Date.now() - this.sessionLastUpdateTime < this.sessionUpdateDelay)
        ){
            return this.#sessionKey;
        }
        if (this.#sessionKey == null){
            return this.refreshSession();
        }
        while (retryCount >= 0){
            try {
                let getSessionInfoRequest = new HttpRequest(this.API_URL + "/sessionInfo?sessionKey=" + this.#sessionKey)
                    .setMethod("GET")
                    .setTimeout(this.timeoutDelay);
                let getSessionInfoRequestResult = await (async ()=>{
                    let error;
                    while (retryCount >= 0){
                        try {
                            return http.request(getSessionInfoRequest);
                        } catch (e){
                            retryCount --;
                            error = e;
                        }
                    }
                    let outError = new Error("error while checking session info");
                    throw outError.cause = error, outError;
                })();
                let getSessionInfoRequestResultBody = JSON.parse(getSessionInfoRequestResult.body);
                if (getSessionInfoRequestResultBody.code === 0){
                    this.this.sessionLastUpdateTime = Date.now();
                    return this.#sessionKey;
                }
                return this.refreshSession();
            } catch(e) {
                retryCount --;
                error = e;
            }
        }
        let outError = new Error("error while getting session");
        ouError.cause = error;
        MiraiSession.logger.error(outError);
        throw new Error(outError);
    }
}

const session = new MiraiSession(API_URL, API_KEY, QQNumber);

let isRunningDoSendQQGroupMessage = false;
async function doSendQQGroupMessage(currentTime){
    if (isRunningDoSendQQGroupMessage) return; 
    log(msgSequeneList.length);
    isRunningDoSendQQGroupMessage = true;
    while (msgSequeneList.length > 0){
        try {
            await msgSequeneList.shift()();
        } catch {
            //failed
            isRunningDoSendQQGroupMessage = false;
            return;
        }
    }
    isRunningDoSendQQGroupMessage = false;
}

const sendMessageSchedules = [];

function sendQQGroupMessage(message, retry=true){
    if (message === undefined) throw new Error("empty message");
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
    sendMessageSchedules.push(async ()=>{
        return await session.post("/sendGroupMessage", body, headers);
    });
}

ChatCommand.registerCommand("qq", (sender, rawCommand, label)=>{
    let message = rawCommand.slice(label.length+2);
    sendQQGroupMessage(`<${sender.name}> ${message}`);
});

EventListener.register("minecraft:playerLeave", (event)=>{
    sendQQGroupMessage(`玩家 ${event.playerName} 离开了游戏`);
});

EventListener.register("yoni:playerJoined", (event)=>{
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
        World.getPlayers().forEach(player=>player.sendMessage({`[QQ][${memberName}]: ${message}`}));
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

let lastFetchTime = 0;
let fetchDelay = 1000;
const serverReceiveQQMsgPollingSchedule = new Schedule({
    type: Schedule.tickCycleSchedule,
    async: true,
    period: 20,
    delay: Math.random() * 20
}, async ()=>{
    let currentTime = Date.now();
    
    if (sendMessageSchedules.length > 0) doSendQQGroupMessage(currentTime);
    
    if (currentTime - lastFetchTime < fetchDelay)
        return;
    else
        lastFetchTimeMs = currentDateMs;
        
    if (fetchDelay < 20000)
        fetchDelay += 1000;
    
    let rt = await session.get("/fetchMessage", {
        count: 40
    });
    if (rt.code !== 0){
        logger.error("无法获取到消息: {}", JSON.stringify(rt));
        return;
    }
    
    for (let d of rt.data){
        if (d.type !== "GroupMessage")
            continue;
        
        let { sender } = d;
        
        //不是特定群聊就检测下一条消息
        if (sender.group.id !== GroupNumber)
            continue;
        
        //时间差距过大就放弃此消息
        if (Math.abs(sender.lastSpeakTimestamp - currentTime/1000) > 60)
            continue;
            
        for (let a of d.messageChain){
            switch(a.type){
                case "Plain":
                    fetchDelay = 1500;
                    serverReceiveQQMsgEventTrigger.triggerEvent(currentDateMs, sender, a.text);
                    break;
            }
        }
    }
});
const serverReceiveQQMsgEventTrigger = EventTriggerBuilder("yonimc:serverReceiveQQMsg")
    .eventClass(QQGroupChatEvent)
    .whenFirstSubscribe(()=>{
        YoniScheduler.addSchedule(serverReceiveQQMsgPollingSchedule);
    })
    .whenLastUnsubscribe(()=>{
        YoniScheduler.removeSchedule(serverReceiveQQMsgPollingSchedule);
    })
    .build()
    .registerEvent();
