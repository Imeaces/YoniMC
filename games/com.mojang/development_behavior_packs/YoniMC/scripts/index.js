//先导入防止看门狗咬人的脚本
import "scripts/WatchBird.js";
import { Logger } from "scripts/yoni/util/Logger.js";

let logger = new Logger("Main");

//再导入主函数

import('scripts/main.js')
.catch(e=>{
    logger.fatal("在加载主函数的时候出现错误 {}", e);
});

/*
import('scripts/test.js')
    .then(()=>{
        console.error("已经导入测试");
    })
    .catch((e)=>{
        printError("未能导入测试", e);
    });
    
*/