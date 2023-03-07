import { Minecraft } from "../basis.js";
import { YoniBlock } from "../block.js";
import { Location } from "../Location.js";
import { ChunkBlock } from "./ChunkBlock.js";

export class Chunk {
    location: Readonly<Location>;
    mblock: YoniBlock;
    mcontainer: Minecraft.Container;
    get size(){
        return this.mcontainer.size;
    }
    constructor(location: Location){
        this.location = Location.makeReadonly(location);
        this.mblock = this.location.getBlock();
        let inventory = this.mblock.getComponent("minecraft:inventory") as Minecraft.BlockInventoryComponent;
        if (inventory == null)
            throw new Error("chunk mblock inventory not found");
        this.mcontainer = inventory.container;
    }
    #blocks = new Map<number, ChunkBlock>();
    getBlock(index: number){
        if (index < 0
        || index >= this.size
        || Math.floor(index) !== index)
            throw new RangeError("no block at the index "+index);
        
        if (this.#blocks.has(index))
            return this.#blocks.get(index) as ChunkBlock;
        
        let block = new ChunkBlock(this, index);
        
        this.#blocks.set(index, block);
        
        return block;
    }
}
