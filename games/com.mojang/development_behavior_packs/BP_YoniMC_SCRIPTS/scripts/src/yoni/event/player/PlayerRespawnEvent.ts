import { Player } from "../../entity.js";
import { EventListener, EventSignal, EventTriggerBuilder } from "../../event.js";
import { PlayerEvent } from "./PlayerEvent";
import { YoniScheduler, Schedule } from "../../schedule.js";
import { Location } from "../../Location.js";
import { PlayerDeadEvent } from "./PlayerDeadEvent.js";
import { World } from "../../world.js";

export class PlayerRespawnEventSignal extends EventSignal {}
export class PlayerRespawnEvent extends PlayerEvent {
    sourceLocation: Location;
    currentLocation: Location;
    constructor(player: Player, coords: Location){
        super(player);
        this.sourceLocation = coords;
        this.currentLocation = this.player.location;
    }
}

const DeadPlayers = new WeakSet();
const DeadPlayerLocationRecords = new WeakMap();

/**
 * @type {number}
 */
let eventId0: number;

const schedule = new Schedule({
    async: false,
    type: Schedule.tickCycleSchedule,
    delay: 0,
    period: 1
}, ()=>{
    let players: Player[] = Array.from(World.getPlayers());
    if (players.length === 0){
        YoniScheduler.removeSchedule(schedule);
        return;
    }
    players.forEach(player=>{
        if (!DeadPlayers.has(player)){
            return;
        }
        if (player.getCurrentHealth() > 0){
            let location = DeadPlayerLocationRecords.get(player);
            DeadPlayers.delete(player);
            DeadPlayerLocationRecords.delete(player);
            trigger.fireEvent(player, location);
        }
    });
});;

function start(){
    eventId0 = EventListener.register("yoni:playerDead", (event: PlayerDeadEvent) => {
        let player = event.player;
        let location = player.location;
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
