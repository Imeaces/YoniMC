import { Logger } from "yoni/util/Logger.js";
let logger = new Logger("Main");

let serverMode = false;

export function isServerMode(){
    return serverMode;
}

import('./server/mirai-qq-msg-transfer.js')
.then(()=>{
    serverMode = true;
    logger.info("已经导入YoniMC Server");
}).catch((e)=>{
    logger.debug("未能导入服务器内容，可能是由于当前并未运行在服务器 {}", e);
});
