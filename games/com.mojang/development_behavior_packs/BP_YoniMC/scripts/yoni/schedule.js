import { SystemEvents } from "./basis.js";
import { Logger } from "./util/Logger.js";
import { runTask } from "./basis.js";
import { debug } from "./config.js";


/*
    这里有一个问题亟待解决
    那就是当一个任务在运行时添加了其他任务，会不会导致执行顺序错误？
    现在的想法是先处理完增删之后再执行任务
*/

const logger = new Logger("Schedule");

let scheduleCurrentIndex = 0;
const isLastSuccessRecords = new WeakMap();
const lastSuccessTimeRecords = new WeakMap();
const lastFailTimeRecords = new WeakMap();
const lastExecuteTimeRecords = new WeakMap();
const scheduleCallbacks = new WeakMap();

export class Schedule {
    static timeCycleSchedule = "Schedule.timerCycleSchedule";
    static timeDelaySchedule = "Schedule.timerDelaySchedule";
    static tickCycleSchedule = "Schedule.tickCycleSchedule";
    static tickDelaySchedule = "Schedule.tickDelaySchedule";
    
    id;
    
    get isQueue(){
        return taskMap.has(this.id);
    }
    
    get isLastSuccess(){
        let rt = false;
        if (isLastSuccessRecords.has(this))
            rt = isLastSuccessRecords.get(this);
        return rt;
    }
    get lastSuccessTime(){
        let rt = null;
        if (lastSuccessTimeRecords.has(this))
            rt = lastSuccessTimeRecords.get(this);
        return rt;
    }
    get lastFailTime(){
        let rt = null;
        if (lastFailTimeRecords.has(this))
            rt = lastFailTimeRecords.get(this);
        return rt;
    }
    get lastExecuteTime(){
        let rt = null;
        if (lastExecuteTimeRecords.has(this))
            rt = lastExecuteTimeRecords.get(this);
        return rt;
    }
    constructor(props, callback){
        let { async, period, delay, type } = props;
        this.async = (!!async)?true:false;
        
        if ((type === Schedule.tickCycleSchedule
        || type === Schedule.timeCycleSchedule)
        && !isFinite(period))
            throw new TypeError(`period ${period} not finite`);
        
        this.period = period;

        if (!isFinite(delay))
            throw new TypeError(`delay ${delay} not finite`);
        this.delay = delay;
        
        this.type = type;
        
        this.id = scheduleCurrentIndex++;
        scheduleCallbacks.set(this, callback);
        Object.freeze(this);
    }
    run(...args){
        let callback = scheduleCallbacks.get(this);
        callback(...args);
    }
    async runAsync(...args){
        let callback = scheduleCallbacks.get(this);
        await callback(...args);
    }
}

let executingSchedule = null;
function executeSchedule(schedule, time){
    executingSchedule = schedule;
    lastExecuteTimeRecords.set(schedule, time);
    if (schedule.async){
        (async ()=>{
            isLastSuccessRecords.set(schedule, false);
            try {
                //do task
                await schedule.runAsync();
                
                //set result
                isLastSuccessRecords.set(schedule, true);
                lastSuccessTimeRecords.set(schedule, time);
            } catch(err) {
                lastFailTimeRecords.set(schedule, true);
                logger.error(`async schedule {} 运行时出现错误 {}`, schedule.id, err);
            }
        })();
    } else {
        isLastSuccessRecords.set(schedule, false);
        try {
           //do task
            schedule.run();
            
            //set result
            isLastSuccessRecords.set(schedule, true);
            lastSuccessTimeRecords.set(schedule, time);
        } catch(err) {
            lastFailTimeRecords.set(schedule, true);
            logger.error(`schedule {} 运行时出现错误 {}`, schedule.id, err);
        }
    }
    executingSchedule = null;
}

const scheduleTickDelayLessRecords = new WeakMap();
const scheduleAddTimeRecords = new WeakMap();

const schedulesTypedRecords = {};
const taskMap = new Map();

