import { EventTypes, Event, EventSignal } from "../../event.js";
import { EntityBase } from "../../entity.js";
import { Location } from "../../Location.js";
import { Minecraft } from "../../basis.js";

class BeforeItemUseEvent extends Event {
    set cancel(v: boolean){
        this.#event.cancel = !!v;
    }
    #event;
    constructor(event: Minecraft.BeforeItemUseEvent){
        let { item, source } = event;
        super({ item, source: EntityBase.from(source) });
        this.#event = event;
    }
}

class BeforeItemUseEventSignal {
    #callbacks = new WeakMap();
    subscribe(callback: (arg: BeforeItemUseEvent) => void): (arg: BeforeItemUseEvent) => void {
        let func = (event: any) => {
            if (!this.#callbacks.has(callback))
                return;
            event = new BeforeItemUseEvent(event);
            callback(event);
        }
        EventTypes.get("minecraft:beforeItemUse").subscribe(func);
        this.#callbacks.set(callback, func);
        return callback;
    }
    unsubscribe(callback: (arg: BeforeItemUseEvent) => void){
        let cab = this.#callbacks.get(callback);
        
        if (cab){
            EventTypes.get("minecraft:beforeItemUse").unsubscribe(cab);
            this.#callbacks.delete(callback);
        }
    }
}

EventTypes.register("mcyoni:beforeItemUse", new BeforeItemUseEventSignal());
