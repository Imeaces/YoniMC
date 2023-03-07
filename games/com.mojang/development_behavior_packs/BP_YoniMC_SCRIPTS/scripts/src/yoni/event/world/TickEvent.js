import { runTask, MinecraftSystem } from "../../basis.js";
import { EventSignal, Event, EventTriggerBuilder } from "../../event.js";

export class TickEventSignal extends EventSignal {}

export class TickEvent extends Event {
    currentTick;
    deltaTime;
    constructor(currentTick, deltaTime){
        super({deltaTime, currentTick});
        Object.freeze(this);
    }
}

const getTimeNs = (function (){
    if (typeof __date_clock === "function")
        return __date_clock;
    return () => Date.now() * 1000;
})();

const trigger = new EventTriggerBuilder("yoni:tick")
    .eventSignalClass(TickEventSignal)
    .eventClass(TickEvent)
    .whenFirstSubscribe(() => {
        stop = false;
        lastTickTimeNs = getTimeNs();
        runTask(start);
    })
    .whenLastUnsubscribe(() => {
        stop = true;
    })
    .build()
    .registerEvent();

let lastTickTimeNs = 0;
let stop = false;
function start(){
    if (stop) return;
    runTask(start);
    
    let ct = getTimeNs();
    let pt = (ct - lastTickTimeNs) / 1000000;
    lastTickTimeNs = ct;
    trigger.triggerEvent(MinecraftSystem.currentTick, pt);
}
