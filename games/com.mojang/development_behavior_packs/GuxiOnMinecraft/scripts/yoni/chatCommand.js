import { world } from "mojang-minecraft";
import * as mc from "mojang-minecraft";
class ChatCommand {
  static prefix = "!";
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
    this.say("处理命令");
    try {
      const params = this.getParameters(command);
      this.exec(eventData.sender, params);
    } catch(err){
      this.say(`[err]${err}`);
    }
    this.say("处理完毕");
    eventData.cancel = true;
    return eventData;
  }
  static registerCommand(name, func){
  }
  static unregisterCommand(name, func){
  }
  static invokeCommand(name, ...args){
    
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
  
  static exec(runner, params){
    const cmd = params.cmd;
    const args = params.args;
    const arg = params.arg;
    const command = params.command;
    //输出得到的命令参数
    this.say(`[exec]${cmd} ${args}`);
    //执行命令
    switch (cmd){
      case "forMC":
        for (let obj in mc){
          this.say(mc[obj])
        }
        break;
      case "suicide":
        runner.kill();
        break;
      case "say":
        runner.runCommand(`say ${arg}`);
        break;
      case "run":
        runner.runCommand(`${arg}`);
        break;
      case "getEntitiesFromViewVector":
        this.say("执行getEntitiesFromViewVector");
        try {
          this.say("正在获取");
          let ents = runner.getEntitiesFromViewVector();
          for (let e of ents){
            this.say("正在转化");
            let text = JSON.stringify(e);
            this.say(`输出：${text}`);
            this.say(`输出：${e.id}`);
          }
        } catch(err) {
          this.say(`[err]${JSON.stringify(err)}`);
          this.say("执行getEntitiesFromViewVector失败");
        }
        this.say("执行结束");
        break;
      case "eval":
        this.say(`[eval]${arg}`);
        try {
          let result = eval(arg);
          this.say("[eval]执行成功");
          if (typeof result == "undefined"){
            this.say("[eval]没有返回结果");
          } else if (typeof result == "object"){
            this.say("[eval]返回object，尝试转换为json文本");
            this.say(`[eval][result]${JSON.stringify(result)}`);
          } else {
            this.say(`[eval][result]${result}`);
          }
        } catch(err){
          this.say(`[eval][err]${err}`);
        }
        break;
      default:
        if (cmd == ""){
          this.say("没有可以执行的命令");
        } else {
          this.say("未知的命令:" + command);
        }
    }
  }
}
world.events.beforeChat.subscribe(eventData => ChatCommand.beforeChatEvent(eventData));
export { ChatCommand };

/*
[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[Scripting][error]-TypeError: cannot read property 'Symbol.iterator' of undefined    at <anonymous> (scripts/yoni/guxi.js:44)


[UI][error]-UI Control: message_tts_wrapper | ----------------------------------------------------
Unknown properties found in def[label] from namespace[chat]
- Unknown property [color]
- Unknown property [font_scale_factor]
- Unknown property [font_type]
- Unknown property [line_padding]
- Unknown property [localize]
- Unknown property [text]
- Unknown property [text_tts]
----------------------------------------------------


[Scripting][error]-ReferenceError: 'prefix' is not defined    at beforeChatEvent (scripts/yoni/chatCommand.js:10)
    at <anonymous> (scripts/yoni/chatCommand.js)


[Scripting][error]-ReferenceError: 'prefix' is not defined    at beforeChatEvent (scripts/yoni/chatCommand.js:10)
    at <anonymous> (scripts/yoni/chatCommand.js)


[Scripting][error]-ReferenceError: 'prefix' is not defined    at beforeChatEvent (scripts/yoni/chatCommand.js:10)
    at <anonymous> (scripts/yoni/chatCommand.js)


[UI][error]-UI Control: message_tts_wrapper | ----------------------------------------------------
Unknown properties found in def[label] from namespace[chat]
- Unknown property [color]
- Unknown property [font_scale_factor]
- Unknown property [font_type]
- Unknown property [line_padding]
- Unknown property [localize]
- Unknown property [text]
- Unknown property [text_tts]
----------------------------------------------------


[Scripting][error]-ReferenceError: 'prefix' is not defined    at beforeChatEvent (scripts/yoni/chatCommand.js:13)
    at <anonymous> (scripts/yoni/chatCommand.js)


[Scripting][error]-ReferenceError: 'prefix' is not defined    at beforeChatEvent (scripts/yoni/chatCommand.js:13)
    at <anonymous> (scripts/yoni/chatCommand.js)


[UI][error]-UI Control: message_tts_wrapper | ----------------------------------------------------
Unknown properties found in def[label] from namespace[chat]
- Unknown property [color]
- Unknown property [font_scale_factor]
- Unknown property [font_type]
- Unknown property [line_padding]
- Unknown property [localize]
- Unknown property [text]
- Unknown property [text_tts]
----------------------------------------------------


[Scripting][error]-ReferenceError: 'say' is not defined    at beforeChatEvent (scripts/yoni/chatCommand.js:14)
    at <anonymous> (scripts/yoni/chatCommand.js)


[Scripting][error]-ReferenceError: 'say' is not defined    at beforeChatEvent (scripts/yoni/chatCommand.js:14)
    at <anonymous> (scripts/yoni/chatCommand.js)


[UI][error]-UI Control: message_tts_wrapper | ----------------------------------------------------
Unknown properties found in def[label] from namespace[chat]
- Unknown property [color]
- Unknown property [font_scale_factor]
- Unknown property [font_type]
- Unknown property [line_padding]
- Unknown property [localize]
- Unknown property [text]
- Unknown property [text_tts]
----------------------------------------------------


[Scripting][error]-ReferenceError: 'prefix' is not defined    at say (scripts/yoni/chatCommand.js:5)
    at beforeChatEvent (scripts/yoni/chatCommand.js:14)
    at <anonymous> (scripts/yoni/chatCommand.js)


*/