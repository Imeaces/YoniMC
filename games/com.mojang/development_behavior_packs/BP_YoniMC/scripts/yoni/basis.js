import * as Gametest from "@minecraft/server-gametest";
import * as MinecraftGui from "@minecraft/server-ui";
import * as Minecraft from "@minecraft/server";

export { Gametest }
export { MinecraftGui }
export { Minecraft }

/**
 * @see {@link Minecraft.world}
 */
export const VanillaWorld = Minecraft.world;
/**
 * @see {@link Minecraft.world.events}
 */
export const VanillaEvents = VanillaWorld.events;
/**
 * @see {@link Minecraft.world.scoreboard}
 */
export const VanillaScoreboard = VanillaWorld.scoreboard;
/**
 * @see {@link Minecraft.system}
 */
export const MinecraftSystem = Minecraft.system;
/**
 * @see {@link Minecraft.system.events}
 */
export const SystemEvents = MinecraftSystem.events;

/**
 * @param {()=> void} callback 
 */
export const runTask = (callback) => { MinecraftSystem.run(callback); }

/**
 * overworld dimension
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
 * 
 * @param {string|Minecraft.Dimension|number} dimid - something means a dimension
 * @returns {Minecraft.Dimension} dimension objective
 */
function dim(dimid = Minecraft.MinecraftDimensionTypes.overworld){
  switch (dimid) {
    case -1:
    case "nether":
      return VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.nether);
    case 1:
    case "the end":
    case "the_end":
    case "theEnd":
      return VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.theEnd);
    case 0:
    case "overworld":
       return VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.overworld);
    default:
      try {
          return VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes[dimid]);
      } catch {
          return dim(0);
      }
  }
}
dim.overworld = dim(0);
dim.theEnd = dim(1);
dim.nether = dim(-1);
export { dim };
