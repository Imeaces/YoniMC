import { ChatCommand } from "./util/ChatCommand.js";
import { Command } from "./command.js";
import { Minecraft, dim, VanillaWorld, Gametest } from "./basis.js";
import { YoniEntity, YoniPlayer } from "./entity.js";
import { send, say } from "./util/utils.js";
import { Logger, log } from "./util/Logger.js";
import { debug } from "./config.js";
import { World } from "./world.js";
import Scoreboard from "./scoreboard.js";
import { EventListener, EventTypes } from "./event.js";
import { getErrorMsg, printError as printErrorToConsole } from "./util/console.js";
import { load } from "./loader.js";
import { getKeys } from "./lib/utils.js";
import "./index.js";

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

let saves = new Object(null);

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
ChatCommand.registerPrefixCommand("$", "run", (sender, rawCommand, label, args) => {
    let cmd = rawCommand.slice(label.length+1);
    sender.sendMessage("/"+cmd);
    let rt = Command.run(cmd);
    sender.sendMessage("§7"+ JSON.stringify(rt) );
});
