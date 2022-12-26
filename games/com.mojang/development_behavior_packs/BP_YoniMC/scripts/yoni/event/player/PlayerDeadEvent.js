import { EventListener, EventSignal, EventTriggerBuilder } from "../../event.js";
import { PlayerEvent } from "./PlayerEvent.js";
import { YoniEntity } from "../../entity.js";

export class PlayerDeadEvent extends PlayerEvent {
    constructor(player){
        super(player);
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
        }, { entityTypes: ["minecraft:player"] });
        eventId1 = EventListener.register("yoni:playerJoined", (event)=>{
            if (YoniEntity.getCurrentHealth(event.player) === 0){
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
