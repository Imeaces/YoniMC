import { YoniEntity } from "yoni/entity.js";
import { EventListener, EventSignal, EventTriggerBuilder } from "yoni/event.js";
import { PlayerEvent } from "./PlayerEvent.js";

export class PlayerDeadEvent extends PlayerEvent {
    constructor(player){
        super(player);
        Object.freeze(this);
    }
}
export class PlayerDeadEventSignal extends EventSignal {}

let eventId0 = null;
let eventId1 = null;

const trigger = new EventTriggerBuilder()
    .id("yoni:playerDead")
    .eventSignalClass(PlayerDeadEventSignal)
    .eventClass(PlayerDeadEvent)
    .whenFirstSubscribe(()=>{
        eventId0 = EventListener.register("minecraft:entityHurt", (event)=>{
            if (event.hurtEntity.typeId !== "minecraft:player"){
                return;
            }
            if (YoniEntity.getCurrentHealth(event.hurtEntity) === 0){
                trigger.triggerEvent(event.hurtEntity);
            }
        }, {type:"minecraft:player"});
        eventId1 = EventListener.register("yoni:playerJoined", (event)=>{
            if (event.player.getCurrentHealth() === 0){
                trigger.triggerEvent(event.player);
            }
        });
    })
    .whenLastUnsubscribe(()=>{
        EventListener.unregister(eventId0);
        EventListener.unregister(eventId1);
    })
    .build()
    .registerEvent();
