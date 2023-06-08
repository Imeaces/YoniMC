import { Logger } from "yoni-mcscripts-lib";

let importList = [
    //"./anchorPortal.js",
    //"./levitation.js",
    "./command.js",
    "./guxi.js",
    "./chat.js",
    "./server.js",
    "./notice.js",
    "./guxi/fall_asleep.js",
    "./ChainDestroy.js",
    //"./ChainDestroy_v2.js",
    "./test.js",
    "./yonimc_helper/helper.js",
];

let logger = new Logger("Yonimc");

importList.forEach(path=>{
    import(path)
    .catch(e => {
        logger.error("导入{}的时候发生错误 {}", path, e);
    });
});

logger.info("scripts YoniMC end");
