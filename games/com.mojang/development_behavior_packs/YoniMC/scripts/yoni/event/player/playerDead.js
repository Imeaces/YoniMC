import { VanillaWorld, dim } from "yoni/basis.js";
import { YoniEntity } from "yoni/entity.js";
import { EventListener, EventSignal,  Events } from "yoni/event.js";
import { printError } from "yoni/util/console.js";

let eventId;
export class PlayerDeadEvent {
    constructor(player){
        this.player = player;
        Object.freeze(this);
    }
}

const signal = new EventSignal("yonimc:playerDead", PlayerDeadEvent)
    .register(()=>{
        eventId = EventListener.register("minecraft:entityHurt", (event)=>{
        console.warn("判定事件中");
            if (event.hurtEntity.getComponent("minecraft:health").current === 0)
                signal.triggerEvent(event.hurtingEntity);
        }, {type:"minecraft:player"});
    })
    .unregister(()=>{
        EventListener.unregister(eventId);
    })
    .registerEvent();
