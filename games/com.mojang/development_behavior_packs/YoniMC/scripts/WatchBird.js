import { SystemEvents } from "yoni/basis.js";
import { EventListener } from "yoni/event.js";

let interruptCount = 0;
let lastTimeMS = 0;
EventListener.register(SystemEvents.beforeWatchdogTerminate, (event) => {
    let currentDateMS = Date.now();
    if (currentDateMS - lastTimeMS > 5000){
        console.warn("interruptCount: "+ (++interruptCount));
        lastTimeMS = currentDateMS;
    }
    event.cancel = true;
});
//这个比狗要温和点