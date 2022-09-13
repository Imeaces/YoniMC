import { EventListener } from "scripts/yoni/event.js";
import { Minecraft, VanillaEvents } from "scripts/yoni/basis.js";

class ScheduleManager {
    static #tickingTerminateCount = 0;
    static #tickingTerminateReason = null;
    static #tickingTerminate = false;
    static #lastTick = -1;
    static #isTicking = false;
    static #tickingScheduleId = -1;
    static #startTickingTime = -1;
    static #nextTasks = {};
    static get isTicking(){
        return this.#isTicking;
    }
    static #schedules = [];
    static createCycleSchedule(callback, delay=-1, cycleCount=-1){
    }
    static createDelaySchedule(callback, delay=1){
    }
    static tick(event){
        if (this.isTicking){
            this.throwTickFailed();
        }
        this.isTicking = true;
        this.#startTickingTime = Date.now();
        this.tickSchedule(event.currentTick);
        let timeUsed = Date.now() - this.#startTickingTime;
        if (timeUsed < 40){
            this.generateNextTasks();
        }
        this.isTicking = false;
    }
    static beforeTerminate(event){
        if (this.#isTicking && this.#tickingTerminateCount < 5){
            this.#tickingTerminateCount ++;
            event.cancel = true;
            this.#tickingTerminate = true;
            this.#tickingTerminateReason = event.terminateReason;
        }
    }
}

class Schedule {
    #callback;
    constructor(callback){
        this.#callback = callback;
    }
    run(...args){
        this.#callback(...args);
    }
}

EventListener.register(Minecraft.system.events.beforeWatchdogTerminate, (...args)=>ScheduleManager.beforeTerminate
EventListener.register(VanillaEvents.tick, (...args)=> ScheduleManager.tick(...args));

export default Schedule;
export {
    Schedule,
    ScheduleManager
}