import { Logger } from "yoni/util/Logger.js";
const logger = new Logger("Loader");

let successCount = 0;
let loadCount = 0;

async function load(...paths){
    if (paths.length === 1 && Array.isArray(paths[0])){
        paths = paths[0];
    }
    loadCount += paths.length;
    if (loadCount > 1){
        logger.trace("加载{}个脚本", loadCount);
    }
    let importPromises = [];
    paths.forEach((path)=>{
        importPromises.push(import(path)
            .then(()=>{
                successCount++;
                logger.trace("载入了{}", path);
            })
            .catch((e)=>{
                logger.error("载入{}时发生错误\n{}", path, e);
            })
        );
    });
    return Promise.all(importPromises).finally(()=>{
        if (loadCount > 1){
            if (successCount > 1){
                logger.debug("成功加载{}个脚本，{}个失败", successCount, loadCount-successCount);
            } else if (successCount === 0){
                logger.error("加载失败");
            }
        } else if (loadCount === 1){
            if (successCount === 0){
                logger.error("加载失败");
            }
        }
    });
}

load.getLoader = (base)=>{
    return (path)=>{
        load(base+path);
    }
};

export { load };