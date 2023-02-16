import { SystemEvents } from "./basis.js";
import { Logger } from "./util/Logger.js";
import { runTask } from "./basis.js";
import { debug } from "./config.js";


const logger = new Logger("Schedule");

let scheduleCurrentIndex = 0;
const isLastSuccessRecords = new WeakMap();
const lastSuccessTimeRecords = new WeakMap();
const lastFailTimeRecords = new WeakMap();
const lastExecuteTimeRecords = new WeakMap();
const scheduleCallbacks = new WeakMap();
const runningSchedule = new WeakSet();

export class Schedule {
    static timeCycleSchedule = "Schedule.timerCycleSchedule";
    static timeDelaySchedule = "Schedule.timerDelaySchedule";
    static tickCycleSchedule = "Schedule.tickCycleSchedule";
    static tickDelaySchedule = "Schedule.tickDelaySchedule";
    
    id;
    
    isQueue(){
        return taskMap.has(this.id);
    }
    
    isRunning(){
        if (this.async)
            return runningSchedule.has(this);
        return executingSchedule === this;
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
    /**
     * 获取此任务最后一次执行时抛出错误的时间。
     * 对于同步任务，无法获取由于Minecraft挂断执行导致的错误，这种错误无法被捕获，故无法记录。
     */
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
    /**
     * 
     * @param {{async?: boolean, type: any, period?:number, delay?:number}} props 
     * @param {() => void} callback 
     */
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
    if (schedule.async){
        runningSchedule.add(schedule);
        //do task
        schedule.runAsync()
        .then(()=>{
            isLastSuccessRecords.set(schedule, true);
            lastSuccessTimeRecords.set(schedule, Date.now());
        })
        .catch((e)=>{
            isLastSuccessRecords.set(schedule, false);
            lastFailTimeRecords.set(schedule, Date.now());
            logger.error("async schedule {} 运行时出现错误 {}", schedule.id, e);
        })
        .finally(()=>{
            lastExecuteTimeRecords.set(schedule, time);
            runningSchedule.delete(schedule);
            if (executingSchedule === schedule){
                executingSchedule = null;
            }
        });
    } else {
        lastExecuteTimeRecords.set(schedule, time);
        isLastSuccessRecords.set(schedule, false);
        try {
           //do task
            schedule.run();
            
            //set result
            isLastSuccessRecords.set(schedule, true);
            lastSuccessTimeRecords.set(schedule, Date.now());
        } catch(err) {
            lastFailTimeRecords.set(schedule, Date.now());
            logger.error(`schedule {} 运行时出现错误 {}`, schedule.id, err);
        }
        executingSchedule = null;
    }
}

const scheduleTickDelayLessRecords = new WeakMap();
const scheduleAddTimeRecords = new WeakMap();

const schedulesTypedRecords = {};
const taskMap = new Map();

function doTickDelaySchedule(){
    runTask(doTickDelaySchedule);
    //首先，处理只执行一次的tick任务
    let tickDelaySchedules = schedulesTypedRecords[Schedule.tickDelaySchedule];
    if (tickDelaySchedules === undefined){
        return;
    }
    let taskQueue = new Set();
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
    for (const schedule of taskQueue){
        executeSchedule(schedule, Date.now());
    }
}
function doTimeDelaySchedule(){
    runTask(doTimeDelaySchedule);
    //接着，处理只执行一次的时间延时任务
    let timeDelaySchedules = schedulesTypedRecords[Schedule.timeDelaySchedule];
    if (timeDelaySchedules === undefined){
        return;
    }
    let taskQueue = new Set();
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
    for (const schedule of taskQueue){
        executeSchedule(schedule, Date.now());
    }
}
function doTickCycleSchedule(){
    runTask(doTickCycleSchedule);
    //然后，处理循环执行的tick任务
    let tickCycleSchedules = schedulesTypedRecords[Schedule.tickCycleSchedule];
    if (tickCycleSchedules === undefined){
        return;
    }
    let taskQueue = new Set();
    for (let idx = tickCycleSchedules.length - 1; idx >= 0; idx--){
        let id = tickCycleSchedules[idx];
        let schedule = taskMap.get(id);
        if (schedule.isRunning()){
            continue;
        }
        let delayLess = (scheduleTickDelayLessRecords.has(schedule)) ? scheduleTickDelayLessRecords.get(schedule) : schedule.delay;
        if (delayLess > 0){
            scheduleTickDelayLessRecords.set(schedule, delayLess-1);
            continue;
        } else {
            scheduleTickDelayLessRecords.set(schedule, schedule.period);
        }
        taskQueue.add(schedule);
    }
    for (const schedule of taskQueue){
         executeSchedule(schedule, Date.now());
    }
}
function doTimeCycleSchedule(){
    runTask(doTimeCycleSchedule);
    //最后，处理循环的时间延时任务
    let timeCycleSchedules = schedulesTypedRecords[Schedule.timeCycleSchedule];
    if (timeCycleSchedules === undefined){
        return;
    }
    let taskQueue = new Set();
    for (let idx = timeCycleSchedules.length - 1; idx >= 0; idx--){
        let time = Date.now();
        let id = timeCycleSchedules[idx];
        let schedule = taskMap.get(id);
        if (schedule.isRunning()){
            continue;
        }
        let passedTime = time - scheduleAddTimeRecords.get(schedule);
        let delay = schedule.delay;
        if (delay > passedTime){
            continue;
        }
        let lastExecuteTime = schedule.lastExecuteTime;
        if (lastExecuteTime == null
        || (lastExecuteTime && (time - lastExecuteTime) > schedule.period)){
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
    /**
     * @param {Schedule} schedule
     * @returns {number} taskId
     */
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
     * @param {number|Schedule} schedule
     * @returns {boolean}
     */
    static removeSchedule(schedule){
        let id;
        if (schedule instanceof Schedule)
            id = schedule.id;
        else
            id = schedule;
        
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
     * @param {() => {}} 需要执行的任务
     * @param {boolean} 是否异步执行
     * @returns {number} taskId
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
     * @param {() => void} callback - 需要执行的任务
     * @param {number} delay - 延时多少毫秒后开始执行
     * @param {boolean} async - 是否异步执行
     * @returns {number} taskId
     */
    static runDelayTimerTask(callback, delay, async = false){
        let schedule = new Schedule({
            async, delay,
            type: Schedule.timeDelaySchedule
        }, callback);
        YoniScheduler.addSchedule(schedule);
        return schedule.id;
    }
    
    /**
     * 在delay刻之后，执行一个任务
     * @param {() => void} callback - 需要执行的任务
     * @param {number} period - 每隔多少刻触发一次
     * @param {boolean} async - 是否异步执行
     * @returns {number} taskId
     */
    static runDelayTickTask(callback, delay, async = false){
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
     * @param {() => void} callback - 需要执行的任务
     * @param {number} delay - 延时多少毫秒后开始执行
     * @param {number} period - 每隔多少毫秒触发一次
     * @param {boolean} async - 是否异步执行
     * @returns {number} taskId
     */
    static runCycleTimerTask(callback, delay, period, async = false){
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
     * @param {() => void} callback - 需要执行的任务
     * @param {number} delay - 延时多少刻后开始执行
     * @param {number} period - 每隔多少刻触发一次
     * @param {boolean} async - 是否异步执行
     * @returns {number} taskId
     */
    static runCycleTickTask(callback, delay, period, async = false){
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
