//先导入防止看门狗咬人的脚本
import "./yoni/util/WatchBird.js";
import { VanillaEvents } from "./yoni/basis.js";

let originConsole = globalThis.console;
let logger = null;

async function setupLogger(Logger){
    logger = new Logger("ENTRY");
}

function fallbackLogger(){
    logger = {
        info: (...msg)=>{ originConsole.warn("[info]", ...msg); },
        log: (...msg)=>{ originConsole.warn("[log]", ...msg); },
        warn: function (){ originConsole.warn.apply(originConsole, arguments); },
        error: function (){ originConsole.error.apply(originConsole, arguments); },
        fatal: (...msg)=>{ originConsole.warn("[fatal]", ...msg); },
    }
    logger.error("未能载入高级Logger，使用基础Logger进行日志输出");
}

async function initLogger(){
    try {
        let LoggerModule = await import("./yoni/util/Logger.js");
        await setupLogger(LoggerModule.Logger);
    } catch {
        await fallbackLogger();
    }
}

function load(){
    VanillaEvents.worldInitialize.unsubscribe(load);
    import('./main.js')
    .then(()=>{})
    .catch(async (e)=>{
        await initLogger();
        logger.fatal("在加载主函数的时候出现错误 {}", e);
    });
}

VanillaEvents.worldInitialize.subscribe(load);
