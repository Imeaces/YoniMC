import { Logger } from "../yoni/util/Logger.js";

let importList = [
    "./command.js",
    "./TagAdapter.js",
    "./guxi.js",
    //"./itemlore.js",
    "./chat.js",
    "./levitation.js",
    "./server.js",
    "./notice.js",
    "./guxi/hotbarctrl.js",
    "./ChainDestroy.js",
    "./anchorPortal.js"
];

let logger = new Logger("Yonimc");

importList.forEach(path=>{
    import(path)
    .catch(e=>{
        logger.error("导入{}的时候发生错误 {}", path, e);
    });
});

logger.info("scripts YoniMC end");
