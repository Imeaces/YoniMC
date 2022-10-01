import { VanillaWorld } from "scripts/yoni/basis.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { EventListener } from "scripts/yoni/event.js";

const playerDead = new Set();
let callbacks = [];
let eventId;
export class PlayerDeadEvent {
    constructor(player){
        this.player = player;
        Object.freeze(this);
    }
}

const signal = new EventSignal("yonimc:playerDead", PlayerDeadEvent);

signal.register(()={
    eventId = EventListener.register("tick", ()=>{
        let playerAlive = new Set(YoniEntity.getAliveEntities({type:"minecraft:player"}));
        for (let player of VanillaWorld.getPlayers()){
            if (playerAlive.has(player)){
                if (playerDead.has(player)){
                    playerDead.delete(player);
                }
                continue;
            };
            if (playerDead.has(player)) continue;
            triggerEvent(player);
            playerDead.add(player);
        }
    })
    .unregister(()=>{
        EventListener.unregister(eventId);
    })
    .registerEvent();
