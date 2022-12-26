import { EventListener, EventSignal, EventTypes, EventTriggerBuilder } from "yoni/event.js";
import { EntityEvent } from "./EntityEvent.js";
import { runTask, Minecraft } from "yoni/basis.js";
import { Entity } from "yoni/entity.js";
const { Location, BlockLocation } = Minecraft;

const damageTypesCauseByBlock = new Set()
    .add("lava")
    .add("blockExplosion")
    .add("contact")
    .add("freezing")
    .add("magma");

class EntityDamageEventSignal extends EventSignal {}
class EntityDamageEvent extends EntityEvent {
    damage;
    cause;
    constructor(entity, damage, cause, ...values){
        super(entity);
        this.damage = damage;
        this.cause = cause;
    }
}

class EntityDamageByEntityEventSignal extends EntityDamageEventSignal {}
class EntityDamageByEntityEvent extends EntityDamageEvent {
    damager;
    source;
    isProjectileDamage(){}
    constructor(entity, damage, cause, values){
        let { isProjectileDamage } = values;
        super(entity, damage, cause);
        this.damager = values.damager;
        this.source = values.source;
        this.isProjectileDamage = ()=>{ return isProjectileDamage; };
    }
}

class EntityDamageByBlockEventSignal extends EntityDamageEventSignal {}
class EntityDamageByBlockEvent extends EntityDamageEvent {
    damager;
    constructor(entity, damage, cause, damager){
        super(entity, damage, cause);
        this.damager = damager;
    }
}

const fireEvent = (event)=>{
    let { hurtEntity, damage, cause } = event;
    trigger0.fireEvent(hurtEntity, damage, cause);
};
const fireEventThatTriggerByEntity = (event) => {
    let source, damager;
    const { hurtEntity, cause, damage, damagingEntity, projectile } = event;
    
    source = Entity.from(damagingEntity);
    
    let isProjectileDamage = false;
    if (projectile !== undefined){
        isProjectileDamage = true;
        damager = Entity.from(projectile);
    }
    if (damager === undefined){
        damager = Entity.from(source);
    }
    if (source === undefined){
        source = Entity.from(damager);
    }
    const values = {source,damager,isProjectileDamage};
    trigger1.fireEvent(hurtEntity, damage, cause, values);
};
const fireEventThatTriggerByBlock = (event)=>{
    return; //because not implemented yet.
    let { hurtEvent, damage, cause } = event;
    if (!damageTypesCauseByBlock.has(cause)){
        return;
    }
    let entLoc = hurtEntity.location;
    let blockLoc = new Minecraft.BlockLocation(
        Math.floor(entLoc.x),
        Math.floor(entLoc.y),
        Math.floor(entLoc.z)
    );
    let block = hurtEntity.dimension.getBlock(blockLoc);
    trigger2.fireEvent(hurtEntity, damage, cause, block);
};

let usedEvent = new Set();
let eventIds = [null, null, null];
let registeredTypeCount = 0;

const dealCount = ()=>{
    if (registeredTypeCount === 0){
        eventIds.forEach(k=>(k!==null)?EventListener.unregister(k):0);
    } else {
        if (eventIds[0] === null && usedEvent.has(trigger0)){
            eventIds[0] = EventListener.register("minecraft:entityHurt", (event)=>{
                fireEvent(event);
            });
        }
        if (eventIds[1] === null && usedEvent.has(trigger1)){
            eventIds[1] = EventListener.register("minecraft:entityHurt", (event)=>{
                if ("damagingEntity" in event || "projectile" in event){
                    fireEventThatTriggerByEntity(event);
                }
            });
        }
        if (eventIds[2] === null && usedEvent.has(trigger2)){
            eventIds[2] = EventListener.register("minecraft:entityHurt", (event)=>{
                if (!("damagingEntity" in event) && !("projectile" in event)){
                    fireEventThatTriggerByBlock(event);
                }
            });
        }
        if (eventIds[0] !== null && !usedEvent.has(trigger0)){
            EventListener.unregister(eventIds[0]);
            eventIds[0] = null;
        }
        if (eventIds[1] !== null && !usedEvent.has(trigger1)){
            EventListener.unregister(eventIds[1]);
            eventIds[1] = null;
        }
        if (eventIds[2] !== null && !usedEvent.has(trigger2)){
            EventListener.unregister(eventIds[1]);
            eventIds[2] = null;
        }
    }
};

const trigger0 = new EventTriggerBuilder("yoni:entityDamage")
    .eventSignalClass(EntityDamageEventSignal)
    .eventClass(EntityDamageEvent)
    .whenFirstSubscribe(()=>{
        usedEvent.add(trigger0);
        registeredTypeCount += 1;
        dealCount();
    })
    .whenLastUnsubscribe(()=>{
        usedEvent.delete(trigger0);
        registeredTypeCount -= 1;
        dealCount();
    })
    .build();
const trigger1 = new EventTriggerBuilder("yoni:entityDamageByEntity")
    .eventSignalClass(EntityDamageByEntityEventSignal)
    .eventClass(EntityDamageByEntityEvent)
    .whenFirstSubscribe(()=>{
        usedEvent.add(trigger1);
        registeredTypeCount += 1;
        dealCount();
    })
    .whenLastUnsubscribe(()=>{
        usedEvent.delete(trigger1);
        registeredTypeCount -= 1;
        dealCount();
    })
    .build();
const trigger2 = new EventTriggerBuilder("yoni:entityDamageByBlock")
    .eventSignalClass(EntityDamageByBlockEventSignal)
    .eventClass(EntityDamageByBlockEvent)
    .onSubscribe(()=>{
        //写得差不多了才发现根本做不到
        throw new Error("not implemented yet");
    })
    .whenFirstSubscribe(()=>{
        usedEvent.add(trigger2);
        registeredTypeCount += 1;
        dealCount();
    })
    .whenLastUnsubscribe(()=>{
        usedEvent.delete(trigger2);
        registeredTypeCount -= 1;
        dealCount();
    })
    .build();
    
trigger0.registerEvent();
trigger1.registerEvent();
//trigger2.registerEvent();
