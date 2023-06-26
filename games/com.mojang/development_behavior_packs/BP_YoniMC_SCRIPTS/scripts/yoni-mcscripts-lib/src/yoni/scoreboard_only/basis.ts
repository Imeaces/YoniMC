// @ts-nocheck
import { Minecraft } from "./modules/Minecraft.js";
export { Minecraft }
export { Gametest } from "./modules/Gametest.js";

export const VanillaWorld: Minecraft.World = Minecraft.world;
export const VanillaScoreboard: Minecraft.Scoreboard = VanillaWorld.scoreboard;
export const MinecraftSystem: Minecraft.System = Minecraft.system;

/**
 * @param {(...args: any[]) => void} callback 
 * @param {...any} args
 */
export function runTask(callback: (...args: any[]) => void, ...args: any[]){
    if (args.length === 0)
        MinecraftSystem.run(callback);
    else
        MinecraftSystem.run(() => {
            callback(...args);
        });
}

/**
 * overworld dimension
 * @type {Minecraft.Dimension}
 */
export const overworld = VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.overworld);

/**
 * a type contains a set of statusCode
 */
export enum StatusCode {
    fail = -2147483648,
    error = -2147483646,
    success = 0,
}
