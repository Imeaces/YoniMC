import { world } from "scripts/lib/yoni/basis.js";
import { runCmd, log as LOG } from "../lib/yoni-lib.js";

export default class ChatCommand {
  static prefix = "!";
  static commands = {};
  static beforeChatEvent(eventData){
    const message = eventData.message;
    if (!message.startsWith(this.prefix))
      return //如果不以特定的前缀为开头，则结束
    //如果以特定的前缀开头，将会执行下面的代码
    const command = message.substring(this.prefix.length);
    LOG("处理命令");
    try {
      const params = this.getParameters(command);
      this.invokeCommand(eventData.sender, params);
    } catch(err){
      LOG(`[${this.prefix}]${err}`, "ERROR");
    }
    LOG("处理完毕");
    eventData.cancel = true;
    return eventData;
  }
  static registerCommand(name, func){
    LOG("注册指令" + name);
    this.commands[name] = func;
  }
  static unregisterCommand(name, func){
    LOG("注销命令" + name);
    this.commands[name] = null;
  }
  static invokeCommand(runner, params){
    if (this.commands[params.cmd]){
      try {
        this.commands[params.cmd](runner, params);
      } catch(err){
        LOG(err,"WARN");
      }
    } else {
      try {
        LOG(runner.runCommand(params.command));
      } catch (err){
        LOG(err,"WARN");
      }
    }
  }
  static getParameters(command){
    let cmd = "";
    let arg = "";
    let args = [];
    if (typeof command != "undefined" && command != "" && command != null){
      command = "" + command;
      let mFlag = 0;      // spilt count flag
      let sFlag = false;   // spilt char flag
      let lFlag = false;   // last char flag
      let vFlag = 0;      // valid text count flag
      let splitText = ""; // current spilt str
      let lastSplitText = ""; // last spilt str
      for (let idx = 0; idx < command.length; idx++){
        let char = command[idx];
        sFlag = false;
        if (idx+1 == command.length){
          lFlag = true;
        }
        if (char == " "){
          mFlag ++;
          sFlag = true;
          lastSplitText = splitText;
          if (lastSplitText != ""){
            vFlag ++;
          }
          splitText = "";
        } else {
          splitText += char;
        }
        if (lFlag == true){
          if (mFlag == 0){
            cmd = splitText;
          } else {
            args.push(splitText);
          }
        } else if (sFlag == true){
          if (mFlag == 1){
            cmd = lastSplitText;
            arg = command.slice(idx+1);
          } else if (lastSplitText != ""){
            args.push(lastSplitText);
          }
        }
      }
    }
    return {
      command: command,
      cmd: cmd,
      arg: arg,
      args: args
    };
  }
}

world.events.beforeChat.subscribe((eventData) => ChatCommand.beforeChatEvent(eventData));
