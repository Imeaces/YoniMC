import { MinecraftSystem, dim } from "scripts/yoni/basis.js";
import { EventSignal } from "scripts/yoni/event.js";

const overworld = dim(0);

const getCurrentTick = ()=>{
    return overworld.runCommand("time query gametime").data;
};

export class TickEvent {
    constructor(c, d){
        this.currentTick = c;
        this.deltaTime = d;
        Object.freeze(this);
    } 
}

const signal = new EventSignal("yonimc:tick", TickEvent);

let lastTickTimeMs;

const triggerEvent = ()=>{
    if (signal.registered)
        MinecraftSystem.run(triggerEvent);
    else return;
    
    let currentTimeMs = Date.now();
    let deltaTime = (currentTimeMs - lastTickTimeMs) / 1000;
    lastTickTimeMs = currentTimeMs;
    let currentTick = getCurrentTick();
    
    signal.triggerEvent(currentTick, deltaTime);
};
/*
signal.register(()=>{
        system.run(triggerEvent);
    })
    .registerEvent();
*/
    