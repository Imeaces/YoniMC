import { EventTypes, Event, EventSignal } from "../../event.js";
import { EntityBase } from "../../entity.js";
import { Location } from "../../Location.js";

class BeforeItemUseOnEvent extends Event {
    get blockLocation(){
        return this.#blockLocation
    }
    getBlockLocation(){
        return this.blockLocation.clone();
    }
    #blockLocation;
    set cancel(v){
        this.#event.cancel = !!v;
    }
    #event;
    constructor(event){
        let { blockFace, faceLocationX, faceLocationY, item, source } = event;
        super({ blockFace, faceLocationX, faceLocationY, item, source: EntityBase.from(source) });
        this.#event = event;
        let dimension = source.dimension;
        let location = Location.createReadonly(dimension, event.getBlockLocation());
        this.#blockLocation = location;
    }
}

class BeforeItemUseOnEventSignal {
    #callbacks = new WeakMap();
    subscribe(callback){
        let func = (event) => {
            if (!this.#callbacks.has(callback))
                return;
            event = new BeforeItemUseOnEvent(event);
            callback(event);
        }
        EventTypes.get("minecraft:beforeItemUseOn").subscribe(func);
        this.#callbacks.set(callback, func);
    }
    unsubscribe(callback){
        let cab = this.#callbacks.get(callback);
        
        if (cab){
            EventTypes.get("minecraft:beforeItemUseOn").unsubscribe(cab);
            this.#callbacks.delete(callback);
        }
    }
}

EventTypes.register("mcyoni:beforeItemUseOn", new BeforeItemUseOnEventSignal());
