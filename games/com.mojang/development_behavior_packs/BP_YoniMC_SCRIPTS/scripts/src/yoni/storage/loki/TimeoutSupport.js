import { YoniScheduler } from "../../schedule.js";

export function setTimeout(func, delay){
    return YoniScheduler.runDelayTimerTask(func, delay, true);
}

export function clearTimeout(id){
    YoniScheduler.removeSchedule(id);
}

export function setInterval(func, interval){
    return YoniScheduler.runCycleTimerTask(func, interval, interval, true);
}

export function clearTimeout(id){
    YoniScheduler.removeSchedule(id);
}
