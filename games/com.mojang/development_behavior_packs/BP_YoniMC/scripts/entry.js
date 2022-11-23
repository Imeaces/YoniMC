//先导入防止看门狗咬人的脚本
import "yoni/util/WatchBird.js";
import { VanillaEvents } from "yoni/basis.js";

let logger;

//接着，等待世界加载初始化完成，并进行异步加载
let ev = async ()=>{
console.error("loading");
    VanillaEvents.worldInitialize.unsubscribe(ev);
console.error("cont");
    try {
        let m = await import("yoni/util/Logger.js");
        let logger = new m.Logger("Main");
        logger.info("加载主函数");
        await import('main.js');
    } catch (e){
        console.error(String(e.stack));
       // logger.fatal("在加载主函数的时候出现错误 {}", e);
    }
};
VanillaEvents.worldInitialize.subscribe(ev);
