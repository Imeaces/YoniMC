function getParameters(commandContent){
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
        console.log("str: "+str);
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
                console.log("escape str: "+str);
        }
        
        if (str == "\"" && !escapeFlag && !singleQuoteFlag){
            console.log("switching quote, current: "+quoteFlag);
            args[argIndex] += quoteContent;
            quoteContent = "";
            quoteFlag = !quoteFlag;
                i += 1;
                str = commandContent.substr(i, 1);
        } else if (str == "'" && !quoteFlag && (singleQuoteFlag || !escapeFlag)) {
            console.log("switching single quote, current: "+singleQuoteFlag);
            args[argIndex] += quoteContent;
            quoteContent = "";
            singleQuoteFlag = !singleQuoteFlag;
                i += 1;
                str = commandContent.substr(i, 1);
        }
        
            console.log("is quote: "+ quoteFlag);
            console.log("is escape: "+ escapeFlag);
        if (singleQuoteFlag || 
            (quoteFlag && 
                (
                    (escapeFlag && str == "\"") ||
                    !escapeFlag)
            )
        ){
            console.log("detect quote");
            quoteContent += str;
        } else if (str == " " && !escapeFlag){
            console.log("next arg");
            argIndex ++;
            
        } else {
            args[argIndex] += str;
        }
        
        escapeFlag = false;
    }
    if (quoteFlag || singleQuoteFlag) console.log("警告：引用未结束");
    
    return args;
    
}

let c = "lp \"222\\\"333\"";

console.log(getParameters(c));
