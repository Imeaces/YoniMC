import { ChatCommand } from "./util/ChatCommand.js";
import { Command } from "./command.js";
import { Minecraft, MinecraftGui, Gametest, dim,
    VanillaWorld, VanillaScoreboard, VanillaEvents,
    MinecraftSystem, runTask,
    SystemEvents } from "./basis.js";

import { EntityBase } from "./entity.js";

import { send, say } from "./util/utils.js";
import { Logger, log } from "./util/Logger.js";

import { World } from "./world.js";
import Scoreboard from "./scoreboard.js";

import { EventListener, EventTypes, events } from "./event.js";

import { getErrorMsg } from "./util/console.js";
import { load } from "./loader.js";
import { getKeys, ObjectUtils } from "./lib/ObjectUtils.js";
import { setTimeout, clearTimeout, setInterval, clearInterval } from "./lib/Timeout.js";

let logger = new Logger("debug");

let doEval;
(async function(){
    let sv = new Object(null);
    doEval = new Function(`
        let { Minecraft, MinecraftGui, Gametest, dim, VanillaWorld, VanillaScoreboard, VanillaEvents, MinecraftSystem, runTask,
        SystemEvents, load, getKeys, logger, getErrorMsg, EventListener,
        EventTypes, events, Logger, Command, ChatCommand, send, say, EntityBase, sv,
        setTimeout, clearTimeout, setInterval, clearInterval, ObjectUtils } = arguments[0];
        return async function (sender, code){
            let rt = eval(code);
            globalThis._ = rt;
            (async ()=> globalThis._await = await rt )();
        };
    `)({
        Minecraft, MinecraftGui, Gametest, dim, VanillaWorld, VanillaScoreboard, VanillaEvents, MinecraftSystem, runTask,
        SystemEvents, load, getKeys, logger, getErrorMsg, EventListener,
        EventTypes, events, Logger, Command, ChatCommand, send, say, EntityBase, sv, ObjectUtils,
        setTimeout, clearTimeout, setInterval, clearInterval
    });
})();


ChatCommand.registerPrefixCommand("$", "eval", async (sender, rawCommand, label, args) => {
    if (evaledPlayers.has(sender)) return;
    let code = rawCommand.slice(rawCommand.indexOf(" ")+1);
    evalCode(sender, code);
});

let evaledPlayers = new Set();
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

function evalCode(sender, code){
    sender = EntityBase.from(sender);
    
    printAndSend(sender, "> ", code);
    
    return doEval(sender, code)
    .then(()=>{
        printAndSend(sender, "§7", globalThis._);
    })
    .catch((e)=>{
        printAndSend(sender, "§c", getErrorMsg(e).errMsg);
    });
}

let outputs = new WeakMap();
async function printAndSend(sender, ...vs){
    let nstr = "";
    vs.forEach(l => {
        try {
            nstr += String(l);
        } catch(e){
            nstr += ( typeof l ) + "{}";
        }
    });
    let ostr = outputs.get(sender);
    if (!ostr) ostr = "§r§f";
    ostr += nstr + "\n§r§f";
    outputs.set(sender, ostr);
    sender.sendMessage(nstr);
}
ChatCommand.registerPrefixCommand("$", "shell", (sender, rawCommand, label, args)=>{
   logger.info("doing");
    sender.tell("请关闭聊天栏");
    setTimeout(()=>{
       try{
           openShell(sender);
       } catch(e){
           logger.error(e);
       }
       logger.info("done");
    }, 3000);
});
function openShell(sender){
    sender = EntityBase.from(sender);
    let ostrs = outputs.has(sender) ? outputs.get(sender): "";
    let linesLimit = 400;
    const gui = new MinecraftGui.ModalFormData();
    let lineN = 0;
    let lines = ostrs.split("\n");
    let optLines = [];
    for (let line of lines.reverse()){
        if (linesLimit-- > 0){
            let curLineN = lines.length - lineN;
            optLines.push([curLineN, line]);
        } else {
            break;
        }
        lineN++;
    }
    if (linesLimit < 0){
        gui.textField("已忽略的输出行", "", 
            `[还有${0-linesLimit}行输出未显示]`);
    }
    optLines.shift();
    optLines.reverse().forEach(liLV=>{
        gui.textField(`第${liLV[0]}行`, "", liLV[1]);
    });
    gui.textField("要执行的代码", "?");
    gui.show(EntityBase.getMinecraftEntity(sender))
    .then(rt => {
        logger.info('has rt');
        if (!("canceled" in rt)){
            logger.info('!("canceled" in rt)');
            return;
        }
        if (rt.canceled){
            logger.info('rt.canceled');
            return;
        }
        evalCode(sender, rt.formValues[rt.formValues.length-1])
        .finally(()=> openShell(sender));
    })
    .catch(logger.error);
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
