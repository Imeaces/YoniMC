import { ChatCommand } from "yoni/util/ChatCommand.js";
import { Command } from "yoni/command.js";
import { Minecraft, dim, VanillaWorld, VanillaEvents, VanillaScoreboard, Gametest, runTask } from "yoni/basis.js";
import { EventListener } from "yoni/event.js";
import { getErrorMsg } from "yoni/util/console.js";
import { YoniEntity, Player as YoniPlayer } from "yoni/entity.js";
import { send, say } from "yoni/util/utils.js";
import { Logger } from "yoni/util/Logger.js";
import { isDebug } from "yoni/debug.js";
import Scoreboard from "yoni/scoreboard.js";
import { getKeys } from "yoni/lib/utils.js";
import { YoniScheduler } from "yoni/schedule.js";

const logger = new Logger("TEST");

if (isDebug()){


ChatCommand.registerCommand("test", (sender, rawCommand, label, args)=>{
    v.run(()=>{
        player.sendMessage("成功");
    })
});


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

EventListener.register("yoni:playerTeleportDimension", (event)=>{
    event.player.sendMessage("你切换了维度，现在是"+event.newDimension.id+"，原来是"+event.oldDimension.id);
    
});


EventListener.register("yoni:raidEventTrigger", (event)=>{
    event.source.onScreenDisplay.setTitle("你遭遇了袭击！");
});

EventListener.register("minecraft:beforePlayerSleep", (event)=>{
    const player = YoniEntity.from(event.player);
    player.sendMessage("不许睡");
    event.cancel = true;
});

class ASystem extends Minecraft.System {
    constructor (){
        const v = {};
        return Object.setPrototypeOf(v, Minecraft.System.prototype);
    }
}

const v = new ASystem();

/*
Array.from(EventTypes.getEventTypes().keys()).forEach(key=>{
    if (key!=="minecraft:tick"&&key.startsWith("minecraft:")){
        EventListener.register(key,()=>{
            console.debug("触发了事件{}",key);
        });
    }
});
*/
}