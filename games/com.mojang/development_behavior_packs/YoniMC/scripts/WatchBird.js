import { Minecraft } from "scripts/yoni/basis.js";
import { EventListener } from "scripts/yoni/event.js";

let interruptCount = 0;
let lastTimeMS = 0;
EventListener.register(Minecraft.system.events.beforeWatchdogTerminate, (event) => {
    let currentDateMS = Date.now();
    if (currentDateMS - lastTimeMS > 5000){
        console.warn("interruptCount: "+ (++interruptCount));
        lastTimeMS = currentDateMS;
    }
    event.cancel = true;
});
//这个比狗要温和点