import { VanillaWorld, dim } from "yoni/basis.js";
import { Player } from "yoni/entity.js";
import { EventListener, EventSignal,  Events } from "yoni/event.js";
import { printError } from "yoni/util/console.js";

let eventId;
export class PlayerDeadEvent {
    constructor(player){
        this.player = new Player(player);
        Object.freeze(this);
    }
}

let playerDead = new Set();

const signal = new EventSignal("yonimc:playerDead", PlayerDeadEvent)
    .register(()=>{
        eventId = EventListener.register("minecraft:tick", ()=>{
            for (let pl of VanillaWorld.getPlayers()){
                if (!playerDead.has(pl) && pl.getComponent("minecraft:health").current === 0){
                    playerDead.add(pl);
                    signal.triggerEvent(pl);
                } else if (playerDead.has(pl) && pl.getComponent("minecraft:health").current !== 0){
                    playerDead.delete(pl);
                }
            }
        });
    })
    .unregister(()=>{
        EventListener.unregister(eventId);
    })
    .registerEvent();
