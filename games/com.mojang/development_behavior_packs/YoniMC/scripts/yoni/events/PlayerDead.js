import { VanillaWorld } from "scripts/yoni/basis.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { EventListener } from "scripts/yoni/event.js";

let eventId;
export class PlayerDeadEvent {
    constructor(player){
        this.player = player;
        Object.freeze(this);
    }
}

const signal = new EventSignal("yonimc:playerDead", PlayerDeadEvent);

signal.register(()={
        eventId = EventListener.register("minecraft:entityHurt", (event)=>{
            if (event.hurtEntity.getComponent("minecraft:health").current === 0)
                signal.triggerEvent(event.hurtingEntity);
        }, {type:"minecraft:player"});
    })
    .unregister(()=>{
        EventListener.unregister(eventId);
    })
    .registerEvent();
