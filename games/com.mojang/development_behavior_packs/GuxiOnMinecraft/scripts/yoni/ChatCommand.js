import { world } from "mojang-minecraft";
import { runCmd, log as LOG } from "../lib/yoni-lib.js";

class ChatCommand {
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
      command = command.toString();
      let split = 0;
      split = command.indexOf(" ");
      if (split == -1){
        cmd = command;
      } else {
        cmd = command.slice(0,split);
        arg = command.slice(split+1);
        split = 0;
        while (true){
          let context = "";
          let index = arg.indexOf(" ",split+1);
          if (index == -1){
            context = arg.slice(split+1);
          } else {
            context = arg.slice(split+1,index);
          }
          if (context.length != 0){
            args.push(context);
          }
          split = arg.indexOf(" ",split+1);
          if (split == -1){
            break;
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
world.events.beforeChat.subscribe(eventData => ChatCommand.beforeChatEvent(eventData));
export { ChatCommand };
