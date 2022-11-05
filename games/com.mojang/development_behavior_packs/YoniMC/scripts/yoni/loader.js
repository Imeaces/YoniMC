import { Logger } from "yoni/util/Logger.js";
const logger = new Logger("loader");
async function load(...paths){
    
    if (paths.length === 1 && Array.isArray(paths[0])){
        paths = paths[0];
    }
    let importPromises = [];
    paths.forEach((path)=>{
        importPromises.push(import(path)
            .then(()=>{
                logger.debug("载入了{}", path);
            })
            .catch((e)=>{
                logger.error("载入{}时发生错误\n{}", path, e);
            })
        );
    });
}

load.getLoader = (base)=>{
    return (path)=>{
        load(base+path);
    }
};

export { load };