import { ScoreboardIdentityType as VanillaScoreType } from "mojang-minecraft";

export default class DisplaySlot {
    static PLAYER = VanillaScoreType.player;
    static ENTITY = VanillaScoreType.entity;
    static FAKE_PLAYER = VanillaScoreType.fakePlayer;
}