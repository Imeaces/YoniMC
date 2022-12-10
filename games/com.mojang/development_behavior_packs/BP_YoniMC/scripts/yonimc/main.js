import { Logger } from "yoni/util/Logger.js";

let importList = [
    "yonimc/command.js",
    "yonimc/TagAdapter.js",
    "yonimc/guxi.js",
    //"./yonimc/itemlore.js",
    "yonimc/chat.js",
    "yonimc/levitation.js",
    "yonimc/server.js",
    "yonimc/notice.js",
    "yonimc/guxi/hotbarctrl.js",
    "yonimc/ChainDestroy.js",
    "yonimc/anchorPortal.js"
];

let logger = new Logger("Yonimc");

importList.forEach(path=>{
    import(path)
    .catch(e=>{
        logger.error("导入{}的时候发生错误 {}", path, e);
    });
});

logger.info("scripts YoniMC end");
