import { VanillaEvents }  from "scripts/yoni/basis.js";
import { EventListener } from "scripts/yoni/event.js";
import { printError, getErrorMsg } from "scripts/yoni/util/console.js";
import YoniEntity from "scripts/yoni/entity.js";

export default class ChatCommand {
    static #prefixCmds = new Map();
    getPrefixes(){
        return Array.from(this.#prefixCmds.keys());
    }
    static executeCommand(sender, prefix, rawCommand){
        const parameters = this.getParameters(rawCommand);
        const label = parameters[0];
        const command = prefix + rawCommand;
        this.#invokeCommand(sender, prefix, command, label, parameters.splice(1));
        
    }
    static receiveBeforeChatEvent(event){
        const message = event.message;
        let isCmd = false;
        let prefix = "";
        for (let p of this.#prefixCmds.keys()){
            if (message.startsWith(p)){
                isCmd = true;
                prefix = p;
                if (p !== "")
                    break;
            }
        }
        if (isCmd){
            if (prefix !== "") event.cancel = true;
            this.executeCommand(event.sender, prefix, message.substring(prefix.length));
        }
    }
    
    static registerPrefixCommand(prefix, command, commandExecutor){
        if (this.#prefixCmds.get(prefix) === undefined){
            if (prefix === "")
                console.warn("registering non-prefix command, the message that like command without prefix won't be cancel");
            this.#prefixCmds.set(prefix, new Map());
        }
        this.#prefixCmds.get(prefix).set(command, commandExecutor);
    }
    
    static registerCommand(...args){
        this.registerPrefixCommand('!', ...args);
    }
    
    static unregisterPrefixCommand(prefix, command, commandExecutor){
        if (commandExecutor === null || commandExecutor !== undefined && this.#prefixCmds.get(prefix).get(command) === commandExecutor)
            this.#prefixCmds.get(prefix).delete(command);
            if (this.#prefixCmds.get(prefix).size == 0){
                this.#prefixCmds.delete(prefix);
            }
    }
    
    static unregisterCommand(...args){
        this.unregisterPrefixCommand('!', ...args);
    }
    
    static #invokeCommand(sender, prefix, command, label="", args){
        sender = new YoniEntity(sender);
        let commandExecutor = this.#prefixCmds.get(prefix).get(label);
        try {
            if (commandExecutor?.onCommand instanceof Function){
                commandExecutor.onCommand(sender, command, label, args);
                return;
            } else if (commandExecutor instanceof Function){
                commandExecutor(sender, command, label, args);
                return;
            } else if (prefix !== ""){
                sender.sendMessage("[ChatCommand]: 无法找到命令" + label);
            }
        } catch(err) {
            printError(`[ChatCommand]: 运行命令${label}时发生错误`, err);
            sender.sendMessage(`[ChatCommand]: 运行命令${label}时发生错误 ${getErrorMsg("", err).errMsg}`);
        }
    }
    
    /*
      写的很懒，大体是根据空格分割参数
      如果有反斜杠就忽略特殊符号
      如果有引号就将里边的内容当成一段文字
      参考了bash对单引号（'） 双引号（"） 反斜杠（\） 空格（ ）这四个符号的处理
    */
    static getParameters(commandContent){
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


export { ChatCommand }

EventListener.register(VanillaEvents.beforeChat, (event) => {
    if (event.cancel) return;
    ChatCommand.receiveBeforeChatEvent(event);
});
