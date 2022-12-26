import { dim, Minecraft } from "./basis.js";
import Location from "./Location.js";

export class Block {
    static isBlock(object){
        if (object instanceof VanillaBlock || object instanceof Block){
            return true;
        } else {
            return false;
        }
    }
    
    get location(){
        return new Location(this);
    }
    
    /**
     * @param {Minecraft.Block}
     */
    constructor(){
        this.vanillaBlock = arguments[0];
    }
}
export default Block;
