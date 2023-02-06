export function setTimeout(func, delay){
    return YoniScheduler.runDelayTimerTask(func, delay, false);
}

export function clearTimeout(id){
    YoniScheduler.removeSchedule(id);
}

export function setInterval(func, interval){
    return YoniScheduler.runCycleTimerTask(func, interval, interval, false);
}

export function clearTimeout(id){
    YoniScheduler.removeSchedule(id);
}
