import { Entry } from "./Entry.js";
import { Minecraft } from "../basis.js";
import { EntityBase } from "../entity.js";

/**
 * 可以被作为分数持有者的类型。
 * 这包括原版的实体对象，yoni的实体对象，原版的scbid，yoni的Entry，以及虚拟玩家名称，或是scbid的数字形式。
 */
export type EntryValueType = Entry | Minecraft.ScoreboardIdentity | Minecraft.Entity | string | number | EntityBase;

export enum EntryType {
    /**
     * 玩家类型的分数持有者。
     */
    PLAYER = Minecraft.ScoreboardIdentityType.player,
    /**
     * 实体类型的分数持有者。
     */
    ENTITY = Minecraft.ScoreboardIdentityType.entity,
    /**
     * 记分板虚拟玩家类型的分数持有者。
     */
    FAKE_PLAYER = Minecraft.ScoreboardIdentityType.fakePlayer,
}
