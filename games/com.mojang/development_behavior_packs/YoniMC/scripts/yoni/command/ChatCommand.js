import { world } from "mojang-minecraft";
let vanillaEvents = world.events;

let schedules = [];

export default class ChatCommand {
    static #prefix = "!";
    static #commands = {};

    get prefix(){
        return prefix;
    }
    static executeCommand(sender, rawCommand){
        const parameters = this.#getParameters(rawCommand);
        const label = parameters[0];
        this.#invokeCommand(sender, rawCommand, label, parameters.splice(1));
        
    }
    static receiveBeforeChatEvent(event){
        const message = event.message;
        if (!message.startsWith(this.#prefix))
            return
        this.executeCommand(event.sender, message.substring(this.#prefix.length));
        event.cancel = true;
        return event;
    }
    
    static registerCommand(command, commandExecutor){
        this.#commands[command] = commandExecutor;
    }
    
    static unregisterCommand(command, commandExecutor){
        if (commandExecutor != undefined && commands[command] === commandExecutor)
            this.#commands[command] = null;
        else if (commandExecutor == undefined)
            this.#commands[command] = null;
    }
    
    static #invokeCommand(sender, rawCommand, command, args){
        let commandExecutor = this.#commands[command];
        if (commandExecutor != null && typeof commandExecutor.onCommand == "function"){
            try {
                commandExecutor.onCommand(sender, rawCommand, command, args);
            } catch(err) {
                console.error("[ChatCommand]: 运行命令" + command + "时发生错误");
                console.error(err.message+"\n"+err.stack);
            }
        } else if (typeof commandExecutor == "function" ) {
            try {
                commandExecutor(sender, rawCommand);
            } catch(err) {
                console.error("[ChatCommand]: 运行命令" + command + "时发生错误");
                console.error(err.message+"\n"+err.stack);
            }
        } else {
            console.error("[ChatCommand]: 无法找到命令" + command);
            //Messager.sendMessage(sender, "没有找到命令 {}", command);
        }
    }
    
    /*
      写的很懒，大体是根据空格分割参数
      如果有反斜杠就忽略特殊符号
      如果有引号就将里边的内容当成一段文字
      参考了bash对单引号（'） 双引号（"） 反斜杠（\） 空格（ ）这四个符号的处理
    */
    static #getParameters(commandContent){
        let args = [];
        let command = "";
        
        let escapeFlag = false;
        let escapeCharacter = "";
        let quoteFlag = false;
        let singleQuoteFlag = false;
        let quoteContent = "";
        let argIndex = 0;
        for (let i = 0; i < commandContent.length ; i++){
            if (args[argIndex] == null) args[argIndex] = "";
            
            let str = commandContent.substr(i, 1);
            //console.log("str: "+str);
            if (str == "\\" &&
                !escapeFlag &&
                !singleQuoteFlag &&
                ( 
                    (quoteFlag && commandContent.substr(i, 2) == "\\\"") ||
                    !quoteFlag
                )
            ) {
                    escapeFlag = true;
                    i += 1;
                    str = commandContent.substr(i, 1);
                    //console.log("escape str: "+str);
            }
            
            if (str == "\"" && !escapeFlag && !singleQuoteFlag){
                //console.log("switching quote, current: "+quoteFlag);
                args[argIndex] += quoteContent;
                quoteContent = "";
                quoteFlag = !quoteFlag;
                    i += 1;
                    str = commandContent.substr(i, 1);
            } else if (str == "'" && !quoteFlag && (singleQuoteFlag || !escapeFlag)) {
                //console.log("switching single quote, current: "+singleQuoteFlag);
                args[argIndex] += quoteContent;
                quoteContent = "";
                singleQuoteFlag = !singleQuoteFlag;
                    i += 1;
                    str = commandContent.substr(i, 1);
            }
            
                //console.log("is quote: "+ quoteFlag);
                //console.log("is escape: "+ escapeFlag);
            if (singleQuoteFlag || 
                (quoteFlag && 
                    (
                        (escapeFlag && str == "\"") ||
                        !escapeFlag)
                )
            ){
                //console.log("detect quote");
                quoteContent += str;
            } else if (str == " " && !escapeFlag){
                //console.log("next arg");
                argIndex ++;
                
            } else {
                args[argIndex] += str;
            }
            
            escapeFlag = false;
        }
        //if (quoteFlag || singleQuoteFlag) console.log("警告：引用未结束");
        let parameters = [];
        for (let arg of args){
            if (arg != "") parameters.push(arg);
        }
        return parameters;
        
    }
}

function runCommandSchedules(schedules){
    while (schedules.length > 0){
        try {
            schedules.shift()();
        } catch(e) {
        }
    }
}

vanillaEvents.beforeChat.subscribe((event) => {
    ChatCommand.receiveBeforeChatEvent(event);
});
vanillaEvents.tick.subscribe(() => runCommandSchedules(schedules));
