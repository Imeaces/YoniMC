import { ScoreboardAccessor } from "../scoreboard/ScoreboardAccessor.js";
import Scoreboard from "../scoreboard/SimpleScoreboard.js";
import Objective from "../scoreboard/SimpleScoreboard.js";
import * as AddressUtils from "../lib/AddressUtils.js";

function isInRangeNumber(num, min, max){
    num = Number(num);
    if (! isFinite(num)) return false;
    
    if (num >= min && num <= max) return true;
    
    return false;
}

export class single_block {
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
            value: 512,
            writable: true,
        });
        let proxy = new Proxy(self, {
            get(self, property){
                if (typeof property === "symbol"){
                    return self[property];
                }
                
                if (isInRangeNumber(property, 0, self.length)){
                    return (objectiveAccessor[property] | 0);
                }
                
                return self[property];
            },
            set(self, property, value){
                if (typeof property === "symbol"){
                    return Reflect.set(self, property, value);
                }
                
                if (isInRangeNumber(property, 0, self.length)){
                    return Reflect.set(objectiveAccessor, property, (value | 0));
                }
                
                return Reflect.set(self, property, value);
            },
            deleteProperty(self, property){
                if (typeof property === "symbol"){
                    return Reflect.delete(self, property);
                }
                
                if (isInRangeNumber(property, 0, self.length)){
                    return Reflect.delete(objectiveAccessor, property);
                }
                
                return Reflect.delete(self, property);
            },
            has(self, property){
                if (typeof property === "symbol"){
                    return Reflect.has(self, property);
                }
                
                if (isInRangeNumber(property, 0, self.length)){
                    return true;
                }
                
                return Reflect.has(self, property);
            }
        });
        return proxy;
    }
}
