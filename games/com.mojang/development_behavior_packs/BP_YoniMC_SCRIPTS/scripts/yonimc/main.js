import { logger } from "./util/logger";
let importList = [
    "chainDestroy/ChainDestroy",
    "test",
    "species",
    "server",
    "yonimcHelper/helper",
    "util/command",
    "util/chat",
    "util/notice",
];
Promise.allSettled(function importAll() {
    const promises = [];
    for (const path of importList) {
        promises.push(import("./" + path)
            .catch(e => logger.error("导入 {} 时发生错误", path, e)));
    }
    return promises;
}())
    .finally(function sayOk() {
    logger.info("scripts YoniMC end");
});
