import { Logger } from "yoni-mcscripts-lib";


let importList = [
    "winging/main",
    "guxi/main",
    
    "guxi/fallAsleep",
    
    "sil/index",
];

const logger = new Logger("Species");

Promise.allSettled(function importAll(){
    const promises = [];
    for (const path of importList){
        promises.push(import("./"+path)
            .catch(e => logger.error("导入{}的时候发生错误 {}", path, e))
        );
    }
    return promises;
}())
.finally(function sayOk(){
    logger.info("scripts Species end")
});