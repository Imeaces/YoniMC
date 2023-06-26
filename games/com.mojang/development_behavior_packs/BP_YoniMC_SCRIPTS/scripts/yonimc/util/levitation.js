import { YoniScheduler, Schedule } from "yoni-mcscripts-lib";
import { World } from "yoni-mcscripts-lib";
import { Minecraft } from "yoni-mcscripts-lib";
const { MinecraftEffectTypes } = Minecraft;
YoniScheduler.addSchedule(new Schedule({
    async: false,
    type: Schedule.tickCycleSchedule,
    delay: parseInt(10 * Math.random()),
    period: 10
}, () => {
    World.getPlayers().forEach((player) => {
        if (player.selectedSlot !== 8)
            return;
        if (player.rotation.x <= -85) {
            //Command.execute(player, "effect @s levitation 1 8 true");
            player.addEffect(MinecraftEffectTypes.levitation, 17, 8, true);
        }
        if (player.rotation.x >= 88) {
            //Command.execute(player, "effect @s slow_falling 1 0 true");
            player.addEffect(MinecraftEffectTypes.slowFalling, 17, 0, true);
        }
    });
}));
