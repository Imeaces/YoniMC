import { ScoreboardIdentityType as VanillaScoreboardIdentityType } from "mojang-minecraft";

export default class EntryType {
    static PLAYER = VanillaScoreboardIdentityType.player;
    static ENTITY = VanillaScoreboardIdentityType.entity;
    static FAKE_PLAYER = VanillaScoreboardIdentityType.fakeplayer;
}
