import { ChatCommand } from "./yoni/util/ChatCommand.js";
import { Command } from "./yoni/command.js";
import { Minecraft, dim, VanillaWorld, VanillaEvents, VanillaScoreboard, Gametest, runTask } from "./yoni/basis.js";
import { EventListener } from "./yoni/event.js";
import { getErrorMsg } from "./yoni/util/console.js";
import { EntityBase, Player as YoniPlayer } from "./yoni/entity.js";
import { send, say } from "./yoni/util/utils.js";
import { Logger } from "./yoni/util/Logger.js";
import { isDebug } from "./yoni/debug.js";
import Scoreboard from "./yoni/scoreboard.js";
import { getKeys } from "./yoni/lib/ObjectUtils.js";
import { YoniScheduler } from "./yoni/schedule.js";
 
const logger = new Logger("TEST");


/*
world.events.worldInitialize.subscribe((event)=>{
    let propDef = new DynamicPropertiesDefinition();
    propDef.defineString("aTestA", 9992);
    event.propertyRegistry.registerWorldDynamicProperties(propDef);
    
});
*/
/*
EventListener.register("worldInitialize", (event)=>{
    let propDef = new DynamicPropertiesDefinition();
    propDef.defineString("aTestA", 9992);
    event.propertyRegistry.registerWorldDynamicProperties(propDef);
});
/*
EventListener.register("minecraft:beforeItemUseOn", (event)=>{
    let e = event.source;
    let loc = e.location;
    let dim = e.dimension;
    let roc = e.rotation;
    let bloc = event.blockLocation;
    let block = dim.getBlock(bloc);
    if (block.type !== Minecraft.MinecraftBlockTypes.bed) return;
    e.tell("请……不要睡觉");
    event.cancel = true;
});
*/
/*
EventListener.register("yoni:playerTeleportDimension", (event)=>{
    event.player.sendMessage("你切换了维度，现在是"+event.newDimension.id+"，原来是"+event.oldDimension.id);
    
});


EventListener.register("yoni:raidEventTrigger", (event)=>{
    event.source.onScreenDisplay.setTitle("你遭遇了袭击！");
});

EventListener.register("minecraft:beforePlayerSleep", (event)=>{
    const player = EntityBase.from(event.player);
    player.sendMessage("不许睡");
    event.cancel = true;
});

EventListener.register("blockBreak", event => {
    if(typeof(event.player) === "object"){
        if(typeof(event.player.last_break) === "number"){
            var offest = Date.now() - event.player.last_break
            if(offest < 20){
                EntityBase.from(event.player).kick("范围挖掘方块").catch(logger.error);
            }
        }
        event.player.last_break = Date.now();
    }
});
/*
VanillaWorld.events.effectAdd.subscribe(event => {
    originalConsole.error("effectAdd in " + event.entity.dimension.id);
});
*/
/*
Array.from(EventTypes.getEventTypes().keys()).forEach(key=>{
    if (key!=="minecraft:tick"&&key.startsWith("minecraft:")){
        EventListener.register(key,()=>{
            console.debug("触发了事件{}",key);
        });
    }
});
*/
/*
import { ByteBlock } from "./yoni/storage/ByteBlock.js";

Scoreboard.getObjective("atestb", true);

const blockDev = new ByteBlock("atestb");

import { string2Byte as encodeUtf8 } from "./yoni/lib/text.js";

//import { string as file_hex } from "./file_hex.js";

let buffer = [];
/*
YoniScheduler.runTask(async ()=>{
    logger.info("正在读取文件");
    let times = 0;
    for (let bt of file_hex.match(/\S{2}/g)){
        buffer.push(Number("0x"+bt));
        if (times++ % 200 === 0) await 1;
    }
    logger.info("文件已读入内存");
}, true);
*/
/*
let writeLength = 262144;

//buffer = [87,76,210,143,76,30,20,19];
let mmmPerTick = 4000;

ChatCommand.registerCommand("test3", (sender, rawCommand, label, args)=>{
    YoniScheduler.runTask(()=>{
        let startW = Date.now();
        blockDev.write(buffer, 3, writeLength);
            
        let endW = Date.now();
        logger.debug("写入完成，用时{}， 共写入{}个字节（缓存可能尚未写入）", endW-startW,writeLength)
    }, true);
});

ChatCommand.registerCommand("test1", (sender, rawCommand, label, args)=>{
    YoniScheduler.runTask(()=>{
        let startW = Date.now();
        blockDev.write(buffer, 0, writeLength);
            
        let endW = Date.now();
        logger.debug("写入完成，用时{}， 共写入{}个字节（缓存可能尚未写入）", endW-startW,writeLength)
    }, true);
});
*/
ChatCommand.registerCommand("test4", (sender, rawCommand, label, args)=>{
    let objective = Scoreboard.getObjective("btestc", true);
    let i = 0;
    logger.debug("开始写入，以基本分数记录方式，不对其编码，每条项目的分数递增");
    let startW = Date.now();
    let end = Number(args[0]) ?? 500;
    let schedule = YoniScheduler.runCycleTickTask(()=>{
        
        for (let j = 0; j < 120; j++){
            if (i % 20000 === 0) logger.debug("已写入{}条", i);
            
            objective.postSetScore(String(i), i++);
        }
        
        if (i >= end){
            YoniScheduler.removeSchedule(schedule);
            
            let endW = Date.now();
            logger.debug("写入完成，用时{}", endW-startW, i);
        }
    }, 1, 1, false);
});
/*
ChatCommand.registerCommand("test3", (sender, rawCommand, label, args)=>{
    YoniScheduler.runDelayTickTask(()=>{
        let rlen = writeLength;
        
        rlen = 1000;
        
        let endW = Date.now();
        
        let rbuffer = blockDev.read(0, rlen);
        
        let endR = Date.now();
        
        console.log("读取用时 {}", endR-endW);
        console.log("writeLength: {}", rlen);
    }, 1, true);
});

let rbbb = [];

ChatCommand.registerCommand("test2", (sender, rawCommand, label, args)=>{
    let perBlockLength = args[0] ?? 128;
    
    if (args[0] === "current"){
        sender.sendMessage("当前已经读取 "+rbbb.length);
        return;
    }
    
    rbbb.length = 0;
    
    YoniScheduler.runDelayTickTask(async ()=>{
        let endW = Date.now();
        
        let rbuffer = rbbb;
        
        for await (let bts of blockDev.readBlockAsync(0, writeLength, perBlockLength)){
            rbuffer.push(...bts);
        }
        
        let endR = Date.now();
        
        console.log("读取用时 {}，读取了{}个字节", endR-endW, writeLength);
    }, 1, true);
});

ChatCommand.registerCommand("test", (sender, rawCommand, label, args)=>{
    YoniScheduler.runDelayTickTask(()=>{
    
        let startW = Date.now();
        
        blockDev.write(buffer, 0, writeLength);
        
        let endW = Date.now();
        
        let rbuffer = blockDev.read(0, writeLength);
        
        let endR = Date.now();
        
        console.log("写入用时：{}", endW-startW);
        console.log("读取用时 {}", endR-endW);
        console.log("writeLength: {}", writeLength);
    }, 1, true);
});

ChatCommand.registerCommand("test2333", (sender, rawCommand, label, args)=>{
    YoniScheduler.runDelayTickTask(()=>{
    (()=>{
        let arr=[]
        for (let i=0;i<20000; i++) arr.push({});
        let v=new Map();
        arr.forEach(e=>v.set(e, 0));
        let rv = Math.floor(Math.random()*20000)
        let st=__date_clock();v.get(arr[rv]);let ed=__date_clock();
        console.log("用时："+String(ed-st));
    })();
    }, 1, true);
});

*/