import { defineEntityPrototypeFor } from "./basis.js";
import { Gametest } from "yoni/basis.js";
import { Player } from "./Player.js";

export class SimulatedPlayer extends Player {
    get [Symbol.toStringTag](){
        if (this instanceof SimulatedPlayer)
            return `[object SimulatedPlayer]: { type: ${this.typeId} }`;
        return "[object Object]";
    }
}
/* 修补 */
//定义不存在的属性
defineEntityPrototypeFor(SimulatedPlayer.prototype, Gametest.SimulatedPlayer.prototype);
/*修复结束*/
