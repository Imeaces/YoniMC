import { Gametest, Minecraft, Location, YoniSimulatedPlayer, SimulatedPlayer, YoniDimension } from "yoni-mcscripts-lib";
import { DimensionLikeValue as DimensionLike, Vector3 } from "yoni-mcscripts-lib";
export declare class FakePlayer extends SimulatedPlayer {
    #private;
    constructor(player: Gametest.SimulatedPlayer | YoniSimulatedPlayer, spawnDimension: DimensionLike, structureBlockLocation: Vector3);
    simulateInfo: Readonly<{
        spawnDimension: YoniDimension;
        structureBlockLocation: Readonly<Location>;
    }>;
    /**
     * 使假玩家破坏某个位置的方块。
     */
    breakBlock(blockLocation: Vector3, direction?: Minecraft.Direction): Promise<void>;
}
export declare type YonimcFakePlayer = FakePlayer & Gametest.SimulatedPlayer;
export declare class FakePlayerManager {
    static createFakePlayer(dimension: DimensionLike, location: Vector3, name: string, gamemode?: Minecraft.GameMode): Promise<YonimcFakePlayer>;
    static getFakePlayer(name: string): YonimcFakePlayer;
    static removeFakePlayer(name: string): boolean;
}
