import { SystemEvents } from "../basis.js";

let interruptCount = 0;
let lastTimeMS = 0;
SystemEvents.beforeWatchdogTerminate.subscribe((event) => {
    let currentDateMS = Date.now();
    interruptCount += 1;
    if (currentDateMS - lastTimeMS > 5000){
        console.warn("interruptCount: "+ interruptCount);
        lastTimeMS = currentDateMS;
    }
    event.cancel = true;
});
//这个比狗要温和点