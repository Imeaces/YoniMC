import { Minecraft } from "./modules/Minecraft.js";
export { Minecraft }

export { MinecraftGui } from "./modules/MinecraftGui.js";
export { Gametest } from "./modules/Gametest.js";

/**
 * @borrows Minecraft.world as VanillaWorld
 */
export const VanillaWorld = Minecraft.world;
/**
 * @borrows Minecraft.world.events as VanillaEvents
 */
export const VanillaEvents = VanillaWorld.events;
/**
 * @borrows Minecraft.world.scoreboard as VanillaScoreboard
 */
export const VanillaScoreboard = VanillaWorld.scoreboard;
/**
 * @borrows Minecraft.system as MinecraftSystem
 */
export const MinecraftSystem = Minecraft.system;
/**
 * @borrows Minecraft.system.events as SystemEvents
 */
export const SystemEvents = MinecraftSystem.events;

/**
 * @param {(...args) => void} callback 
 * @param {...any} args
 */
export const runTask = (callback, ...args) => {
    if (MinecraftSystem.run){
        MinecraftSystem.run(callback, ...args);
    } else {
        const runTask = ()=>{
            VanillaEvents.tick.unsubscribe(runTask);
            callback(...args);
        };
        VanillaEvents.tick.subscribe(runTask);
    }
}

/**
 * overworld dimension
 * @type {Minecraft.Dimension}
 */
export const overworld = VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.overworld);

/**
 * a type contains a set of statusCode
 */
export class StatusCode {
    static fail = -2147483648;
    static error = -2147483646;
    static success = 0;
}

/**
 * 返回一个维度对象
 * @param {string|Minecraft.Dimension|number} dimid - something means a dimension
 * @returns {Minecraft.Dimension} dimension objective
 */
let dim = (dimid = 0) => {
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
