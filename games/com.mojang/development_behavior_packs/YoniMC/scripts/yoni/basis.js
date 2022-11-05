import * as Gametest from "@minecraft/server-gametest";
import * as MinecraftGui from "@minecraft/server-ui";
import * as Minecraft from "@minecraft/server";

export { Gametest }
export { MinecraftGui }
export { Minecraft }

export const VanillaWorld = Minecraft.world;
export const VanillaEvents = VanillaWorld.events;
export const VanillaScoreboard = VanillaWorld.scoreboard;
export const MinecraftSystem = Minecraft.system;
export const SystemEvents = MinecraftSystem.events;

export const runTask = (callback)=>{ MinecraftSystem.run(callback); }
export const overworld = VanillaWorld.getDimension(Minecraft.MinecraftDimensionTypes.overworld);

export class StatusCode {
    static fail = -2147483648;
    static error = -2147483646;
    static success = 0;
}

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