function doTickDelaySchedule(){
    runTask(doTickDelaySchedule);
    //首先，处理只执行一次的tick任务
    let tickDelaySchedules = schedulesTypedRecords[Schedule.tickDelaySchedule];
    let taskQueue = new Set();
    if (tickDelaySchedules !== undefined){
        for (let idx = tickDelaySchedules.length - 1; idx >= 0; idx--){
            let id = tickDelaySchedules[idx];
            let schedule = taskMap.get(id);
            let delayLess = (scheduleTickDelayLessRecords.has(schedule)) ? scheduleTickDelayLessRecords.get(schedule) : schedule.delay;
            if (delayLess > 0){
                scheduleTickDelayLessRecords.set(schedule, delayLess-1);
                continue;
            } else {
                tickDelaySchedules.splice(idx, 1);
                taskMap.delete(id);
            }
            taskQueue.add(schedule);
        }
    }
    for (const schedule of taskQueue){
         executeSchedule(schedule, Date.now());
    }
}
function doTimeDelaySchedule(){
    runTask(doTimeDelaySchedule);
    //接着，处理只执行一次的时间延时任务
    let taskQueue = new Set();
    let timeDelaySchedules = schedulesTypedRecords[Schedule.timeDelaySchedule];
    if (timeDelaySchedules !== undefined){
        for (let idx = timeDelaySchedules.length - 1; idx >= 0; idx--){
            let time = Date.now();
            let id = timeDelaySchedules[idx];
            let schedule = taskMap.get(id);
            let passedTime = time - scheduleAddTimeRecords.get(schedule);
            let delay = schedule.delay;
            if (delay > passedTime){
                continue;
            } else {
                timeDelaySchedules.splice(idx, 1);
                taskMap.delete(id);
            }
            taskQueue.add(schedule);
        }
    }
    for (const schedule of taskQueue){
         executeSchedule(schedule, Date.now());
    }
}
function doTickCycleSchedule(){
    runTask(doTickCycleSchedule);
    //然后，处理循环执行的tick任务
    let tickCycleSchedules = schedulesTypedRecords[Schedule.tickCycleSchedule];
    let taskQueue = new Set();
    if (tickCycleSchedules !== undefined){
        for (let idx = tickCycleSchedules.length - 1; idx >= 0; idx--){
            let id = tickCycleSchedules[idx];
            let schedule = taskMap.get(id);
            let delayLess = (scheduleTickDelayLessRecords.has(schedule)) ? scheduleTickDelayLessRecords.get(schedule) : schedule.delay;
            if (delayLess > 0){
                scheduleTickDelayLessRecords.set(schedule, delayLess-1);
                continue;
            } else {
                scheduleTickDelayLessRecords.set(schedule, schedule.period);
            }
            taskQueue.add(schedule);
        }
    }
    for (const schedule of taskQueue){
         executeSchedule(schedule, Date.now());
    }
}
function doTimeCycleSchedule(){
    runTask(doTimeCycleSchedule);
    //最后，处理循环的时间延时任务
    let timeCycleSchedules = schedulesTypedRecords[Schedule.timeCycleSchedule];
    let taskQueue = new Set();
    if (timeCycleSchedules !== undefined){
        for (let idx = timeCycleSchedules.length - 1; idx >= 0; idx--){
            let time = Date.now();
            let id = timeCycleSchedules[idx];
            let schedule = taskMap.get(id);
            let passedTime = time - scheduleAddTimeRecords.get(schedule);
            let delay = schedule.delay;
            if (delay > passedTime){
                continue;
            } else {
                let lastExecuteTime = schedule.lastExecuteTime;
                if (lastExecuteTime !== null || time - lastExecuteTime < schedule.period){
                    return;
                }
            }
            taskQueue.add(schedule);
        }
    }
    for (const schedule of taskQueue){
         executeSchedule(schedule, Date.now());
    }
}

/**
 * 你可以使用它创建任务
 */
export default class YoniScheduler {
    static addSchedule(schedule){
        if (!(schedule instanceof Schedule))
            throw new TypeError("Not a Schedule Type");
        
        if (!(schedule.type in schedulesTypedRecords))
            schedulesTypedRecords[schedule.type] = [];
        
        schedulesTypedRecords[schedule.type].push(schedule.id);
        taskMap.set(schedule.id, schedule);
        
        scheduleAddTimeRecords.set(schedule, Date.now());
        logger.trace("增加了新的任务, id: {}, async: {}, type: {}, period: {}, delay: {}", schedule.id, schedule.async, schedule.type.toString(), schedule.period, schedule.delay);
        return schedule.id;
    }
    
    /**
     * @param {Number|Schedule} taskId
     */
    static removeSchedlue(idOrSchedule){
        let id;
        if (idOrSchedule instanceof Schedule)
            id = idOrSchedule.id;
        else
            id = idOrSchedule;
        
        if (taskMap.has(id)){
            let schedule = taskMap.get(id);
            let list = schedulesTypedRecords[schedule.type];
            let i = list.indexOf(id);
            list.splice(i, 1);
            taskMap.delete(id);
            logger.trace("移除了任务, id: {}", id);
            return true;
        } else {
            return false;
        }
    }
    
