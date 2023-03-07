import { EventTypes, Event, EventSignal } from "../../event.js";
import { EntityBase } from "../../entity.js";
import { Location } from "../../Location.js";

class BeforeItemUseEvent extends Event {
    set cancel(v){
        this.#event.cancel = !!v;
    }
    #event;
    constructor(event){
        let { item, source } = event;
        super({ item, source: EntityBase.from(source) });
        this.#event = event;
    }
}

class BeforeItemUseEventSignal {
    #callbacks = new WeakMap();
    subscribe(callback){
        let func = (event) => {
            if (!this.#callbacks.has(callback))
                return;
            event = new BeforeItemUseOnEvent(event);
            callback(event);
        }
        EventTypes.get("minecraft:beforeItemUse").subscribe(func);
        this.#callbacks.set(callback, func);
    }
    unsubscribe(callback){
        let cab = this.#callbacks.get(callback);
        
        if (cab){
            EventTypes.get("minecraft:beforeItemUse").unsubscribe(cab);
            this.#callbacks.delete(callback);
        }
    }
}

EventTypes.register("mcyoni:beforeItemUse", new BeforeItemUseEventSignal());
