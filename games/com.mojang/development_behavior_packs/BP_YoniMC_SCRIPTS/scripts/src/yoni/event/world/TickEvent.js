import { runTask, MinecraftSystem } from "../../basis.js";
import { EventSignal, Event, EventTriggerBuilder } from "../../event.js";
import { Command } from "../../command.js";

export class TickEventSignal extends EventSignal {}

export class TickEvent extends Event {
    get currentTick(){
        return super.currentTick;
    }
    get deltaTime(){
        return super.deltaTime;
    }
    constructor(currentTick, deltaTime){
        super({deltaTime, currentTick});
    }
}

//毕竟真正的tick事件目前没啥办法做到
let tick = 0;

let shouldRun = false;

let lastTickTimeMs;

let lastTick = MinecraftSystem?.currentTick ?? -1;

const triggerEvent = ()=>{
    if (shouldRun)
        runTask(triggerEvent);
    else 
        return;
    
    let currentTimeMs = __date_clock();
    let deltaTime = (currentTimeMs - lastTickTimeMs) / 100000;
    lastTickTimeMs = currentTimeMs;
    let currentTick = tick++
    if (currentTick - lastTick !== 1 && lastTick !== -1){
        // console.fatal("游戏刻事件被跳过了 {} 次", currentTick - lastTick);
    }
    lastTick = currentTick;
    trigger.triggerEvent(currentTick, deltaTime);
};

const trigger = new EventTriggerBuilder()
    .id("yoni:tick")
    .eventSignalClass(TickEventSignal)
    .eventClass(TickEvent)
    .whenFirstSubscribe(()=>{
        shouldRun = true;
        runTask(triggerEvent);
    })
    .whenLastUnsubscribe(()=>{
        shouldRun = false;
    })
    .build()
    .registerEvent();
