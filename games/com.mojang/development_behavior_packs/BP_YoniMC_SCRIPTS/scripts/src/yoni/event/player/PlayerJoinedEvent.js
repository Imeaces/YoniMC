import { EventListener, EventSignal, EventTriggerBuilder } from "../../event.js";
import { PlayerEvent } from "./PlayerEvent.js";
import { VanillaWorld, Minecraft } from "../../basis.js";
import { YoniScheduler, Schedule } from "../../schedule.js";

export class PlayerJoinedEvent extends PlayerEvent {
    constructor(player){
        super(player);
    }
    async kickPlayer(){
        await this.player.kick("加入游戏被取消");
    }
}

export class PlayerJoinedEventSignal extends EventSignal {
}


const joiningPlayers = new Set();
/**
 * @type {number | null}
 */
let eventId = null;

const schedule = new Schedule({
    type: Schedule.tickCycleSchedule,
    async: false,
    delay: 0,
    period: 0
}, () => {
    if (joiningPlayers.size === 0){
        return;
    }
    
    let onlinePlayers = Array.from(VanillaWorld.getPlayers());
    
    joiningPlayers.forEach((plName)=>{
        let pl = onlinePlayers.find(pl => pl.name === plName);
        if (pl != null){
            joiningPlayers.delete(plName);
            trigger.triggerEvent(pl);
        }
    });
});

const trigger = new EventTriggerBuilder()
    .id("yoni:playerJoined")
    .eventSignalClass(PlayerJoinedEventSignal)
    .eventClass(PlayerJoinedEvent)
    .whenFirstSubscribe(()=>{
        YoniScheduler.addSchedule(schedule);
        eventId = EventListener.register("minecraft:playerJoin", (event)=>{
            joiningPlayers.add(event.playerName);
        });
    })
    .whenLastUnsubscribe(()=>{
        YoniScheduler.removeSchedule(schedule);
        EventListener.unregister(eventId);
    })
    .build()
    .registerEvent();
