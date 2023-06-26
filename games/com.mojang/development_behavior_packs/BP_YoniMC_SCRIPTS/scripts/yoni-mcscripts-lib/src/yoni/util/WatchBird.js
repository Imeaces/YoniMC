import { SystemEvents } from "../basis.js";

export function WatchBird(){
    if (hasInitiated)
        return;
    
    startWatchBird();
    hasInitiated = true;
}

let hasInitiated = false;
const interruptRecord = [];

function startWatchBird(){
    SystemEvents.beforeWatchdogTerminate.subscribe(listenEvent);
}

function listenEvent(event){
    interruptRecord.unshift(Date.now());
    
    if (interruptRecord.length >= 5){
        interruptRecord.length = 5;
        
        let firstInterruptTime = interruptRecord[4];
        let lastInterruptTime = interruptRecord[0];
        
        if (lastInterruptTime - firstInterruptTime < 60 * 1000)
            return;
    }
    
    event.cancel = true;
}

//兼容
WatchBird();