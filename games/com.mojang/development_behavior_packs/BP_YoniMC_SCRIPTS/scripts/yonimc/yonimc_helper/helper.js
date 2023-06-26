import { Logger } from "yoni-mcscripts-lib";
let importList = [
    "./ValueGetter.js",
    "./TagAdapter.js",
];
let logger = new Logger("Yonimc Helper");
importList.forEach(path => {
    import(path)
        .catch(e => {
        logger.error("导入{}的时候发生错误 {}", path, e);
    });
});
logger.info("scripts Helper end");
