import * as Gametest from "mojang-gametest";
import * as MinecraftGui from "mojang-minecraft-ui";
import * as Minecraft from "mojang-minecraft";

export { Gametest }
export { MinecraftGui }
export { Minecraft }

export const vanillaWorld = Minecraft.world;
export const vanillaEvents = vanillaWorld.events;
export const vanillaScoreboard = vanillaWorld.scoreboard;

export class StatusCode {
    static fail = -1;
    static error = 2;
    static success = 0;
}

export function dim(dimid = "overworld"){
  switch (dimid) {
    case -1:
    case "nether":
      return vanillaWorld.getDimension("nether");
    case 1:
    case "the end":
    case "the_end":
      return vanillaWorld.getDimension("the end");
    default:
      return vanillaWorld.getDimension("overworld");
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
/*
  runner.runCommand("say execCmd..");
  runner.runCommand("say "+command);
  runner.runCommand("say §r"+args);
  try {
    throw new Error();
  } catch (e) {
    runCmd("say §r"+e.stack);
  }
*/
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

