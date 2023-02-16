import { MinecraftSystem, VanillaEvents, runTask, Minecraft } from "./basis.js";
import { assignAllPropertiesWithoutOverride } from "./lib/ObjectUtils.js";

interface SystemClass {
    run(func: () => void): void;
    currentTick: number;
    events: Minecraft.SystemEvents;
}

// @ts-ignore
const system: SystemClass = {};

assignAllPropertiesWithoutOverride(system, MinecraftSystem);

if (!system.currentTick){
    let currentTick = -1;
    VanillaEvents.tick.subscribe((event)=>{
        currentTick = event.currentTick;
    });
    Object.defineProperties(system, {
        currentTick: {
            configurable: true,
            get(){
                return currentTick;
            },
        }
    });
}

if (!system.run){
    Object.defineProperties(system, {
        run: {
            configurable: true,
            value: runTask
        },
    });
}

export { system };
export default system;
