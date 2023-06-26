import { Logger } from "yoni-mcscripts-lib";
let importList = [
    "ValueGetter",
    "TagAdapter",
];
export const logger = new Logger("YoniMC Helper");
Promise.allSettled(function importAll() {
    const promises = [];
    for (const path of importList) {
        promises.push(import("./" + path)
            .catch(e => logger.error("导入 {} 时发生错误", path, e)));
    }
    return promises;
}())
    .finally(function sayOk() {
    logger.info("scripts YoniMC Helper end");
});
