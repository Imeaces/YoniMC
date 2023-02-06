import { VanillaWorld, dim, Minecraft } from "./basis.js";
import { EntityBase } from "./entity.js";
import Scoreboard from "./scoreboard.js";
import { copyPropertiesWithoutOverride, assignAllPropertiesWithoutOverride } from "./lib/ObjectUtils.js";

import { Entity, Player } from "./entity.js";

/**
 * 代表一种与世界的关系。
 */
class WorldClass {
    // @ts-ignore
    static #instance: WorldClass = null;
    static get instance(){
        if (!WorldClass.#instance) WorldClass.#instance = new WorldClass();
        return WorldClass.#instance;
    }
    
    /**
     * @private
     * @hideconstructor
     */
    constructor(){
        if (WorldClass.#instance)
            throw new TypeError("not a constructor");
    }
    
    /**
     * 查找游戏中符合特定条件的玩家。
     * @param {Minecraft.EntityQueryOptions} options
     * @yields {Player}
     */
    * selectPlayers<Player>(options: Minecraft.EntityQueryOptions){
        for (let pl of VanillaWorld.getPlayers(options)){
            yield EntityBase.from(pl) as unknown as Player;
        }
    }
    
    /**
     * 查找游戏中符合特定条件的玩家。
     * @param {Minecraft.EntityQueryOptions} [option]
     * @yields {Player}
     */
    * getPlayers<Player>(option?: Minecraft.EntityQueryOptions){
        for (let pl of VanillaWorld.getPlayers(option)){
            yield EntityBase.from(pl) as unknown as Player;
        }
    }
    
    /**
     * 获取一个包含了游戏中的所有玩家的对象的数组。
     * @returns {Player[]}
     */
    getAllPlayers(): Player[]{
        return Array.from(this.getPlayers());
    }
    
    /**
     * 获取一个包含了当前世界中已经加载的所有实体的对象的数组。
     */
    getLoadedEntities(): Entity[]{
        return Object.getOwnPropertyNames(Minecraft.MinecraftDimensionTypes)
            .map(dimid => dim(dimid))
            .map(dim => Array.from(dim.getEntities()))
            .flat()
            .map(ent => EntityBase.from(ent));
    }

    /**
     * 查找游戏中符合特定条件的实体。
     * @param {Minecraft.EntityQueryOptions} options
     * @yields {Entity}
     */
    * selectEntities<Entity>(option: Minecraft.EntityQueryOptions) {
        let dimids = Object.getOwnPropertyNames(Minecraft.MinecraftDimensionTypes);
        for (let dimid of dimids){
            let d = dim(dimid);
            for (let entity of d.getEntities(option)){
                yield EntityBase.from(entity) as unknown as Entity;
            }
        }
    }

    getAliveEntities(){
        return this.getLoadedEntities()
            .filter((ent) => ent.isAlive());
    }
    get scoreboard(){
        return Scoreboard;
    }
    get getDimension(){
        return dim;
    }
}

// @ts-ignore
const world: WorldClass = WorldClass;

const VanillaWorldSymbol = Symbol("VanillaWorld");

// @ts-ignore
WorldClass[VanillaWorldSymbol] = VanillaWorld;

// @ts-ignore
copyPropertiesWithoutOverride(WorldClass.prototype, Minecraft.World.prototype, VanillaWorldSymbol);

// @ts-ignore
assignAllPropertiesWithoutOverride(WorldClass, WorldClass.instance);

export default world;
export { world as World };
