import * as Gametest from "mojang-gametest";
import * as MinecraftGui from "mojang-minecraft-ui";
import * as Minecraft from "mojang-minecraft";

//import * as yoni from "scripts/yoni/util/yoni-lib.js";//仅用作调试

export { Gametest }
export { MinecraftGui }
export { Minecraft }
/*
let ServerAdmin;
let MojangNet;
import("mojang-server-admin")
    .then((m)=>{ ServerAdmin = m })
    .catch();
import("mojang-net")
    .then((m)=>{ MojangNet = m })
    .catch();
export { ServerAdmin }
export { MojangNet }
*/

export const VanillaWorld = Minecraft.world;
export const VanillaEvents = VanillaWorld.events;
export const VanillaScoreboard = VanillaWorld.scoreboard;
export const MinecraftSystem = Minecraft.system;
export const SystemEvents = MinecraftSystem.events;

export class StatusCode {
    static fail = -2147483648;
    static error = -2147483646;
    static success = 0;
}

export function dim(dimid = Minecraft.MinecraftDimensionTypes.overworld){
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
          return VanillaWorld.getDimension(dimid);
      } catch {
          return dim(0);
      }
  }
}

/**
 * 
 * @deprecated - use Command.run() instead
 * @param {String} - command
 * @param {RunnableObject} - 
 * @return {JSON}
 */
export async function runCmd(command = "", commandRunner){
  if (typeof commandRunner == "undefined"){
    try {
      return await dim(0).runCommandAsync(command);
    } catch(err) {
      return err;
    };
  } else {
    try {
      return await commandRunner.runCommandAsync(command);
    } catch(err) {
      return err;
    };
  }
}

/**
 * a simple function to execute command
 * @param {Runner} - a command runner
 * @params {String[]} - 
 * @return {JSON}
 */
export async function execCmd(runner, command, ...args){
  if (runner == null || typeof runner.runCommandAsync != "function")
    return { StatusCode: StatusCode.error };

  args.forEach((arg) => {
    arg = String(arg);
    //arg.replace(/("|\\|\s)/g, "\\$1");
    if (arg.replace(/\"/g, "") != arg)
      arg = arg.replace(/\"/g, "\\\"");
    if (arg.replace(/\s/g, "") != arg)
      arg = "\""+arg+"\"";
    command += "\x20"+arg;
  });
  try {
    return await runner.runCommandAsync(command);
  } catch(err) {
    return JSON.parse(err);
  }
}

