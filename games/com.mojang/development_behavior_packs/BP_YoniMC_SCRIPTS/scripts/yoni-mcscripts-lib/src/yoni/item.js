import { Minecraft } from "./basis.js";

export class ItemStack {
    constructor(item){
        return new Proxy(item);
    }
}
export default ItemStack;