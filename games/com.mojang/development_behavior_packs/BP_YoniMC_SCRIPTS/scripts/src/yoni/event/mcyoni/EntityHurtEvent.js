import { EventTypes, Event, EventSignal } from "../../event.js";
import { EntityBase } from "../../entity.js";
import { getKeys } from "../../lib/ObjectUtils.js";

class EntityHurtEvent extends Event {
    /*damage;
    cause;
    hurtEntiry;
    damagingEntity;
    damagingProjectile;
    damagingSource;
    */
    constructor(event){
        let { damage, hurtEntity, damageSource } = event;
        
        let { cause, damagingEntity, damagingProjectile } = damageSource;
        
        hurtEntity = EntityBase.from(hurtEntity) ?? undefined;
        damagingEntity = EntityBase.from(damagingEntity) ?? undefined;
        damagingProjectile = EntityBase.from(damagingProjectile) ?? undefined;
        
        super({ damage, cause, hurtEntity, damagingEntity, damagingProjectile,
            damageSource: { cause, damagingEntity, damagingProjectile }
        });
    }
}

class EntityHurtEventSignal {
    #callbacks = new WeakMap();
    subscribe(callback, options){
        let func = (event) => {
            if (!this.#callbacks.has(callback))
                return;
            event = new EntityHurtEvent(event);
            callback(event);
        }
        let vanillaSignal = EventTypes.get("minecraft:entityHurt");
        if (options)
            vanillaSignal.subscribe(func, options);
        else
            vanillaSignal.subscribe(func);
        this.#callbacks.set(callback, func);
    }
    unsubscribe(callback){
        let cab = this.#callbacks.get(callback);
        
        if (cab){
            EventTypes.get("minecraft:entityHurt").unsubscribe(cab);
            this.#callbacks.delete(callback);
        }
    }
}

EventTypes.register("mcyoni:entityHurt", new EntityHurtEventSignal());
