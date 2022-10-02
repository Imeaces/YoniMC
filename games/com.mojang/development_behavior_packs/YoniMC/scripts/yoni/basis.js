import * as Gametest from "@minecraft/server-gametest";
import * as MinecraftGui from "@minecraft/server-ui";
import * as Minecraft from "@minecraft/server";

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
    static fail = -1;
    static error = 2;
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
export function runCmd(command = "", commandRunner){
  if (typeof commandRunner == "undefined"){
    try {
      return dim(0).runCommand(command);
    } catch(err) {
      return err;
    };
  } else {
    try {
      return commandRunner.runCommand(command);
    } catch(err) {
      return err;
    };
  }
}

/**
 * a simple function to execute command
 * @deprecated - use Command.execute() instead
 * @param {Runner} - a command runner
 * @params {String[]} - 
 * @return {JSON}
 */
export function execCmd(runner, command, ...args){
  if (runner == null || typeof runner.runCommand != "function")
    return { StatusCode: StatusCode.error };

  args.forEach((arg) => {
    arg = String(arg);
    if (arg.replace(/\"/g, "") != arg)
      arg = arg.replace(/\"/g, "\\\"");
    if (arg.replace(/\s/g, "") != arg)
      arg = "\""+arg+"\"";
    command += "\u0020"+arg;
  });
  try {
    return runner.runCommand(command);
  } catch(err) {
    return JSON.parse(err);
  }
}

