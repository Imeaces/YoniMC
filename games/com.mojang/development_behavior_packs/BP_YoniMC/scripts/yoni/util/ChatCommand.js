import { VanillaEvents }  from "yoni/basis.js";
import { EventListener } from "yoni/event.js";
import { YoniEntity } from "yoni/entity.js";
import { Logger } from "yoni/util/Logger.js";

const logger = new Logger("ChatCommand");

const defaultCmdMap = new Map();
const nonPrefixCmdMap = new Map();
const prefixMap = new Map();

let defaultPrefix = "!";

export default class ChatCommand {
    static get defaultPrefix(){
        return defaultPrefix;
    }
    static set defaultPrefix(i){
        if (typeof i === "string" && i.length === 1)
            defaultPrefix = i;
    }
    
    /*static executeCommand(sender, rawCommand){
        const parameters = this.getParameters(rawCommand);
        const label = parameters[0];
        if (label.startsWith(defaultPrefix)) label = label.slice(defaultPrefix.length);
        this.#invokeCommand(sender, rawCommand, label, parameters.splice(1));
            }

        
    }*/
    
    static receiveBeforeChatEvent(event){
        
        let isCmd = false;
        let executor = null;
        
        let sender = event.sender;
        let message = event.message;
        let rawCommand = message;
        
        let prefix;
        
        let parameters = this.getParameters(message);
        let label = parameters[0];
        
        for (let p of prefixMap.keys()){
            if (!message.startsWith(p))
                continue;
            
            let cmdMap = prefixMap.get(p);
            let newLabel = label.slice(p.length);
            if (!cmdMap.has(newLabel))
                continue;
                
            isCmd = true;
            label = label.slice(p.length);
            rawCommand = rawCommand.slice(p.length);
            executor = cmdMap.get(newLabel);
            break;
        }
        
        if (!isCmd && nonPrefixCmdMap.has(label)){
            isCmd = true;
            executor = nonPrefixCmdMap.get(label);
        }
        
        if (!isCmd && message.startsWith(defaultPrefix)){
            isCmd = true;
            label = label.slice(defaultPrefix.length);
            rawCommand = rawCommand.slice(defaultPrefix.length);
            
            if (defaultCmdMap.has(label)){
                executor = defaultCmdMap.get(label);
            }
        }
        
        if (isCmd){
            event.cancel = true;
            if (executor !== null){
                this.#invokeCommand({
                    sender: event.sender,
                    rawCommand: rawCommand,
                    args: parameters.slice(1),
                    label: label,
                    executor: executor 
                });
            } else {
                logger.debug("无法找到命令 {}", label);
                YoniEntity.from(sender).sendMessage("[ChatCommand]: 无法找到命令" + label);
            }
        }
    }
    
    static registerPrefixCommand(...args){
        this.registerCustomPrefixCommand(...args);
    }
    
    static registerCommand(command, executor){
        if (typeof command !== "string" || command.length === 0)
            throw new TypeError("command not valid");
        
        let cmdMap = defaultCmdMap;
        
        if (typeof executor.onCommand !== "function" && typeof executor !== "function")
            throw new TypeError("cannot execute it");
        
        cmdMap.set(command, executor);
        logger.trace("注册命令 command: {}", command);
    }
    
    static unregisterCommand(command){
        defaultCmdMap.delete(command);
        logger.trace("移除命令 command: {}", command);
    }
    
    static registerNonPrefixCommand(command, executor){
        if (typeof command !== "string" || command.length === 0)
            throw new TypeError("command not valid");
        
        let cmdMap = nonPrefixCmdMap;
        
        if (typeof executor.onCommand !== "function" && typeof executor !== "function")
            throw new TypeError("cannot execute it");
        
        cmdMap.set(command, executor);
        logger.trace("注册无前缀命令 command: {}", command);
    }
    static unregisterNonPrefixCommand(command){
        nonPrefixCmdMap.delete(command);
        logger.trace("移除无前缀命令 command: {}", command);
    }
    
    static registerCustomPrefixCommand(prefix, command, executor){
        if (typeof prefix !== "string" || prefix.length === 0)
            throw new TypeError("prefix not valid");
        if (typeof command !== "string" || command.length === 0)
            throw new TypeError("command not valid");
        
        let cmdMap = null;
        if (!prefixMap.has(prefix))
            prefixMap.set(prefix, new Map());
        
        cmdMap = prefixMap.get(prefix);
        
        if (typeof executor.onCommand !== "function" && typeof executor !== "function")
            throw new TypeError("cannot execute it");
        
        cmdMap.set(command, executor);
        logger.trace("注册命令 prefix: {}, command: {}", prefix, command);
    }
    static unregisterCustomPrefixCommand(prefix, command){
        let cmdMap = prefixMap.get(prefix);
        if (cmdMap === undefined) return;
        cmdMap.delete(command);
        if (cmdMap.size === 0)
            prefixMap.delete(prefix);
        logger.trace("移除命令 prefix: {}, command: {}", prefix, command);
    }
    
    static #invokeCommand(options){
        let { sender, rawCommand, label, args, executor } = options;
        sender = YoniEntity.from(sender);
        try {
            logger.debug("正在执行命令{}", label);
            if (typeof executor.onCommand === "function"){
                executor.onCommand(sender, rawCommand, label, args);
            } else {
                executor(sender, rawCommand, label, args);
            }
        } catch(err) {
            logger.error("运行命令{}时发生错误 {}", label, err);
            sender.sendMessage(`[ChatCommand]: 运行命令${label}时发生错误，请查看控制台或寻求管理员的帮助`);
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

export { ChatCommand };
EventListener.register(VanillaEvents.beforeChat, (event) => {
    if (event.cancel) return;
    ChatCommand.receiveBeforeChatEvent(event);
});
