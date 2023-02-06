import { ScoreboardAccessor } from "../scoreboard/ScoreboardAccessor.js";
import Scoreboard from "../scoreboard/SimpleScoreboard.js";
import Objective from "../scoreboard/SimpleScoreboard.js";
import * as AddressUtils from "../lib/AddressUtils.js";

export class ScoreboardInt32Array {
    static get [Symbol.species](){
        return Array;
    }
    /**
     * @param {Objective|Minecraft.ScoreboardObjective|string} objective - 记分项
     * @param {number} [length] - 数组长度，技术上未实现，用于数组访问
     */
    [Symbol.iterator](){
        return this.values();
    }
    constructor(objective, length = 0){
        let objectiveAccessor = new ScoreboardAccessor(objective);
        let self = Object.defineProperty(this, "length", {
            configurable: false,
            enumerable: false,
            get(){
                return (objectiveAccessor.length | 0);
            },
            set(value){
                value = (value | 0);
                if (value < 0){
                    throw new RangeError("invalid array length");
                }
                objectiveAccessor.length = value;
            }
        });
        self.length = length;
        let proxy = new Proxy(self, {
            get(self, property){
                if (typeof property === "symbol" || property === "length"){
                    return self[property];
                }
                
                let key = Number(property);
                if (isFinite(key)
                && Number.isInteger(key)
                && key >= 0
                && key < self.length){
                    key = AddressUtils.toAddress(key);
                    return (objectiveAccessor[key] | 0);
                }
                
                return self[property];
            },
            set(self, property, value){
                if (typeof property === "symbol" || property === "length"){
                    return Reflect.set(self, property, value);
                }
                
                let key = Number(property);
                if (isFinite(key)
                && Number.isInteger(key)
                && key >= 0
                && key < self.length){
                    key = AddressUtils.toAddress(key);
                    return Reflect.set(objectiveAccessor, key, (value | 0));
                }
                
                return Reflect.set(self, property, value);
            },
            deleteProperty(self, property){
                if (property === "length"){
                    return false;
                }
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
                if (property === "length"){
                    return true;
                }
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
Object.entries(Object.getOwnPropertyDescriptors(Array.prototype)).forEach(entry=>{
    if (entry[0] in ScoreboardInt32Array.prototype) return;
    if (entry[1].value)
        ScoreboardInt32Array.prototype[entry[0]] = entry[1].value;
});
