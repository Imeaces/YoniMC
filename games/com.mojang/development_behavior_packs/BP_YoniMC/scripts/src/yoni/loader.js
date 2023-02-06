import { Logger } from "./util/Logger.js";

function Loader(basepath){
    if (new.target) return;
}
Loader.default = Loader(".");
Loader.logger = new Logger("Scripts Loader");
Loader.prototype.basedir = ".";
Loader.prototype.getPath = function getPath(path){
    
    path = this.basedir + "/" + path;
    let floor = path.split(/(?<!\\)\//).filter(str => str !== "");
    let pathFloor = [];
    for (let path of floor){
        let lastFloorIdx = (pathFloor.length === 0)
            ? (0)
            : (pathFloor.length - 1);
        let lastFloor = pathFloor[lastFloorIdx];
        if (path === "."){
            if (pathFloor.length !== 0){
                continue;
            }
        } else if (path === ".."){
            if (lastFloor !== ".."){
                pathFloor.pop();
                continue;
            }
        }
        pathFloor.push(path);
    }
    let pathStr = "";
    for (let i = 0; i<pathFloor.length; i++){
        //这部分代码不格式化是因为当时在想应该怎么写逻辑
        //没心思格式化（纯人手写的，用的MT管理器）
        //然后觉得很有趣，就留了下来
        if (i===(pathFloor.length-1)){
            if (pathFloor[i].endsWith(".js")){
                //warn: file name doesn't ends with ".js"
            }
            pathStr += pathFloor[i];
        }else {
            pathStr += pathFloor[i] + "/";
        }
    }
    return pathStr;
}
Loader.prototype.load = function load(...paths){
    
}



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

export default Loader;
export { Loader };
