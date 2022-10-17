import { YoniEntity } from "yoni/entity.js";
import { EventListener, EventSignal } from "yoni/event.js";

let eventId;
export class PlayerDeadEvent {
    constructor(player){
        this.player = YoniEntity.from(player);
        Object.freeze(this);
    }
    tryCancel(){}
}

const signal = new EventSignal("yonimc:playerDead", PlayerDeadEvent)
    .register(()=>{
        eventId = EventListener.register("minecraft:entityHurt", (event)=>{
            if (event.hurtEntity.typeId !== "minecraft:player"){
                return;
            }
            if (YoniEntity.getCurrentHealth(event.hurtEntity) === 0){
                signal.triggerEvent(event.hurtEntity);
            }
        }, {type:"minecraft:player"});
    })
    .unregister(()=>{
        EventListener.unregister(eventId);
    })
    .registerEvent();
