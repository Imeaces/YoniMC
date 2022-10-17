import { Minecraft } from "yoni/basis.js";
const { EntityInventoryComponent } = Minecraft;

const inventoryMap = new WeakMap();

export class Inventory {
    constructor(inventory){
    
        if (inventoryMap.has(inventory))
            return inventoryMap.get(inventory);
            
        if (!(inventory instanceof EntityInventoryComponent))
            throw new TypeError("Not a inventory type");
        
        this.#inventoryComponent = inventory;
        
        inventoryMap.set(inventory, this);
    }
}
