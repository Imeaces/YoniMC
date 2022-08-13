import { dim } from "scripts/lib/yoni/basis.js";
import minecraft from "scripts/lib/yoni/minecraft.js";

//need more ideas


export class TargetSelector {
  selector;
  arguments = [];
  constructor(selector){
    switch(selector){
      case "@c":
      case "@v":
        if (!minecraft.isEducationEdition()){
          throw new Error(); 
        }
      case "@s":
      case "@p":
      case "@r":
      case "@a":
        this.selector = selector;
        break;
      default:
        throw new SyntaxError("Unknown TargetSelector: "+selector);
    }
  }
  addArgument(cond, arg){
    switch(condition){
      case "name":
        this.arguments.push({
          condition: cond,
          argument: arg
        });
        break;
      default:
        this.arguments.push({
          condition: cond,
          argument: arg
        });
    }
  }
}

export default class Command {
  constructor(command){
    if (runCommand("help "+command).statusCode != 0)
      throw new SyntaxError("Unknown command: "+command);
    this.command = command;
  }
  



  static run(cmd){
    runCommand(cmd);
  }
  static execute(runner, command){
    executeCommand(runner, command);
  }
}

function executeCommand(runner, command){
  try {
    return runner.runCommand(command);
  } catch(errorJSON){
    return errorJSON;
  }
}

function runCommand(command){
  return executeCommand(dim(0), command);
}
