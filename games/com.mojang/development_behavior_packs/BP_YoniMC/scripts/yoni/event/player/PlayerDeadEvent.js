import { YoniEntity } from "yoni/entity.js";
import { EventListener, EventSignal, Event } from "yoni/event.js";

export class PlayerDeadEvent extends Event {
    constructor(player){
        super({ player: YoniEntity.from(player) });
        Object.freeze(this);
    }
    tryCancel(){}
}

let eventId;

const signal = EventSignal.builder("yoni:playerDead")
    .eventClass(PlayerDeadEvent)
    .build()
    .whenFirstSubscribe(()=>{
        eventId = EventListener.register("minecraft:entityHurt", (event)=>{
            if (event.hurtEntity.typeId !== "minecraft:player"){
                return;
            }
            if (YoniEntity.getCurrentHealth(event.hurtEntity) === 0){
                signal.triggerEvent(event.hurtEntity);
            }
        }, {type:"minecraft:player"});
    })
    .whenLastUnsubscribe(()=>{
        EventListener.unregister(eventId);
    })
    .registerEvent()
