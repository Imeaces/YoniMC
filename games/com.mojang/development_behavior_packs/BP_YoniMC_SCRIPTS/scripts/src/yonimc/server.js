import { logger } from "./logger.js";
import { isServerMode, setServerMode } from "./config.js";

import("./server/basis")
.then(() => {
    setServerMode(true);
    logger.info("服务器模式");
})
.then(async () => {
    if ( isServerMode() ){
        await import("./server/mirai-qq-msg-transfer");
        logger.info("已经导入YoniMC Server");
    }
})
.catch((e) => {
    setServerMode(false);
    logger.debug("未能导入服务器内容，可能是由于当前并未运行在服务器", e);
})
