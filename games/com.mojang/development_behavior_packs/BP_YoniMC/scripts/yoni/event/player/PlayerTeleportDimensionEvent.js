import { EventSignal, EventTriggerBuilder } from "../../event.js";
import { YoniScheduler, Schedule } from "../../schedule.js";
import { PlayerEvent } from "./PlayerEvent.js";
import { World } from "../../world.js";

export class PlayerTeleportDimensionEvent extends PlayerEvent {
    
    get fromDimension(){
        return super.fromDimension;
    }
    get toDimension(){
        return super.toDimension;
    }
    
    constructor(player, fromDimension, toDimension){
        super(player, { fromDimension, toDimension });
    }
}

export class PlayerTeleportDimensionEventSignal extends EventSignal {}

const PlayerDimRecords = new WeakMap();

const schedule = new Schedule ({
    async: false,
    period: 1,
    delay: 0,
    type: Schedule.tickCycleSchedule
}, ()=>{
    World.getPlayers().forEach((player)=>{
        let oldDim = PlayerDimRecords.get(player);
        let newDim = null;
        if (oldDim === undefined){
            PlayerDimRecords.set(player, player.dimension);
        } else if (oldDim !== player.dimension){
            newDim = player.dimension;
        }
        if (newDim !== null){
            PlayerDimRecords.set(player, newDim);
            trigger.triggerEvent(player, oldDim, newDim);
        }
    });
});

function start(){
    YoniScheduler.addSchedule(schedule);
}

function stop(){
    YoniScheduler.removeSchedule(schedule);
}

const trigger = new EventTriggerBuilder()
    .id("yoni:playerTeleportDimension")
    .eventSignalClass(PlayerTeleportDimensionEventSignal)
    .eventClass(PlayerTeleportDimensionEvent)
    .whenFirstSubscribe(start)
    .whenLastUnsubscribe(stop)
    .build()
    .registerEvent();
    