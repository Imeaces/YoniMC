import("yoni/util/Logger.js")
.then((m)=>{
    m.log("请注意，ChatCommand的文件位置已更改，请使用新的位置进行导入");
});

import { ChatCommand } from "yoni/util/ChatCommand.js";
export * from "yoni/util/ChatCommand.js";
export default ChatCommand;
