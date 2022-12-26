import { EventTriggerBuilder, EventSignal, Event } from "../../../event.js";
import { Entity } from "../../../entity.js";

class RaidEventTriggerEvent extends Event {
    #source;
    get source(){
        return this.#source;
    }
    get id(){
        return "minecraft:raid_trigger";
    }
    constructor(source){
        super();
        this.#source = source;
    }
}
class RaidEventTriggerEventSignal extends EventSignal {
}

let eventId = null;
function start(){
    let options;
    try { //兼容1.19.30
        options = new Minecraft.EntityDataDrivenTriggerEventOptions();
    } catch {
        options = {};
    }
    options.entityTypes = ["minecraft:player"];
    options.eventTypes = ["minecraft:trigger_raid"];
    eventId = EventListener.register("minecraft:dataDrivenEntityTriggerEvent", (event)=>{
        if (event.entity.typeId === "minecraft:player")
            trigger.fireEvent(Entity.from(event.entity));
        
    }, options);
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
