import EntityBase from "yoni-mcscripts-lib";
import { EventTriggerBuilder, EventSignal } from "yoni-mcscripts-lib";
import { Scoreboard } from "yoni-mcscripts-lib";
class HotbarChangedEvent {
    constructor(player, currentSlot, lastSlot) {
        this.player = player;
        this.currentSlot = currentSlot;
        this.lastSlot = lastSlot;
        Object.freeze(this);
    }
}
let lastSlotMap = new WeakMap();
let shouldRun = false;
let trigger = new EventTriggerBuilder("guxi:guxiHotbarChanged")
    .eventClass(HotbarChangedEvent)
    .eventSignalClass(class GuxiHotbarChangedEventSignal extends EventSignal {
})
    .whenFirstSubscribe(() => {
    shouldRun = true;
    runTask(doHotbarCtrl);
})
    .whenLastUnsubscribe(() => {
    shouldRun = false;
})
    .build()
    .registerEvent();
function getLastSlots(player) {
    if (!lastSlotsMap.has(player)) {
        lastSlotsMap.set(player, []);
    }
    return lastSlotsMap.get(player);
}
function doHotbarCtrl() {
    if (!shouldRun)
        return;
    runTask(doHotbarCtrl);
    Scoreboard.getObjective("guxi:hotbar_ctrl", true);
    guxiPlayers = EntityBase.getAliveEntities({
        families: ["guxi"],
        type: "minecraft:player",
        scoreOptions: [
            {
                minScore: 0,
                maxScore: 0,
                exclude: true,
                objective: "guxi:hotbar_ctrl"
            }
        ]
    });
    guxiPlayers.forEach(player => {
        if (lastSlotMap.has(player)) {
            let slot = lastSlotMap.get(player);
            if (player.selectedSlot !== slot) {
                lastSlotMap.set(player, player.selectedSlot);
                trigger.triggerEvent(player, player.selectedSlot, slot);
            }
        }
        else {
            lastSlotMap.set(player, player.selectedSlot);
        }
    });
}
