import { EventListener, EventSignal, EventTypes, EventRemover, EventTriggerBuilder } from "yoni/event.js";
import { EntityEvent } from "./EntityEvent.js";
import { runTask, Minecraft } from "yoni/basis.js";
import { Entity } from "yoni/entity.js";
const Location = Minecraft.Location;

class EntityMovementEventSignal extends EventSignal {}
//这个事件非常卡，我相信你们不会想要使用它的
export class EntityMovementEvent extends EntityEvent {
    isCancelled;
    get cancel(){
        return this.isCancelled();
    }
    
    setCancel;
    /**
     * 如果取消跨维度移动事件的话，可能会导致游戏崩溃
     */
    set cancel(bool){
        this.setCancel(!!bool);
    }
    
    oldLocation;
    
    newLocation;
    
    constructor (values){
        super(values.entity);
        this.isCancelled = values.isCancelled;
        this.setCancel = values.setCancel;
        this.oldLocation = values.oldLocation;
        this.newLocation = values.newLocation;
    }
}

let 启用轮询 = false;
let eventLocationRecords = new WeakMap();

const conditionFunc = ()=>{
    if (启用轮询)
        runTask(conditionFunc);
    else
        return;
    
    Entity.getLoadedEntities().forEach((ent)=>{
        if (ent.dimension === undefined || ent.rotation === undefined || ent.location === undefined) return;
        let hasMove = false;
        let oldLoc = eventLocationRecords.get(ent);
        let newLoc = Object.freeze({
            dimension: ent.dimension,
            location: Object.freeze({
                x: ent.location.x,
                y: ent.location.y,
                z: ent.location.z
            }),
            rotation: Object.freeze({
                x: ent.rotation.x,
                y: ent.rotation.y
            })
        });
        let changedLoc = {
        };
        if (oldLoc === undefined){
            eventLocationRecords.set(ent, newLoc);
            return;
        }
        if (oldLoc.dimension.id !== newLoc.dimension.id){
            hasMove = true;
            changedLoc = newLoc;
        } else {
            if (newLoc.location.x !== oldLoc.location.x){
                hasMove = true;
                if (changedLoc.location === undefined){
                    changedLoc.location = {};
                }
                changedLoc.location.x = newLoc.location.x;
            }
            if (newLoc.location.y !== oldLoc.location.y){
                hasMove = true;
                if (changedLoc.location === undefined){
                    changedLoc.location = {};
                }
                changedLoc.location.y = newLoc.location.y;
            }
            if (newLoc.location.z !== oldLoc.location.z){
                hasMove = true;
                if (changedLoc.location === undefined){
                    changedLoc.location = {};
                }
                changedLoc.location.z = newLoc.location.z;
            }
            if (newLoc.rotation.x !== oldLoc.rotation.x){
                hasMove = true;
                if (changedLoc.rotation === undefined){
                    changedLoc.rotation = {};
                }
                changedLoc.rotation.x = newLoc.rotation.x;
            }
            if (newLoc.rotation.y !== oldLoc.rotation.y){
                hasMove = true;
                if (changedLoc.rotation === undefined){
                    changedLoc.rotation = {};
                }
                changedLoc.rotation.y = newLoc.rotation.y;
            }
        }
        Object.freeze(changedLoc.rotation);
        Object.freeze(changedLoc.location);
        Object.freeze(changedLoc);
        if (hasMove){
            eventLocationRecords.set(ent, newLoc);
            triggerEvent(ent, oldLoc, changedLoc);
        }
    });
};

const triggerEvent = async (entity, oldLoc, changedLoc)=>{
    let cancelled = false;
    let isCancelled = ()=>{
        return cancelled;
    };
    let setCancel = (bool)=>{
        if (bool && !cancelled){
            entity.teleport(oldLoc.location,
                oldLoc.dimension,
                oldLoc.rotation.x,
                oldLoc.rotation.y,
                false
            );
            eventLocationRecords.set(entity, oldLoc);
            cancelled = true;
        }
    }
    let movementFilterKeys = (()=>{
        let keys = [];
        if ("dimension" in changedLoc){
            keys.push("dimension", "rotation", "rx", "ry", "location", "x", "y", "z");
        } else {
            if ("rotation" in changedLoc){
                keys.push("rotation");
                if ("x" in changedLoc.rotation)
                    keys.push("rx");
                if ("y" in changedLoc.rotation)
                    keys.push("ry");
            }
            if ("location" in changedLoc){
                keys.push("location");
                if ("x" in changedLoc.location)
                    keys.push("x");
                if ("y" in changedLoc.location)
                    keys.push("y");
                if ("z" in changedLoc.location)
                    keys.push("z");
            }
        }
        return keys;
    })();
    let entityEventOptionValues = {
        entityType: entity.entityType,
        entity: entity
    }
    trigger.triggerEvent({
        isCancelled,
        setCancel,
        oldLocation: oldLoc,
        newLocation: changedLoc,
        entity,
        filters: {
            movementFilterKeys,
            entityEventOptionValues
        }
    });
};

/*
{
    entities: Entity[],
    entityType: EntityType,
    movementKeyword: [ "x", "y", "z", "rx", "ry", "dimension", "location", "rotation" ]
}
*/
let trigger = new EventTriggerBuilder("yoni:entityMovement")
    .eventSignalClass(EntityMovementEventSignal)
    .eventClass(EntityMovementEvent)
    .filterResolver((values, filters)=>{
        values = values[0];
        filters = filters[0];
        let filterValues = values.filters;
        if (Array.isArray(filters.movementKeyword)){
            let found = false;
            for (let key of filters.movementKeyword){
                if (filterValues.movementFilterKeys.includes(key)){
                    found = true;
                    break;
                }
            }
            if (!found){
                return false;
            }
        }
        if (filters.entities !== undefined){
            let found = false;
            for (let ent of filters.entities){
                if (YoniEntity.isSameEntity(ent, filterValues.entityEventOptionValues.entity)){
                    found = true;
                    break;
                }
            }
            if (!found){
                return false;
            }
        }
        if (filters.entityType !== undefined && filters.entityType !== filterValues.entityEventOptionValues.entityType){
            return false;
        }
        return true;
    })
    .whenFirstSubscribe(()=>{
        启用轮询 = true;
        runTask(conditionFunc);
    })
    .whenLastUnsubscribe(()=>{
        启用轮询 = false;
    })
    .build()
    .registerEvent();
