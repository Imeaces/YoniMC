import { Logger } from "yoni-mcscripts-lib";
import { VanillaWorld } from "yoni-mcscripts-lib";

let logger = new Logger("MAIN");

let importList = [
    "test.js",
    "test/wait_debug.js",
    "yonimc/main.js",
    "vein_mining/main.js"
];

VanillaWorld.afterEvents.worldInitialize.subscribe(loadMain);

async function loadMain(){
    try {
        await importAll();
    } finally {
        logger.info("scripts MAIN end");
    }
}
function importAll(){
    const promises = [];
    for (const path of importList){
        let recPath = "./" + path;
        let proLoad = import(recPath)
            .catch(catchError);
        promises.push(proLoad);
        function catchError(e: any){
            logger.error("导入 {} 时发生错误", path, e);
        }
    }
    return Promise.allSettled(promises);
}
