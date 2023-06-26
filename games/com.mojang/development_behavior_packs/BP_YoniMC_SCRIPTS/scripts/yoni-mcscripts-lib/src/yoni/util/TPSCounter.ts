import { runTask } from "yoni-mcscripts-lib";

let tickTimeRecords: number[] = [];
let maxRecordTicks: number = 20;

runTask(function countTPS(){
    runTask(countTPS);
    
    tickTimeRecords.unshift(Date.now());
    
    if (tickTimeRecords.length > maxRecordTicks + 1)
        tickTimeRecords.length = maxRecordTicks + 1;
});

export class TPSCounter {
    static get maxRecordTicks(){
        return maxRecordTicks;
    }
    static set maxRecordTicks(v: number){
        v = Number(v);
        if (isNaN(v) || v < 1)
            throw new TypeError("value not valid");
        
        maxRecordTicks = Math.floor(v);
    }
    /**
     * @param recentSeconds 指定计算使用的时间长度。
     * @param tickRate 指定每秒 tick 数。
     * @returns 若过去的时间内尚无记录，返回 `-1`，否则返回计算得到的TPS。
     */
    static getTPS(recentSeconds: number = 1, tickRate: number = 20): number {
        
        if (recentSeconds * 1000 > tickTimeRecords[0] - tickTimeRecords[tickTimeRecords.length-1]){
            // not such record
            return -1;
        }
        
        const shouldPassedTicks = recentSeconds * tickRate;
        
        const totalRecordedTicks = tickTimeRecords.length - 1;
        
        const oldestTickRecordIndex = Math.min(Math.floor(shouldPassedTicks), totalRecordedTicks);
        
        const oldestTickTime = tickTimeRecords[oldestTickRecordIndex];
        const lastTickTime = tickTimeRecords[0];
        
        const intervalBetweenStartEndRecord = lastTickTime - oldestTickTime;
        
        const tickingTime = Math.max(intervalBetweenStartEndRecord, recentSeconds);
        
        const tps = 1000 / ( tickingTime / shouldPassedTicks );
        
        const normalizedTPS = Math.round(tps * 100) / 100;
        
        return normalizedTPS;
    }
}
