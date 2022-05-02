import { world } from "mojang-minecraft";

const debug = true;

function LOG(msg = ""){
  if (!debug)
    return
  const cmd = "say § [debug]" + msg;
  world.getDimension("overworld").runCommand(cmd);
}

class ChatCommand {
  static prefix = "!";
  static commands = {};
  static say(msg = "", obj){
    let cmd = "say § [" + this.prefix + "]" + msg;
    world.getDimension("overworld").runCommand(cmd);
  }
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
      this.say(`[err]${err}`);
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
    this.commands[name] = null;
  }
  static invokeCommand(runner, params){
    if (this.commands[params.cmd]){
      try {
        this.commands[params.cmd](runner, params);
      } catch(err){
        say(err);
      }
    } else {
      this.say("未知的命令:" + params.command);
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
