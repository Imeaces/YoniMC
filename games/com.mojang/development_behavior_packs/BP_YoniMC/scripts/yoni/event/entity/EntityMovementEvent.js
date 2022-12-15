import { EventSignal, EventTriggerBuilder } from "yoni/event.js";
import { EntityEvent } from "./EntityEvent.js";
import { YoniEntity } from "yoni/entity.js";
import { Location } from "yoni/Location.js";
import { YoniScheduler, Schedule } from "yoni/schedule.js";

export class EntityMovementEventSignal extends EventSignal {
    subscribe(callback, options){
        super(callback, options);
        if (options != null){
            filtersList.push(options);
        }
    }
}

//这个事件非常卡，我相信你们不会想要使用它的
export class EntityMovementEvent extends EntityEvent {
    #cancelled = false;
    get cancel(){
        return this.#cancelled;
    }
    
    /**
     * 如果取消跨维度移动事件的话，可能会导致游戏崩溃
     */
    set cancel(bool){
        if (this.#cancelled) return;
        if (bool){
            this.#cancelled = true;
            this.entity.teleport(this.from);
        }
    }
    
    get from(){
        return super.from.clone();
    }
    get to(){
        return super.to.clone();
    }
    constructor(entity, from, to, movementKeys){
        super(entity, {from, to, movementKeys});
    }
}

let entityLocationRecords = new WeakMap();

const filtersList = [];

function getTargetEntities(){
    if (filtersList.length === 0){
        return YoniEntity.getLoadedEntities();
    }
    const selectedEntities = [];
    const allEntities = YoniEntity.getLoadedEntities();
    filtersList.forEach(filter => {
        if (filter.entities){
            filter.entities.map(entity => YoniEntity.from(entity))
                .forEach(entity => {
                    selectedEntities.push(entity);
                });
        }
        if (filter.entityTypes){
            allEntities
                .filter(oneEntity => {
                    return filter.entityTypes.includes(oneEntity.typeId);
                })
                .forEach(oneEntity => {
                    selectedEntities.push(oneEntity);
                });
        }
    });
    return Array.from(
        new Set(
            selectedEntities.map(e =>
                Entity.from(e)
            )
        )
    );
}

const schedule = new Schedule ({
    async: false,
    type: Schedule.tickCycleSchedule,
    period: 1,
    delay: 0
}, ()=>{
    for (const entity of getTargetEntities()){
        let oldLoc = entityLocationRecords.get(entity);
        if (oldLoc === undefined){
            entityLocationRecords.set(entity, entity.location);
            continue;
        }
        let newLoc = entity.location;
        if (newLoc.equals(oldLoc)){
            continue;
        }
        let movementKeys = [];
        if (newLoc.x !== oldLoc.x){
            movementKeys.push("x", "location");
        }
        if (newLoc.y !== oldLoc.y){
            movementKeys.push("y", "location");
        }
        if (newLoc.z !== oldLoc.z){
            movementKeys.push("z", "location");
        }
        if (newLoc.rx !== oldLoc.rx){
            movementKeys.push("rx", "rotation");
        }
        if (newLoc.ry !== oldLoc.ry){
            movementKeys.push("ry", "rotation");
        }
        if (newLoc.dimension !== oldLoc.dimension){
            movementKeys.push("x", "y", "z", "rx", "ry", "dimension", "location", "rotation");
        }
        
        movementKeys = new Set(movementKeys);
        movementKeys = Array.from(movementKeys);
        
        trigger.triggerEvent(entity, oldLoc, newLoc, movementKeys);
    }
};

const trigger = new EventTriggerBuilder()
    .id("yoni:entityMovement")
    .eventSignalClass(EntityMovementEventSignal)
    .eventClass(EntityMovementEvent)
    .filterResolver((values, filterValues)=>{
        
        const [entity, from, to, movementKeys] = values;
        
        const filterEntityTypes = filterValues.entityTypes;
        const filterEntitys = filterValues.entities;
        
        if (filterValues.movementKeys != null){
            for (const key of filterValues.movementKeys){
                if ( ! movementKeys.includes(key)){
                    return false;
                }
            }
        }
        
        if (filterValues.entities != null){
            let found = false;
            for (let filterEntity of filterValues.entities){
                if (YoniEntity.isSameEntity(filterEntity, entity)){
                    found = true;
                    break;
                }
            }
            if (!found){
                return false;
            }
        }
        
        if (filterValues.entityTypes != null){
            return filterValues.entityTypes.includes(entity.typeId);
        }
        
        return true;
    })
    .whenFirstSubscribe(()=>{
        YoniScheduler.addSchedule(schedule);
    })
    .whenLastUnsubscribe(()=>{
        YoniScheduler.removeSchedule(schedule);
    })
    .build()
    .registerEvent();
