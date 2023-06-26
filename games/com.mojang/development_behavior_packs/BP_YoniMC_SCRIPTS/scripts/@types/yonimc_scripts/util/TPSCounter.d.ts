export declare class TPSCounter {
    static get maxRecordTicks(): number;
    static set maxRecordTicks(v: number);
    /**
     * @param recentSeconds 指定计算使用的时间长度。
     * @param tickRate 指定每秒 tick 数。
     * @returns 若过去的时间内尚无记录，返回 `-1`，否则返回计算得到的TPS。
     */
    static getTPS(recentSeconds?: number, tickRate?: number): number;
}
