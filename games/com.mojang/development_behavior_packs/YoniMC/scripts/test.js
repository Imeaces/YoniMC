import ChatCommand from "scripts/yoni/command/ChatCommand.js";
import {
    Minecraft,
    dim,
    VanillaWorld,
    VanillaEvents,
    VanillaScoreboard
    } from "scripts/yoni/basis.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { tell, say } from "scripts/yoni/util/yoni-lib.js";
import Command from "scripts/yoni/command.js";
import SimpleScoreboard from "scripts/yoni/scoreboard/SimpleScoreboard.js";
import { EventListener } from "scripts/yoni/event.js";
import { EntityDamageCause } from "mojang-minecraft";


let isTesting = false;
let idx = 0;
let maxIdx = 200000;
let maxC = 0;
let lastDT = 0;
EventListener.register(VanillaEvents.tick, (event)=>{
    if (!isTesting) return;
    if (maxIdx - idx < 0){
        say("数量已达到");
        isTesting = false;
        return;
    }
    
    lastDT = event.deltaTime;
    if (event.deltaTime < 0.05)
        maxC++;
    else
        maxC--;
    
    for (let i = maxC; i > 0; i--){
        Command.run(`scoreboard players set id${idx} test01 ${idx}`);
        idx++;
    }
});

let map = new Map();

ChatCommand.registerCommand("test", (sender, rawCommand, label, args)=>{
    sender = new YoniEntity(sender);
    
    Command.run("scoreboard objectives add test01 dummy");
    
    let opt = args[0];
    if (opt === "test01"){
        isTesting = !isTesting;
        if (!isTesting)
            sender.sendMessage("结束测试");
        else
            sender.sendMessage("开始测试");
    } else if (opt === "show01"){
        sender.sendMessage(`isTesting: ${isTesting}`);
        sender.sendMessage(`idx: ${idx}`);
        sender.sendMessage(`maxC: ${maxC}`);
        sender.sendMessage(`lastDT: ${lastDT}`);
    } else if (opt === "test03"){
        let it = dim(0).getEntities();
        let rt = it.next();
        while (!rt.done){
            let c = new YoniEntity(rt.value);
            c.say("awa");
            
            rt = it.next();
        }
    } else if (opt === "test02"){
        say( [...VanillaWorld.getPlayers()][0] instanceof Minecraft.Player );
        say( [...VanillaWorld.getPlayers()][0] instanceof Minecraft.Entity );
        say( [...dim(0).getEntities({type:"minecraft:player"})][0] instanceof Minecraft.Player );
        say( [...dim(0).getEntities({type:"minecraft:player"})][0] instanceof Minecraft.Entity );
    } else {
        [...VanillaScoreboard.getObjective("test01").getParticipants()].forEach((id)=>{
            map.set(id.displayName, id);
        });
        sender.sendMessage(map.size);
    }
});
