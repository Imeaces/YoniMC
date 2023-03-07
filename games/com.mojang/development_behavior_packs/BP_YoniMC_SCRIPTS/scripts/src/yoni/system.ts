import { MinecraftSystem, runTask } from "./basis.js";
import { YoniScheduler } from "./schedule.js";

class System {
    run(callback: (...args: any[]) => void, ...args: any[]){
        runTask(callback, ...args);
    }
    get events(){
        return MinecraftSystem.events;
    }
    get currentTick(){
        return MinecraftSystem.currentTick
    }
    
    setInterval(callback: () => void, interval: number){
        return YoniScheduler.runCycleTimerTask(callback, interval, interval);
    }
    setTimeout(callback: () => void, timeout: number = 0){
        return YoniScheduler.runDelayTimerTask(callback, timeout);
    }
    setIntervalTick(callback: () => void, intervalTick: number){
        return YoniScheduler.runCycleTickTask(callback, intervalTick, intervalTick);
    }
    setTimeoutTick(callback: () => void, timeoutTick: number){
        return YoniScheduler.runDelayTickTask(callback, timeoutTick);
    }
    clearInterval(id: number){
        return YoniScheduler.removeSchedule(id);
    }
    clearTimeout(id: number){
        return YoniScheduler.removeSchedule(id);
    }
    clearIntervalTick(id: number){
        return YoniScheduler.removeSchedule(id);
    }
    clearTimeoutTick(id: number){
        return YoniScheduler.removeSchedule(id);
    }
}

const system = new System();

export { system };
export default system;
