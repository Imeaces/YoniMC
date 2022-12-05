(function (){"use strict";
function getCommand(cmd, ...args){
    if (args?.length === 1 && Array.isArray(args[0])){
        args = args[0];
    }
    if (args.length !== 0){
        //遍历每个参数，对满足某一条件的参数进行处理
        args.forEach((arg) => {
            let shouldQuote = false; //标记是否应当在两侧添加引号
            arg = String(arg);
            if (arg.length === 0){ //空参数
                shouldQuote = true;
            } else if (getCommand.startsWithNumberRegex.test(arg)){ //以数字开头的参数
                shouldQuote = true;
            } else if (getCommand.spaceCharRegex.test(arg)){ //含有空格，需要引号括起
                shouldQuote = true;
            }
            if (getCommand.specificCharRegex.test(arg)){ //将特殊符号转义
                arg = arg.replaceAll(getCommand.specificCharGlobalRegex, "\\$1");
                console.log("yyy");
            }
            if (shouldQuote){ //如果需要引号，则添加引号
                arg = `"${arg}"`;
            }
            cmd += ` ${arg}`; //将参数字符串拼接到命令
        });
    }
    return cmd;
}
getCommand.specificCharGlobalRegex = /(["'\\])/g;
getCommand.specificCharRegex = /(["'\\])/;
getCommand.spaceCharRegex = /(\s)/;
getCommand.startsWithNumberRegex = /^[0-9]/;
console.log(getCommand("awa", "arg 1", "    xjxjxx  ", "\nenenb3b33", "", `nsejjene'\\""nen`, "0x     88822"));
console.log(getCommand("awa", "arg 1"));
})();