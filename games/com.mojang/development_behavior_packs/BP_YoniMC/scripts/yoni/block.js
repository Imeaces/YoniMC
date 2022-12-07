import { dim, Minecraft } from "./basis.js";
import Location from "./Location.js";
const VanillaBlock  = Minecraft.Block;

const blockMap = new Map();

export class Block {
    static isBlock(object){
        if (object instanceof VanillaBlock || object instanceof Block){
            return true;
        } else {
            return false;
        }
    }
    
    /**
     * @param {Location|VanillaBlock|Block}
     */
    constructor(locationV0, locationV1, locationV2, locationV3, locationV4, locationV5){
    }
}
export default Block;
