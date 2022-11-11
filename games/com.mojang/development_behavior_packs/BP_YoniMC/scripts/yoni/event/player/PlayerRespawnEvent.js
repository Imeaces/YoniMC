import { YoniEntity } from "yoni/entity.js";
import { EventListener, EventSignal, Event, EventTriggerBuilder } from "yoni/event.js";
import { PlayerEvent } from "./PlayerEvent";
import { World } from "yoni/world.js";
import { YoniScheduler } from "yoni/schedule.js";

class PlayerRespawnEventSignal extends EventSignal {}
class PlayerRespawnEvent extends PlayerEvent{
    sourceLocation;
    currentLocation;
    constructor(player, coords){
        super(player);
        this.sourceLocation = {
            dimension: coords.dimension,
            x: coords.location.x,
            y: coords.location.y,
            z: coords.location.z,
            rx: coords.rotation.x,
            ry: coords.rotation.y
        };
        this.currentLocation = {
            dimension: player.dimension,
            x: player.location.x,
            y: player.location.y,
            z: player.location.z,
            rx: player.rotation.x,
            ry: player.rotation.y
        };
    }
}

let DeadPlayers = new WeakSet();
let DeadPlayerLocationRecords = new WeakMap();

let eventId0 = null;
let schedule = new Schedule({
    async: false,
    type: Schedule.tickCycleSchedule,
    delay: 0,
    period: 1
}, ()=>{
    let players = World.getPlayers();
    if (players.length === 0){
        YoniScheduler.removeSchedule(schedule);
        return;
    }
    players.forEach(player=>{
        if (!DeadPlayers.has(player)){
            return;
        }
        if (player.getCurrentHealth() > 0){
            let coords = DeadPlayerCoordsRecords.get(player);
            DeadPlayers.delete(player);
            DeadPlayerLocationRecords.delete(player);
            trigger.fireEvent(player, coords);
        }
    });
});;

function start(){
    eventId0 = EventListener.register("yonimc:playerDead", (event)=>{
        let player = event.player;
        let coords = {};
        coords.dimension = player.dimension;
        coords.rotation = player.rotation;
        coords.location = (()=>{
            let { x, y, z } = player.location;
            return new Location(x, y, z);
        });
        DeadPlayers.add(player);
        DeadPlayerCoordsRecords.set(player, coords);
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