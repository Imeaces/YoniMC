import { EventListener } from "./event.js";
import { SystemEvents } from "./basis.js";
import { Logger } from "./util/Logger.js";
import { runTask } from "./basis.js";

const logger = new Logger("Schedule");

let scheduleCurrentIndex = 0;
const isLastSuccessRecords = new WeakMap();
const lastSuccessTimeRecords = new WeakMap();
const lastFailTimeRecords = new WeakMap();
const lastExecuteTimeRecords = new WeakMap();

export class Schedule {
    static timeCycleSchedule = Symbol("Schedule.timerCycleSchedule");
    static timeDelaySchedule = Symbol("Schedule.timerDelaySchedule");
    static tickCycleSchedule = Symbol("Schedule.tickCycleSchedule")
    static tickDelaySchedule = Symbol("Schedule.tickDelaySchedule")
    
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
    constructor(props){
        let { callback, async, period, delay, type } = props;
        logger.trace("adding new schedule:\n async: {}\n period: {}\n delay: {}\n type: {}", async, period, delay,type.toString());
        this.#callback = callback;
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
        Object.freeze(this);
    }
    #callback;
    run(...args){
        return this.#callback(...args);
    }
    async runAsync(...args){
        return await this.#callback(...args);
    }
}

function executeSchedule(schedule, time){
    lastExecuteTimeRecords.set(schedule, time);
    if (schedule.async){
        async ()=>{
            isLastSuccessRecords.set(schedule, false);
            try {
                //do task
                await schedule.runAsync();
                
                //set result
                isLastSuccessRecords.set(schedule, true);
                lastSuccessTimeRecords.set(schedule, time);
            } catch(err) {
                lastFailTimeRecords.set(schedule, true);
                logger.trace(`async schedule {} 运行时出现错误 {}`, schedule.id, err);
            }
        }();
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
            logger.trace(`schedule {} 运行时出现错误 {}`, schedule.id, err);
        }
    }
}

const scheduleTickDelayLessRecords = new WeakMap();
const scheduleAddTimeRecords = new WeakMap();

const schedulesTypedRecords = {};
const taskMap = new Map();

function ticking(event){
    runTask(ticking);
    //首先，处理只执行一次的tick任务
    let tickDelaySchedules = schedulesTypedRecords[Schedule.tickDelaySchedule];
    if (tickDelaySchedules !== undefined){
        for (let idx = tickDelaySchedules.length - 1; idx >= 0; idx--){
            let time = Date.now();
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
            executeSchedule(schedule, time);
        }
    }
    
    //接着，处理只执行一次的时间延时任务
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
            lastExecuteTimeRecords.set(schedule, time);
            executeSchedule(schedule, time);
        }
    }
    
    //然后，处理循环执行的tick任务
    let tickCycleSchedules = schedulesTypedRecords[Schedule.tickCycleSchedule];
    if (tickCycleSchedules !== undefined){
        for (let idx = tickCycleSchedules.length - 1; idx >= 0; idx--){
            let time = Date.now();
            let id = tickCycleSchedules[idx];
            let schedule = taskMap.get(id);
            let delayLess = (scheduleTickDelayLessRecords.has(schedule)) ? scheduleTickDelayLessRecords.get(schedule) : schedule.delay;
            if (delayLess > 0){
                scheduleTickDelayLessRecords.set(schedule, delayLess-1);
                continue;
            } else {
                scheduleTickDelayLessRecords.set(schedule, schedule.period);
            }
            executeSchedule(schedule, time);
        }
    }
    
    //最后，处理循环的时间延时任务
    let timeCycleSchedules = schedulesTypedRecords[Schedule.timeCycleSchedule];
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
            executeSchedule(schedule, time);
            
        }
    }
    
}

function beforeTerminate(event){
}
export default class YoniScheduler {
    static addSchedule(schedule){
        if (!(schedule instanceof Schedule))
            throw new TypeError("Not a Schedule Type");
        
        if (!(schedule.type in schedulesTypedRecords))
            schedulesTypedRecords[schedule.type] = [];
        
        schedulesTypedRecords[schedule.type].push(schedule.id);
        taskMap.set(schedule.id, schedule);
        
        scheduleAddTimeRecords.set(schedule, Date.now());
        
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
            return true;
        } else {
            return false;
        }
    }
    
    /**
     * @returns {Number} taskId
     */
    static runTaskTimer(callback, delay, period){
        let schedule = new Schedule({
            async: false,
            delay: delay,
            period: period,
            type: Schedule.tickDelaySchedule,
            callback: callback
        });
        YoniScheduler.addSchedule(schedule);
    }
    static runTask(callback, delay=0){
        let schedule = new Schedule({
            async: false,
            delay: delay,
            type: Schedule.tickDelaySchedule,
            callback: callback
        });
        YoniScheduler.addSchedule(schedule);
    }
}

export { YoniScheduler };

EventListener.register(SystemEvents.beforeWatchdogTerminate, beforeTerminate);
runTask(ticking);

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