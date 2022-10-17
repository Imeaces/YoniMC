import { YoniScheduler, Schedule } from "scripts/yoni/schedule.js";
import { World } from "scripts/yoni/world.js";
import { Minecraft } from "scripts/yoni/basis.js";
import { log } from "scripts/yoni/util/Logger.js";
const { MinecraftEffectTypes } = Minecraft;

YoniScheduler.addSchedule(new Schedule ({
    async: false,
    type: Schedule.tickCycleSchedule,
    delay: 4,
    period: 10,
    callback: () => {
        World.getPlayers().forEach((player)=>{
            
            if (player.selectedSlot !== 8) return;
            
            if (player.rotation.x <= -85){
                //Command.execute(player, "effect @s levitation 1 8 true");
                player.addEffect(MinecraftEffectTypes.levitation, 17, 8, true);
            }
            
            if (player.rotation.x >= 88){
                //Command.execute(player, "effect @s slow_falling 1 0 true");
                player.addEffect(MinecraftEffectTypes.slowFalling, 17, 0, true);
            }
        })
    }
    /*
    Command.run("effect @a[rx=-88] levitation 2 8 true");
    Command.run("effect @a[rxm=88] slow_falling 2 0 true");
    */
}));