    /**
     * 执行一个任务（以尽量快的速度）
     * @param {Function} 需要执行的任务
     * @param {Boolean} 是否异步执行
     * @returns {Number} taskId
     */
    static runTask(callback, async = false){
        let schedule = new Schedule({
            async,
            delay: 0,
            type: Schedule.tickDelaySchedule
        }, callback);
        YoniScheduler.addSchedule(schedule);
        return schedule.id;
    }
    
    /**
     * 在delay毫秒之后，执行一个任务
     * @param {Function} 需要执行的任务
     * @param {Number} 延时多少毫秒后开始执行
     * @param {Boolean} 是否异步执行
     * @returns {Number} taskId
     */
    static runDelayTimerTask(callback, delay=0, async = false){
        let schedule = new Schedule({
            async, delay,
            type: Schedule.timeDelaySchedule
        }, callback);
        YoniScheduler.addSchedule(schedule);
        return schedule.id;
    }
    
    /**
     * 在delay刻之后，执行一个任务
     * @param {Function} 需要执行的任务
     * @param {Number} 延时多少刻后开始执行
     * @param {Boolean} 是否异步执行
     * @returns {Number} taskId
     */
    static runDelayTickTask(callback, delay=0, async = false){
        let schedule = new Schedule({
            async,
            delay,
            type: Schedule.tickDelaySchedule
        }, callback);
        YoniScheduler.addSchedule(schedule);
        return schedule.id;
    }
    
    /**
     * 在delay毫秒之后，以固定period执行一个任务
     * @param {Function} 需要执行的任务
     * @param {Number} 延时多少毫秒后开始执行
     * @param {Number} 每隔多少毫秒触发一次
     * @param {Boolean} 是否异步执行
     * @returns {Number} taskId
     */
    static runCycleTimerTask(callback, delay, period=1, async = falsw){
        let schedule = new Schedule({
            async,
            delay,
            period,
            type: Schedule.timeCycleSchedule
        }, callback);
        YoniScheduler.addSchedule(schedule);
        return schedule.id;
    }

    /**
     * 在delay刻之后，以固定period执行一个任务
     * @param {Function} 需要执行的任务
     * @param {Number} 延时多少刻后开始执行
     * @param {Number} 每隔多少刻触发一次
     * @param {Boolean} 是否异步执行
     * @returns {Number} taskId
     */
    static runCycleTickTask(callback, delay=0, period, async = false){
        let schedule = new Schedule({
            async,
            delay,
            period,
            type: Schedule.tickCycleSchedule
        }, callback);
        YoniScheduler.addSchedule(schedule);
        return schedule.id;
    }
}

export { YoniScheduler };

//对于异常挂断的特殊处理，但是不知道有没有用
SystemEvents.beforeWatchdogTerminate.subscribe((event)=>{
    if (executingSchedule !== null){
        logger.warn("在执行一个任务的过程中碰到了脚本挂断事件，事件id: {}, 类型: {}, 挂断原因: {}", executingSchedule.id, String(executingSchedule.type), event.terminateReason);
        if (debug){
            logger.warn("正在输出相关任务的回调代码，请在trace中查看");
            logger.trace(String(scheduleCallbacks.get(executingSchedule)));
        }
    }
});

runTask(doTickDelaySchedule);
runTask(doTimeDelaySchedule);
runTask(doTickCycleSchedule);
runTask(doTimeCycleSchedule);

class TaskInfo { //还没弄
    isLastSuccess; //上次执行时是否成功
    
    schedule; //由什么计划任务而执行的任务
    
    setResult(rt){} //设置本次执行的结果，只要调用，不管发生什么，结果都为设定值
    getLastResult(){} //获得上次执行的结果
    setFailed(){} //只要调用这个方法，不管接下来发生了什么，仍然认为执行失败
    setSuccess(){} //只要调用这个方法，不管接下来发生了什么，仍然认为执行成功
}

/*
{
    type: Schedule.timerCycleSchedule,
    async: true,
    delay: 1000,
    period: 1000,
    callback: (taskInfo)=>{}
}

{
    type: Schedule.timerDelaySchedule,
    async: true,
    delay: 1000,
    callback: (taskInfo)=>{}
}

{
    type: Schedule.tickCycleSchedule,
    async: false,
    delay: 0,
    period: 20,
    callback: (taskInfo)=>{}
}

{
    type: Schedule.tickDelaySchedule,
    async: false,
    delay: 20,
    callback: (taskInfo)=>{}
}
*/