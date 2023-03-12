// @ts-nocheck
import { EventTypes, Event, EventSignal } from "../../event.js";
import { EntityBase } from "../../entity.js";
import { getKeys } from "../../lib/ObjectUtils.js";
import { Minecraft } from "../../basis.js";

class EntityHurtEvent extends Event {
    /*damage;
    cause;
    hurtEntiry;
    damagingEntity;
    damagingProjectile;
    damagingSource;
    */
    constructor(event: Minecraft.EntityHurtEvent){
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
    subscribe(callback: (arg: EntityHurtEvent) => void, options: Minecraft.EntityEventOptions): (arg: EntityHurtEvent) => void {
        let func = (event: any) => {
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
        return callback;
    }
    unsubscribe(callback: (arg: EntityHurtEvent) => void){
        let cab = this.#callbacks.get(callback);
        
        if (cab){
            EventTypes.get("minecraft:entityHurt").unsubscribe(cab);
            this.#callbacks.delete(callback);
        }
    }
}

EventTypes.register("mcyoni:entityHurt", new EntityHurtEventSignal());
