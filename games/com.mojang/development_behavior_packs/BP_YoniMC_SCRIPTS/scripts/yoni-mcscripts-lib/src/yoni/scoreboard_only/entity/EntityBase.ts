import { EntityValue } from "./EntityTypeDefs.js";
import { Minecraft, Gametest } from "../basis.js";

export class EntityBase {
    static isEntity(one: any): one is EntityValue {
        return one instanceof Minecraft.Entity || one instanceof Minecraft.Player || one instanceof Gametest.SimulatedPlayer;
    }
    static isMinecraftEntity(one: any): one is EntityValue {
        return one instanceof Minecraft.Entity || one instanceof Minecraft.Player || one instanceof Gametest.SimulatedPlayer;
    }
    static entityIsPlayer(one: EntityValue): one is Minecraft.Player {
        return one instanceof Minecraft.Player || one instanceof Gametest.SimulatedPlayer;
    }
    /**
     * 检查一个东西是否为实体
     * @param {any} object - 任意
     * @throws 当不是实体的时候抛出错误
     */
    static checkIsEntity(object: any){
        if (!EntityBase.isEntity(object))
            throw new TypeError("Not a Entity type");
    }
    /**
     * 得到一个Minecraft.Entity
     * @param {EntityValue} entity
     * @returns {MinecraftEntityType}
     */
    static getMinecraftEntity(entity: EntityValue): Minecraft.Entity {
        if (EntityBase.isMinecraftEntity(entity))
            return entity;
        throw new Error("no reference");
    }
}
