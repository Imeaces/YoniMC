import { EventTriggerBuilder, EventSignal, Event } from "yoni/event.js";
import { Entity } from "yoni/entity.js";

class RaidEventTriggerEvent extends Event {
    get source(){
        return super.source
    }
    get id(){
        return "minecraft:raid_trigger";
    }
    constructor(source){
        super({source});
    }
}
class RaidEventTriggerEventSignal extends EventSignal {
}

let eventId = null;
function start(){
    eventId = EventListener.register("minecraft:dataDrivenEntityTriggerEvent", (event)=>{
        trigger.fireEvent(Entity.from(event.entity));
        
    }, {
        entityTypes: ["minecraft:player"],
        eventTypes: ["minecraft:trigger_raid"]
    });
}
function stop(){
    EventListener.unregister(eventId);
}

let trigger = new EventTriggerBuilder("yoni:raidEventTrigger")
    .eventSignalClass(RaidEventTriggerEventSignal)
    .eventClass(RaidEventTriggerEvent)
    .whenFirstSubscribe(start)
    .whenLastUnsubscribe(stop)
    .build()
    .registerEvent();
