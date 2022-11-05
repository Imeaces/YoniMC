import { runTask } from "yoni/basis.js";
import { EventSignal, Event } from "yoni/event.js";
import { Command } from "yoni/command.js";

//毕竟真正的tick事件目前没啥办法做到
let tick = 0;

export class TickEvent extends Event {
    constructor(c, d){
        super();
        this.currentTick = c;
        this.deltaTime = d;
        Object.freeze(this);
    } 
}

let shouldRun = false;

let lastTickTimeMs;

let lastTick = -10;

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
    signal.triggerEvent(currentTick, deltaTime);
};

const signal = EventSignal.builder("yoni:tick")
    .eventClass(TickEvent)
    .build()
    .whenFirstSubscribe(()=>{
        shouldRun = true;
        runTask(triggerEvent);
    })
    .whenLastUnsubscribe(()=>{
        runTask(triggerEvent);
    })
    .registerEvent();
