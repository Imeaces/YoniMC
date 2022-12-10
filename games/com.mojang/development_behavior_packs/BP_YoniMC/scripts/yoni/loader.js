import { Logger } from "yoni/util/Logger.js";
const logger = new Logger("Loader");

async function load(...paths){
    if (paths.length === 1 && Array.isArray(paths[0])){
        paths = paths[0];
    }
    if (paths.length > 1){
        logger.debug("加载{}个脚本中", paths.length);
    }
    let successCount = 0;
    let importPromises = [];
    paths.forEach((path)=>{
        importPromises.push(import(path)
            .then(()=>{
                successCount++;
                logger.debug("载入了{}", path);
            })
            .catch((e)=>{
                logger.error("载入{}时发生错误\n{}", path, e);
            })
        );
    });
    return Promise.all(importPromises).finally(()=>{
        if (paths.length > 1){
            if (successCount > 1){
                logger.debug("成功加载{}个脚本，{}个失败", successCount, paths.length);
            } else if (successCount === 0){
                logger.error("加载失败");
            }
        } else if (paths.length === 1){
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