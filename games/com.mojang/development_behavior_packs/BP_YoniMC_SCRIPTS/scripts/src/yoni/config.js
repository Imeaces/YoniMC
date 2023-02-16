/* 以下为配置区 */

//设置为true后，将启用一些debug功能
//请勿在正式投入使用时启用
export const debug = true;

//日志输出等级
//0: none, 1: fatal, 2: error, 3: warn, 4: debug, 5: trace
export const logLevel = 3;

//是否将日志输出到ContentLog
export const outputContentLog = true;

//如果为true，启用一些可能可以加快运行速度的代码
//（可能不够稳定）
export const useOptionalFasterCode = true;

export const disableDangerousCode = false;

//是否覆盖默认的console对象为Logger对象
export const overrideDefaultConsole = true;

//启用根据数字ID查询scbid的功能（不推荐）
export const enableScoreboardIdentityByNumberIdQuery = false;

//使用更复杂的代码（可能也更好）去尝试兼容旧版本，这可能会降低性能
//目前必须启用此选项以兼容原本的objective.setScore
//不开启此选项时只能使用objective.postSetScore
export const emitLegacyMode = true;

export const injectGlobal = false;

/* 以下为非配置区 */
export function isDebug(){
    return debug;
}

//导入debug用函数
if (debug)
    import("./debug.js");
