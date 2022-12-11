import { ChatCommand } from "yoni/util/ChatCommand.js";
import { Command } from "yoni/command.js";
import { Minecraft, dim, VanillaWorld, Gametest } from "yoni/basis.js";
import { YoniEntity, YoniPlayer } from "yoni/entity.js";
import { send, say } from "yoni/util/utils.js";
import { Logger, log } from "yoni/util/Logger.js";
import { debug } from "yoni/config.js";
import { World } from "yoni/world.js";
import Scoreboard from "yoni/scoreboard.js";
import { EventListener, EventTypes } from "yoni/event.js";
import { getErrorMsg, printError as printErrorToConsole } from "yoni/util/console.js";
import { load } from "yoni/loader.js";
import { getKeys } from "yoni/lib/utils.js";
import "yoni/index.js";

const printError = (...args)=>{
    printErrorToConsole("", ...args);
};

const standaloneEnvirnmentRoot = Object.assign({
    getKeys, getErrorMsg, printError, Scoreboard,
    World, Logger, log, send, say, YoniEntity, Minecraft,
    dim, VanillaWorld, Gametest, Command, ChatCommand,
    EventTypes, EventListener, load
}, globalThis);

let _ = undefined;/*
async function doEval(sender, code){
    _ = Function("const globalThis = this; return eval(arguments[0])")
    .call(Object.assign({ sender, _ }, standaloneEnvirnmentRoot), code);
    return _;
}
*/
let logger = new Logger("debug");

let saves = new Proxy(new Map(),{
    set: (target, key, value)=>{
        target.set(key,value);
        return true;
    },
    get: (target, key)=>{
        if (target.has(key)){
            return target.get(key);
        }
        return target[key];
    }
});

function save(id, any){
    saves.set(id, any);
}

function get(id){
    return saves.get(id);
}

let evaledPlayers = new Set();

ChatCommand.registerPrefixCommand("$", "eval", async (sender, rawCommand, label, args) => {
    if (evaledPlayers.has(sender)) return;
    let code = rawCommand.slice(rawCommand.indexOf(" ")+1);
    evalCode(sender, code);
});

ChatCommand.registerPrefixCommand("$", "geval", (sender, rawCommand, label, args) => {
    let u;
    if (args[0] !== undefined){
        u = Boolean(args[0]);
    } else {
        u = !evaledPlayers.has(sender.vanillaEntity);
    }
    if (u){
        evaledPlayers.add(sender.vanillaEntity);
    } else {
        evaledPlayers.delete(sender.vanillaEntity);
    }
});

EventListener.register("minecraft:beforeChat", (event)=>{
    let { sender, message } = event;
    if (evaledPlayers.has(sender)) event.cancel = true;
    else return;
    evalCode(sender, message);
});

async function doEval(sender, code){
    _ = eval(code);
    return _;
}

function evalCode(sender, code){
    sender = YoniEntity.from(sender);
    sender.sendMessage("> "+code);
    doEval(sender, code)
    .then((rt)=>{
        sender.sendMessage("§7"+rt);
        _ = rt;
    })
    .catch((e)=>{
        sender.sendMessage("§c"+getErrorMsg(e).errMsg);
    });
}

ChatCommand.registerPrefixCommand("$", "exec", async (sender, rawCommand, label, args) => {
    let cmd = rawCommand.slice(label.length+1);
    sender.sendMessage("/"+cmd);
    let rt = await sender.fetchCommand(cmd);
    sender.sendMessage("§7"+ JSON.stringify(rt) );
});
