import { MinecraftSystem, dim } from "scripts/yoni/basis.js";
import { EventSignal } from "scripts/yoni/events.js";

export class TickEvent {
    constructor(c, d){
        this.currentTick = c;
        this.deltaTime = d;
        Object.freeze(this);
    } 
}

let signal = new EventSignal("yonimc:tick", TickEvent);

const overworld = dim(0);

const getCurrentTick = ()=>{
    return overworld.runCommand("time query gametime").data;
};

let lastTickTimeMs;

const triggerEvent = ()=>{
    if (signal.registered)
        system.run(triggerEvent);
    else return;
    
    let currentTimeMs = Date.now();
    let deltaTime = (currentTimeMs - lastTickTimeMs) / 1000;
    lastTickTimeMs = currentTimeMs;
    let currentTick = getCurrentTick();
    
    signal.triggerEvent(currentTick, deltaTime);
};

signal.register(()=>{
        system.run(triggerEvent);
    })
    .registerEvent();
    