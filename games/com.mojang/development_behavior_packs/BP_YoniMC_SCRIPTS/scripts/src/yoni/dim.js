import { Minecraft, dim, VanillaWorld } from "./basis.js";
import { getKeys } from "./lib/ObjectUtils.js";

export const DimensionValues = Object.freeze({
    "minecraft:nether": dim.nether,
    "nether": dim.nether,
    "-1": dim.nether,
    "minecraft:overworld": dim.overworld,
    "overworld": dim.overworld,
    "0": dim.overworld,
    "minecraft:the_end": dim.theEnd,
    "the_end": dim.theEnd,
    "the end": dim.theEnd,
    "theEnd": dim.theEnd,
    "1": dim.theEnd
});

/**
 * @param {any} value
 * @returns {Minecraft.Dimension}
 */
export function fromValueGetDimension(value){
    if (value instanceof Minecraft.Dimension){
        return value;
    } else if (value in DimensionValues){
        return DimensionValues[value];
    } else {
        throw new Error("unknown dimension");
    }
}

/**
 * @returns {Minecraft.Dimension[]}
 */
export function getAllDims(){ 
    return [dim(0), dim(1), dim(-1)];
    let ks = getKeys(Object.getPrototypeOf(Minecraft.MinecraftDimensionTypes));
    return Object.getOwnPropertyNames(Minecraft.MinecraftDimensionTypes)
        .filter(k => {
            return false == k.includes(ks);
        })
        .map(dimid => VanillaWorld.getDimension(dimid));
}