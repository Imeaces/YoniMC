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

const testIfHasSpecificChar = /(["'])/g;
const testIfHasSpaceChar = /(\s)/g;

export const fetchCmd = async (runner, command)=>{
    if (typeof runner?.runCommandAsync !== "function"){
        return {
            statusCode: StatusCode.error,
            statusMessage: "cannot runCommandAsync"
        };
    }
    let rt;
    try {
        rt = await runner.runCommandAsync(command);
    } catch(err) {
        try {
            rt = JSON.parse(err);
        } catch {
            rt = {
                statusCode: StatusCode.fail,
                statusMessage: String(err)
            }
        }
    }
    return rt;
}

/**
 * a simple function to execute command
 * @param {CommandRunner} - a command runner
 * @param {String} - command
 * @param {String[]} - args
 * @returns {Promise<CommandResult>}
 */
export const fetchCmdParams = async (runner, command, ...args)=>{
    if (args?.length === 1 && Array.isArray(args[0])){
        args = args[0];
    }
    if (args.length !== 0){
        args.forEach((arg) => {
            arg = String(arg);
            if (testIfHasSpecificChar.test(arg)){
                arg = arg.replaceAll(testIfHasSpecificChar, "\\$1");
            }
            if (testIfHasSpaceChar.test(arg)){
                arg = `"${arg}"`;
            }
            command += ` ${arg}`;
        });
    }
    return await fetchCmd(runner, command);
}

/* 测试用代码，可以忽略
class StatusCode {
    static fail = -2147483648;
    static error = -2147483646;
    static success = 0;
}

function logExecCmd(command, ...args){
    const testIfHasSpecificChar = /(["'])/g;
    const testIfHasSpaceChar = /(\s)/g;
    if (args?.length === 1 && Array.isArray(args[0])){
        args = args[0];
    }
    if (args !== undefined){
        args.forEach((arg) => {
            arg = String(arg);
            if (testIfHasSpecificChar.test(arg)){
                arg = arg.replaceAll(testIfHasSpecificChar, "\\$1");
            }
            if (testIfHasSpaceChar.test(arg)){
                arg = `"${arg}"`;
            }
            command += ` ${arg}`;
        });
    }
    console.log(command);
}
*/
