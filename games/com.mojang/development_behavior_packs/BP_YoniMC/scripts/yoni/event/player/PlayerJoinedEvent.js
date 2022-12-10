import { YoniEntity } from "yoni/entity.js";
import { EventListener, EventSignal, Event, EventTriggerBuilder } from "yoni/event.js";
import { PlayerEvent } from "./PlayerEvent";
import { VanillaWorld, runTask } from "yoni/basis.js";
import { YoniScheduler } from "yoni/schedule.js";

class PlayerJoinedEvent extends PlayerEvent {
    constructor(player){
        super(player);
    }
    kickPlayer(){
        this.player.postKick("加入游戏被取消");
    }
}
class PlayerDeadEventSignal extends EventSignal {}

let joiningPlayers = new Set();
let 启用轮询 = false;
let eventId = null;

let ticking = ()=>{
    if (启用轮询){
        runTask(ticking);
    }
    if (joiningPlayers.size === 0){
        return;
    }
    
    [...VanillaWorld.getPlayers()].forEach((pl)=>{
        if (joiningPlayers.has(pl)){
            joiningPlayers.delete(pl);
            signal.triggerEvent(pl);
        }
    });
}
let scheduleId = -1;

const trigger = new EventTriggerBuilder()
    .id("yoni:playerJoined")
    .eventSignalClass(PlayerDeadEventSignal)
    .eventClass(PlayerJoinedEvent)
    .whenFirstSubscribe(()=>{
        启用轮询 = true;
        runTask(ticking);
        eventId = EventListener.register("minecraft:playerJoin", (event)=>{
            joiningPlayers.add(event.player);
        });
    })
    .whenLastUnsubscribe(()=>{
        启用轮询 = false;
        EventListener.unregister(eventId);
    })
    .build()
    .registerEvent();
