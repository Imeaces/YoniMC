// @ts-nocheck
import { Minecraft } from "./modules/Minecraft.js";
export { Minecraft }

export { MinecraftGui } from "./modules/MinecraftGui.js";
export { Gametest } from "./modules/Gametest.js";

export const VanillaWorld: Minecraft.World = Minecraft.world;
export const VanillaEvents: Minecraft.Events = VanillaWorld.events;
export const VanillaScoreboard: Minecraft.Scoreboard = VanillaWorld.scoreboard;
export const MinecraftSystem: Minecraft.System = Minecraft.system;
export const SystemEvents: Minecraft.SystemEvents = MinecraftSystem.events;

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

/**
 * 返回一个维度对象
 * @param dimid - something means a dimension
 * @returns dimension object
 */
function dim(dimid: string|Minecraft.Dimension|number = 0): Minecraft.Dimension{
    if (dimid instanceof Minecraft.Dimension) return dimid;
    switch (dimid) {
        case 0:
        case "overworld":
        case Minecraft.MinecraftDimensionTypes.overworld:
            return VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.overworld);
        case -1:
        case "nether":
        case Minecraft.MinecraftDimensionTypes.nether:
            return VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.nether);
        case 1:
        case "the end":
        case "theEnd":
        case "the_end":
        case Minecraft.MinecraftDimensionTypes.theEnd:
            return VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.theEnd);
        default:
            try {
                return VanillaWorld.getDimension(dimid);
            } catch {
                return dim(0);
            }
    }
}

/*
 * 主世界
 * @type {Minecraft.Dimension}
 */
dim.overworld = dim(0);

/*
 * 末地
 * @type {Minecraft.Dimension}
 */
dim.theEnd = dim(1);

/*
 * 下界
 * @type {Minecraft.Dimension}
 */
dim.nether = dim(-1);

export { dim };
