import { VanillaWorld, dim } from "scripts/yoni/basis.js";
import { Player } from "scripts/yoni/entity.js";
import { EventListener, EventSignal,  Events } from "scripts/yoni/event.js";
import { printError } from "scripts/yoni/util/console.js";

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
