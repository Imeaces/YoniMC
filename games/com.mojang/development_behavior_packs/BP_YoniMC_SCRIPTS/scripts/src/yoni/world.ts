import { VanillaWorld, Minecraft } from "./basis.js";
import { getAllDims } from "./dim.js";
import { EntityBase } from "./entity.js";
import Scoreboard from "./scoreboard.js";
import { Dimension } from "./dimension.js";
import { copyPropertiesWithoutOverride } from "./lib/ObjectUtils.js";

import { YoniEntity } from "./entity/Entity.js";
import { YoniPlayer } from "./entity/Player.js";

class World {
    static isWorld(object: any){
        return object instanceof Minecraft.World || object instanceof World;
    }
    
    //@ts-ignore
    readonly vanillaWorld: Minecraft.World;
    get scoreboard(){
        return Scoreboard;
    }
    /**
     * @param {Minecraft.World}
     */
    constructor(vanillaWorld: Minecraft.World){
        Object.defineProperty(this, "vanillaWorld", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: vanillaWorld
        });
    }
    /**
     * 查找游戏中符合特定条件的玩家。
     * @param {Minecraft.EntityQueryOptions} options
     * @yields {YoniPlayer}
     */
    * selectPlayers<YoniPlayer>(options: Minecraft.EntityQueryOptions): Generator<YoniPlayer> {
        for (let pl of VanillaWorld.getPlayers(options)){
            yield EntityBase.from(pl) as unknown as YoniPlayer;
        }
    }
    /**
     * 查找游戏中符合特定条件的玩家。
     * @param {Minecraft.EntityQueryOptions} [option]
     * @yields {YoniPlayer}
     */
    * getPlayers<YoniPlayer>(option?: Minecraft.EntityQueryOptions){
        for (let pl of VanillaWorld.getPlayers(option)){
            yield EntityBase.from(pl) as unknown as YoniPlayer;
        }
    }
    
    /**
     * 获取与 `dimid` 对应的维度对象。
     * @param {string|number} dimid
     * @returns {Dimension}
     */
    getDimension(dimid: string|number){
        //@ts-ignore
        return Dimension.dim(dimid);
    }
    
    /**
     * 获取一个游戏中的所有玩家的对象。
     * @returns {YoniPlayer[]} 一个包含了游戏中所有玩家的对象的数组。
     */
    getAllPlayers(): YoniPlayer[] {
        return Array.from(this.getPlayers());
    }
    
    /**
     * 获取一个包含了当前世界中已经加载的所有实体的对象的数组。
     */
    getLoadedEntities(): YoniEntity[] {
        return getAllDims()
            .map(dim => Array.from(dim.getEntities()))
            .flat()
            .map(ent => EntityBase.from(ent) as unknown as YoniEntity);
    }
    /**
     * 查找游戏中符合特定条件的实体。
     * @param {Minecraft.EntityQueryOptions} options
     * @yields {YoniEntity}
     */
    * selectEntities<YoniEntity>(option: Minecraft.EntityQueryOptions) {
        for (let d of getAllDims()){
            for (let entity of d.getEntities(option)){
                yield EntityBase.from(entity) as unknown as YoniEntity;
            }
        }
    }
    getAliveEntities(){
        return this.getLoadedEntities()
            .filter((ent) => ent.isAlive());
    }
}

copyPropertiesWithoutOverride(World.prototype, Minecraft.World.prototype, "vanillaWorld");

type YoniWorld = World & Minecraft.World;

const world = new World(VanillaWorld);

export { world as World, YoniWorld };
export default World;
