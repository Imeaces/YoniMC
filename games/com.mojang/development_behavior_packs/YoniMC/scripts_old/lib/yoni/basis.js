import * as Gametest from "mojang-gametest";
import * as MinecraftGui from "mojang-minecrart-ui";
import * as Minecraft from "mojang-minecraft";

export { Gametest }
export { MinecraftGui }
export { Minecraft }

export const world = Minecraft.world;
export const events = world.events;
export const scoreboard = world.scoreboard;

export function dim(dimid = "overworld"){
  switch (dimid) {
    case -1:
    case "nether":
      return world.getDimension("nether");
    case 1:
    case "the end":
    case "the_end":
      return world.getDimension("the end");
    default:
      return world.getDimension("overworld");
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
  if (typeof runner == "undefined")
    return { StatusCode: StatusCode.fail };
  if (typeof runner.runCommand != "function")
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
    if (err instanceof ReferenceError)
      return { StatusCode: StatusCode.fail };
    else
      return err;
  }
}
