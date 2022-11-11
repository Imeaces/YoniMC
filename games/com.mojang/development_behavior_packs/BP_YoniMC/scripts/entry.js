//先导入防止看门狗咬人的脚本
import "yoni/WatchBird.js";
import { Logger } from "yoni/util/Logger.js";

let logger = new Logger("Main");

//再导入主函数

import('main.js')
.catch(e=>{
    logger.fatal("在加载主函数的时候出现错误 {}", e);
});

