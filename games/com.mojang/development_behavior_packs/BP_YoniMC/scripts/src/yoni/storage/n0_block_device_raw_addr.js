import { ScoreboardAccessor } from "../scoreboard/ScoreboardAccessor.js";
import Scoreboard from "../scoreboard/SimpleScoreboard.js";
import Objective from "../scoreboard/SimpleScoreboard.js";
import * as AddressUtils from "../lib/AddressUtils.js";

export class ScoreboardObjectiveEntryIndexMapper {
    static get [Symbol.species](){
        return Array;
    }
    /**
     * @param {Objective|Minecraft.ScoreboardObjective|string} objective - 记分项
     */
    constructor(objective){
        let objectiveAccessor = new ScoreboardAccessor(objective);
        let self = Object.defineProperty(this, "length", {
            configurable: false,
            enumerable: false,
            // 这里定义块设备的地址数，它的值乘以4便是可存储的字节数
            value: 1024,
            writable: true,
        });
        let proxy = new Proxy(self, {
            get(self, property){
                if (typeof property === "symbol"){
                    return self[property];
                }
                
                let key = Number(property);
                if (isFinite(key)
                && Number.isInteger(key)
                && key >= 0
                && key < self.length){
                
                    return (objectiveAccessor[key] | 0);
                }
                
                return self[property];
            },
            set(self, property, value){
                if (typeof property === "symbol"){
                    return Reflect.set(self, property, value);
                }
                
                let key = Number(property);
                if (isFinite(key)
                && Number.isInteger(key)
                && key >= 0
                && key < self.length){
                    return Reflect.set(objectiveAccessor, key, (value | 0));
                }
                console.warn("警告，尝试写入超出范围的索引: "+ property);
                return Reflect.set(self, property, value);
            },
            deleteProperty(self, property){
                if (typeof property === "symbol"){
                    return Reflect.delete(self, property);
                }
                
                let key = Number(property);
                if (isFinite(key)
                && Number.isInteger(key)
                && key >= 0
                && key < self.length){
                    return false;
                }
                
                return Reflect.delete(self, property);
            },
            has(self, property){
                if (typeof property === "symbol"){
                    return Reflect.has(self, property);
                }
                
                let key = Number(property);
                if (isFinite(key)
                && Number.isInteger(key)
                && key >= 0
                && key < self.length){
                    return true;
                }
                
                return Reflect.has(self, property);
            }
        });
        return proxy;
    }
}
