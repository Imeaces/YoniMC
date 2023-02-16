import { World } from "../../world.js";
import { YoniScheduler } from "../../schedule.js";
import { PlayerEvent } from "./PlayerEvent.js";
import { EventTriggerBuilder, EventListener, EventSignal } from "../../event.js";
import { Player } from "yoni/entity.js";

export class PlayerDeadEvent extends PlayerEvent {
    constructor(player: Player){
        super(player);
    }
}
export class PlayerDeadEventSignal extends EventSignal {}

let eventId0 : number;
let eventId1 : number;

const deadPlayers = new WeakSet<Player>();

const trigger = new EventTriggerBuilder()
    .id("yoni:playerDead")
    .eventSignalClass(PlayerDeadEventSignal)
    .eventClass(PlayerDeadEvent)
    .whenFirstSubscribe(() => {
        eventId0 = YoniScheduler.runCycleTickTask(() => {
            let alivePlayers = Array.from(
                World.selectEntities({ type: "minecraft:player" })
            );

            let allPlayers = World.getAllPlayers();

            for (let player of allPlayers) {
                if (alivePlayers.includes(player)) {
                    deadPlayers.delete(player);
                    continue;
                } else if (deadPlayers.has(player)) {
                    continue;
                }

                deadPlayers.add(player);

                trigger.triggerEvent(player);
            }
        }, 0, 1);
        eventId1 = EventListener.register("yoni:playerJoined", (event: PlayerEvent) => {
            if (event.player.getCurrentHealth() <= 0) {
                deadPlayers.add(event.player);
            }
        });
    })
    .whenLastUnsubscribe(() => {
        YoniScheduler.removeSchedule(eventId0);
        EventListener.unregister(eventId1);
    })
    .build()
    .registerEvent();
