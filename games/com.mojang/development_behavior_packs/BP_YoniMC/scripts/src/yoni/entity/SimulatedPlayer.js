import { Gametest } from "../basis.js";
import { copyPropertiesWithoutOverride } from "../lib/ObjectUtils.js";
import { Player } from "./Player.js";
import { EntityClassRegistry } from "./EntityClassRegistry.js";

class SimulatedPlayer extends Player {
    get [Symbol.toStringTag](){
        if (this instanceof SimulatedPlayer)
            return `SimulatedPlayer: { type: ${this.typeId} }`;
        return "Object (SimulatedPlayer)";
    }
}

/* 修补 */
copyPropertiesWithoutOverride(SimulatedPlayer.prototype, Gametest.SimulatedPlayer.prototype, "vanillaEntity");
/*修复结束*/

EntityClassRegistry.register(SimulatedPlayer, Gametest.SimulatedPlayer);

export default SimulatedPlayer;
export { SimulatedPlayer };
