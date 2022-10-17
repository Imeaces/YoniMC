import { MinecraftSystem, overworld } from "yoni/basis.js";
import { EventSignal } from "yoni/event.js";

const getCurrentTick = async ()=>{
    return await overworld.runCommandAsync("time query gametime").data;
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

const triggerEvent = async ()=>{
    if (signal.registered)
        MinecraftSystem.run(triggerEvent);
    else return;
    
    let currentTimeMs = Date.now();
    let deltaTime = (currentTimeMs - lastTickTimeMs) / 1000;
    lastTickTimeMs = currentTimeMs;
    let currentTick = await getCurrentTick();
    
    signal.triggerEvent(currentTick, deltaTime);
};
signal.register(()=>{
        system.run(triggerEvent);
    })
    .registerEvent();
    