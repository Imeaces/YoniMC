import YoniEntity from "yoni/entity.js";
import { EventListener, EventSignal } from "yoni/event.js";
import { Scoreboard } from "yoni/scoreboard.js";
class HotbarChangedEvent{
    constructor(player, currentSlot, lastSlot){
        this.player = player;
        this.currentSlot = currentSlot;
        this.lastSlot = lastSlot;
        Object.freeze(this);
    }
}

let lastSlotMap = new WeakMap();
let shouldRun = false;

let signal = EventSignal.builder("guxi:guxiHotbarChanged")
    .eventClass(HotbarChangedEvent)
    .build()
    .whenFirstSubscribe(()=>{
        shouldRun = true;
        runTask(doHotbarCtrl);
    })
    .whenLastUnsubscribe(()=>{
        shouldRun = false;
    })
    .registerEvent();

function getLastSlots(player){
    if (!lastSlotsMap.has(player)){
        lastSlotsMap.set(player, []);
    }
    return lastSlotsMap.get(player);
}

function doHotbarCtrl(){
    if (!shouldRun) return;
    runTask(doHotbarCtrl);
    
    Scoreboard.getObjective("guxi:hotbar_ctrl", true);
    
    guxiPlayers = YoniEntity.getAliveEntities({
        families:["guxi"],
        type:"minecraft:player",
        scoreOptions:[
            {
                minScore:0,
                maxScore:0,
                exclude:true,
                objective:"guxi:hotbar_ctrl"
            }
        ]
    });
    guxiPlayers.forEach(player=>{
        if (lastSlotMap.has(player)){
            let slot = lastSlotMap.get(player);
            if (player.selectedSlot !== slot){
                lastSlotMap.set(player, player.selectedSlot);
                signal.triggerEvent(player, player.selectedSlot, slot);
            }
        } else {
            lastSlotMap.set(player, player.selectedSlot);
        }
    });
}