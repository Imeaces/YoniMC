import { YoniEntity } from "yoni/entity.js";
import { EventListener, EventSignal, EventTriggerBuilder } from "yoni/event.js";
import { PlayerEvent } from "./PlayerEvent";
import { VanillaWorld } from "yoni/basis.js";
import { YoniScheduler, Schedule } from "yoni/schedule.js";
import { Location } from "yoni/Location.js";

export class PlayerRespawnEventSignal extends EventSignal {}
export class PlayerRespawnEvent extends PlayerEvent{
    sourceLocation;
    currentLocation;
    constructor(player, coords){
        super(player);
        this.sourceLocation = coords;
        this.currentLocation = this.player.location;
    }
}

const DeadPlayers = new WeakSet();
const DeadPlayerLocationRecords = new WeakMap();

/**
 * @type {number | null}
 */
let eventId0 = null;
const schedule = new Schedule({
    async: false,
    type: Schedule.tickCycleSchedule,
    delay: 0,
    period: 1
}, ()=>{
    let players = Array.from(VanillaWorld.getPlayers());
    if (players.length === 0){
        YoniScheduler.removeSchedule(schedule);
        return;
    }
    players.forEach(player=>{
        if (!DeadPlayers.has(player)){
            return;
        }
        if (YoniEntity.getCurrentHealth(player) > 0){
            let coords = DeadPlayerLocationRecords.get(player);
            DeadPlayers.delete(player);
            DeadPlayerLocationRecords.delete(player);
            trigger.fireEvent(player, coords);
        }
    });
});;

function start(){
    eventId0 = EventListener.register("yonimc:playerDead", (event)=>{
        let player = event.player;
        let location = new Location(player);
        DeadPlayers.add(player);
        DeadPlayerLocationRecords.set(player, location);
        if (!schedule.isQueue()){
            YoniScheduler.addSchedule(schedule);
        }
    });
}

function stop(){
    EventListener.unregister(eventId0);
    YoniScheduler.removeSchedule(schedule);
}

const trigger = new EventTriggerBuilder("yoni:playerRespawn")
    .eventSignalClass(PlayerRespawnEventSignal)
    .eventClass(PlayerRespawnEvent)
    .whenFirstSubscribe(start)
    .whenLastUnsubscribe(stop)
    .build()
    .registerEvent();
