import { Logger } from "yoni/util/Logger.js";

let importList = [
    "./test.js",
    "./yonimc/main.js"
];

let logger = new Logger("Main");
logger.info("awa");
importList.forEach(path=>{
    import(path)
    .catch(e=>{
        logger.error("导入{}的时候发生错误 {}", path, e);
    });
});

logger.info("scripts main end");
