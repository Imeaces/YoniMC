import { ScoreboardAccessor } from "../../scoreboard/ScoreboardAccessor.js";

function isInRangeNumber(num, min, max){
    num = Number(num);
    if (! isFinite(num)) return false;
    
    if (num >= min && num <= max) return true;
    
    return false;
}

export class single_block extends Array {
    static get [Symbol.species](){
        return Array;
    }
    get(self, property){
        if (typeof property === "symbol"){
            return self[property];
        }
        if (isInRangeNumber(property, 0, self.length)){
            return (self.objective[property] | 0);
        }
        
        return self[property];
    }
    set(self, property, value){
        if (typeof property === "symbol"){
            return Reflect.set(self, property, value);
        }
        
        if (isInRangeNumber(property, 0, self.length)){
            return Reflect.set(self.objective, property, (value | 0));
        }
        
        return Reflect.set(self, property, value);
    }
    deleteProperty(self, property){
        if (typeof property === "symbol"){
            return Reflect.delete(self, property);
        }
        
        if (isInRangeNumber(property, 0, self.length)){
            return Reflect.delete(self.objective, property);
        }
        
        return Reflect.delete(self, property);
    }
    has(self, property){
        if (typeof property === "symbol"){
            return Reflect.has(self, property);
        }
        
        if (isInRangeNumber(property, 0, self.length)){
            return true;
        }
        
        return Reflect.has(self, property);
    }
    objective;
    /**
     * @param {Objective|Minecraft.ScoreboardObjective|string} objective - 记分项
     */
    constructor(objective, perBlockLength){
        super(perBlockLength);
        Object.defineProperty(this, "length", {
            configurable: false,
            enumerable: false,
            value: perBlockLength,
            writable: false,
        });
        this.objective = new ScoreboardAccessor(objective);
        return new Proxy(this, this);
    }
}
