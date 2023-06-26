import { EventSignal, EventTriggerBuilder } from "../../event.js";
import { EntityEvent } from "./EntityEvent.js";
import { EntityValue } from "../../entity/EntityTypeDefs.js";
import { EntityBase } from "../../entity.js";
import { YoniEntity } from "../../entity.js";
import { Location } from "../../Location.js";
import { YoniScheduler, Schedule } from "../../schedule.js";
import { World } from "../../world.js";
import { logger } from "../logger.js";

export class EntityMovementEventSignal extends EventSignal {
    static warnEventAbuse = (function (){
        let hasBeenWarned = false;
        return function warnEventAbuse(){
            if (hasBeenWarned)
                return;
            
            hasBeenWarned = true;
            logger.warning("[EntityMovementEventSignal] 不加筛选的监听所有实体的移动可能带来严重的性能问题");
        }
    })();
    subscribe(callback: (arg: EntityMovementEvent) => void, options?: EntityMovementEventOption){
        super.subscribe(callback, options);
        if (options == null){
            EntityMovementEventSignal.warnEventAbuse();
        }
        
        filters.set(callback, options ?? null);
        
        return callback;
    }
    unsubscribe(callback: (arg: EntityMovementEvent) => void){
        super.unsubscribe(callback);
        filters.delete(callback);
        return callback;
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
        return this.#from.clone();
    }
    get to(){
        return this.#to.clone();
    }
    get movementKeys(){
        return this.#movementKeys.slice(0);
    }
    constructor(entity: YoniEntity, from: Location, to: Location, movementKeys: MovementKey[]){
        super(entity);
        this.#from = from;
        this.#to = to;
        this.#movementKeys = movementKeys;
    }
    #movementKeys;
    #to;
    #from;
}

let entityLocationRecords = new WeakMap<YoniEntity, Location>();

const filters: Map<any, null | EntityMovementEventOption> = new Map();

type MovementKey = "dimension" | "x" | "y" | "z" | "location" | "rx" | "ry" | "rotation";
interface EntityMovementEventOption {
    entities?: EntityValue[];
    entityTypes?: string[];
    movementKeys?: MovementKey[];
}

function getFilters(){
    return new Set(filters.values());
}

function getTargetEntities(): Iterable<YoniEntity> {
    const filters = getFilters();
    if (filters.size === 0
    || filters.has(null)){
        return World.getLoadedEntities();
    }
    
    const targets: YoniEntity[] = [];
    const typedEntities: Map<string, YoniEntity[]> = new Map();
    
    
    for (const filter of filters){
        if (!filter) continue; // impossible unless you are cheating
        
        if (filter.entities){
            targets.push(
                ...Array.from(filter.entities)
                    .map(function toYoniEntity(entity){
                        return EntityBase.from(filter.entities);
                    })
                    .filter(v => v != null) as YoniEntity[]
            );
        }
        if (filter.entityTypes){
            for (const entityType of Array.from(filter.entityTypes)){
                if (typedEntities.has(entityType))
                    continue;
                typedEntities.set(entityType, Array.from(
                    World.selectEntities({
                        type: entityType
                    })
                ));
            }
        }
    }
    
    return new Set(targets.concat(Array.from(typedEntities.values()).flat())); //as unknown as Iterable<YoniEntity>;
}

const schedule = new Schedule ({
    async: false,
    type: Schedule.tickCycleSchedule,
    period: 1,
    delay: 0
}, function compareTargetsLocation(){
    for (const entity of getTargetEntities()){
        
        // not location record, save and continue next
        let oldLoc = entityLocationRecords.get(entity);
        if (oldLoc === undefined){
            entityLocationRecords.set(entity, entity.location);
            continue;
        }
        
        let newLoc = entity.location;
        
        // generate movement status keys
        let movementKeys: MovementKey[] = [];
        if (newLoc.dimension !== oldLoc.dimension){
            movementKeys.push("x", "y", "z", "rx", "ry", "dimension", "location", "rotation");
        } else {
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
        }
        
        // no difference, continue next
        if (movementKeys.length === 0){
            continue;
        }
        
        // save new location
        entityLocationRecords.set(entity, newLoc);
        
        // remove duplication
        movementKeys = Array.from(new Set(movementKeys));
        
        // trigger event
        trigger.triggerEvent(entity, oldLoc, newLoc, movementKeys);
    }
});

function resolveFilter(
    values: [YoniEntity, Location, Location, MovementKey[]],
    filterValues: EntityMovementEventOption): boolean
{
    const [entity, from, to, movementKeys] = values;
    
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
            if (EntityBase.isSameEntity(filterEntity, entity)){
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
}

const trigger = new EventTriggerBuilder()
    .id("yoni:entityMovement")
    .eventSignalClass(EntityMovementEventSignal)
    .eventClass(EntityMovementEvent)
    .filterResolver(resolveFilter)
    .whenFirstSubscribe(()=>{
        YoniScheduler.addSchedule(schedule);
    })
    .whenLastUnsubscribe(()=>{
        YoniScheduler.removeSchedule(schedule);
    })
    .build()
    .registerEvent();
