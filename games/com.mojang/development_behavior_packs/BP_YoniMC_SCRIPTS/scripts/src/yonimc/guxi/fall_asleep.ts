// @ts-nocheck
import { YoniScheduler, World, Player } from "yoni-mcscripts-lib";

let sleep_death_timer = new WeakMap<Player, number>();

YoniScheduler.runCycleTickTask(()=>{
    for (let _ of World.getPlayers({ families: ["guxi"]})){
        let gpl: Player = _;
        if (!sleep_death_timer.has(gpl)
        && gpl.hasTag("flag:status.is_sleeping")
        ){
            gpl.sendMessage("§4#不要睡过去");
            let sid = YoniScheduler.runDelayTickTask(()=>{
                gpl.sendMessage("#失去意识，能量停止活跃");
                if (gpl.gamemode !== "creative")
                    gpl.kill();
            }, 90, false);
            sleep_death_timer.set(gpl, sid);
        } else if (sleep_death_timer.has(gpl)
        && ! gpl.hasTag("flag:status.is_sleeping")
        ){
            let sid = sleep_death_timer.get(gpl);
            YoniScheduler.removeSchedule(sid);
            sleep_death_timer.delete(gpl);
        }
    }
}, 5, 5, false);
