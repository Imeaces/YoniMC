import { Minecraft } from "./basis.js";
import Location from "./Location.js";
import { Dimension } from "./dimension.js";

class Block {
    static isBlock(object: any): object is (Minecraft.Block | Block) {
        return object instanceof Minecraft.Block || object instanceof Block;
    }
    static from(block: Minecraft.Block){
        if (block == null)
            throw new TypeError("null object");
        return new Block(block);
    }
    
    // @ts-ignore
    readonly vanillaBlock: Minecraft.Block;
    /**
     * Returns the dimension that the block is within.
     */
    // @ts-ignore
    readonly location: Location;
    // @ts-ignore
    readonly dimension: Dimension;
    /**
     * X coordinate of the block.
     */
    // @ts-ignore
    readonly x: number;
    /**
     * Y coordinate of the block.
     */
    // @ts-ignore
    readonly y: number;
    /**
     * Z coordinate of the block.
     */
    // @ts-ignore
    readonly z: number;
    /**
     * @param {Minecraft.Block}
     */
    constructor(vanillaBlock: Minecraft.Block){
        let location = Location.createReadonly(vanillaBlock);
        let { x, y, z, dimension } = location;
        Object.defineProperties(this, {
            "vanillaBlock": {
                configurable: false,
                enumerable: false,
                writable: false,
                value: vanillaBlock
            },
            "location": {
                configurable: true,
                enumerable: false,
                writable: false,
                value: location
            },
            "dimension": {
                configurable: true,
                enumerable: false,
                writable: false,
                value: dimension
            },
            "x": {
                configurable: true,
                enumerable: false,
                writable: false,
                value: x
            },
            "z": {
                configurable: true,
                enumerable: false,
                writable: false,
                value: z
            },
            "y": {
                configurable: true,
                enumerable: false,
                writable: false,
                value: y
            },
        });
    }
    get isWaterlogged(){
        return this.vanillaBlock.isWaterlogged;
    }
    set isWaterlogged(v: boolean){
        this.vanillaBlock.isWaterlogged = v;
    }
    /**
     * Gets the type of block.
     * @throws This property can throw when used.
     */
    get type(){
        return this.vanillaBlock.type;
    }
    /**
     * Identifier of the type of block for this block.
     * @throws This property can throw when used.
     */
    get typeId(){
        return this.vanillaBlock.typeId;
    }
    /**
     * Additional block configuration data that describes the
     * block.
     * @throws This property can throw when used.
     */
    get permutation(){
        return this.vanillaBlock.permutation;
    }
    /**
     * @remarks
     * Checks to see whether it is valid to place the specified
     * block type or block permutation, on a specified face on this
     * block
     * @param blockToPlace
     * Block type or block permutation to check placement for.
     * @param faceToPlaceOn
     * Optional specific face of this block to check placement
     * against.
     * @returns
     * Returns `true` if the block type or permutation can be
     * placed on this block, else `false`.
     * @throws This function can throw errors.
     */
    canPlace(blockToPlace: Minecraft.BlockPermutation | Minecraft.BlockType, faceToPlaceOn?: Minecraft.Direction): boolean {
        //@ts-ignore
        return this.vanillaBlock.canPlace.apply(this.vanillaBlock, arguments);
    }
    /**
     * @remarks
     * Gets additional configuration properties (a component) for
     * specific capabilities of particular blocks - for example, an
     * inventory component of a chest block.
     * @param componentName
     * Identifier of the component. If a namespace is not
     * specified, minecraft: is assumed.
     * @returns
     * Returns the component object if it is present on the
     * particular block.
     * @throws This function can throw errors.
     */
    getComponent(componentName: string): any {
        //@ts-ignore
        return this.vanillaBlock.getComponent.apply(this.vanillaBlock, arguments);
    }
    /**
     * @remarks
     * Returns the net redstone power of this block.
     * @returns
     * Returns undefined if redstone power is not applicable to
     * this block.
     * @throws This function can throw errors.
     */
    getRedstonePower(): number | undefined {
        //@ts-ignore
        return this.vanillaBlock.getRedstonePower.apply(this.vanillaBlock, arguments);
    }
    /**
     * @remarks
     * Returns a set of tags for a block.
     * @returns
     * The list of tags that the block has.
     * @throws This function can throw errors.
     */
    getTags(): string[] {
        //@ts-ignore
        return this.vanillaBlock.getTags.apply(this.vanillaBlock, arguments);
    }
    /**
     * @remarks
     * Checks to see if the permutation of this block has a
     * specific tag.
     * @param tag
     * Tag to check for.
     * @returns
     * Returns `true` if the permutation of this block has the tag,
     * else `false`.
     * @throws This function can throw errors.
     * @example check_block_tags.js
     * ```typescript
     *        import { world } from "@minecraft/server";
     *
     *        // Fetch the block
     *        const block = world.getDimension("overworld").getBlock({ x: 1, y: 2, z: 3 });
     *
     *        console.log(`Block is dirt: ${block.hasTag("dirt")}`);
     *        console.log(`Block is wood: ${block.hasTag("wood")}`);
     *        console.log(`Block is stone: ${block.hasTag("stone")}`);
     *
     * ```
     */
    hasTag(tag: string): boolean {
        //@ts-ignore
        return this.vanillaBlock.hasTag.apply(this.vanillaBlock, arguments);
    }
    isAir(): boolean {
        //@ts-ignore
        return this.vanillaBlock.isAir.apply(this.vanillaBlock, arguments);
    }
    isLiquid(): boolean {
        //@ts-ignore
        return this.vanillaBlock.isLiquid.apply(this.vanillaBlock, arguments);
    }
    isSolid(): boolean {
        //@ts-ignore
        return this.vanillaBlock.isSolid.apply(this.vanillaBlock, arguments);
    }
    /**
     * @remarks
     * Sets the block in the dimension to the state of the
     * permutation.
     * @param permutation
     * Permutation that contains a set of property states for the
     * Block.
     * @throws This function can throw errors.
     */
    setPermutation(permutation: Minecraft.BlockPermutation): void {
        //@ts-ignore
        return this.vanillaBlock.setPermutation.apply(this.vanillaBlock, arguments);
    }
    /**
     * @remarks
     * Sets the type of block.
     * @param blockType
     * Identifier of the type of block to apply - for example,
     * minecraft:powered_repeater.
     * @throws This function can throw errors.
     */
    setType(blockType: Minecraft.BlockType): void {
        //@ts-ignore
        return this.vanillaBlock.setType.apply(this.vanillaBlock, arguments);
    }
    /**
     * @remarks
     * Tries to set the block in the dimension to the state of the
     * permutation by first checking if the placement is valid.
     * @param permutation
     * Permutation that contains a set of property states for the
     * Block.
     * @returns
     * Returns `true` if the block permutation data was
     * successfully set, else `false`.
     * @throws This function can throw errors.
     */
    trySetPermutation(permutation: Minecraft.BlockPermutation): boolean {
        //@ts-ignore
        return this.vanillaBlock.trySetPermutation.apply(this.vanillaBlock, arguments);
    }
}

export { Block, Block as YoniBlock };
export default Block;
