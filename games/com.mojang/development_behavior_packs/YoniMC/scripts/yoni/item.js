import { Minecraft } from "scripts/lib/yoni/basis.js";

export default class ItemStack {
    constructor(item){
        return new Proxy(item);
    }
}
