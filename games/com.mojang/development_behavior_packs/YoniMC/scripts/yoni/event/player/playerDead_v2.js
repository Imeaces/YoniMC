import { VanillaWorld, dim } from "scripts/yoni/basis.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { EventListener, EventSignal,  Events } from "scripts/yoni/event.js";
import { printError } from "scripts/yoni/util/console.js";

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
