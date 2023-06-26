import { Gametest, EventListener, EntityBase, Minecraft, Location, SimulatedPlayer, Command, Dimension, } from "yoni-mcscripts-lib";
import { logger } from "./logger.js";
export class FakePlayer extends SimulatedPlayer {
    constructor(player, spawnDimension, structureBlockLocation) {
        super(EntityBase.getMinecraftEntity(player));
        this.simulateInfo = Object.freeze({
            spawnDimension: Dimension.dim(spawnDimension),
            structureBlockLocation: Location.createReadonly(spawnDimension, structureBlockLocation),
        });
    }
    simulateInfo;
    #getRelativeLocation(absoluteLocation) {
        let relativeLocation = new Location(this.dimension, absoluteLocation);
        return relativeLocation.subtract(this.simulateInfo.structureBlockLocation);
    }
    #breakBlockCounter = -2;
    #blockBreakCount = 0;
    #blockBreakHandler = {};
    /**
     * 使假玩家破坏某个位置的方块。
     */
    async breakBlock(blockLocation, direction) {
        let handler = new Object();
        this.#blockBreakHandler = handler;
        if (this.#breakBlockCounter === -2) {
            this.#breakBlockCounter = EventListener.register("minecraft:blockBreak", (event) => {
                if (EntityBase.isSameEntity(event.player, this)) {
                    this.#blockBreakCount++;
                }
            });
        }
        let relativeLocation = this.#getRelativeLocation(blockLocation);
        let modCount = this.#blockBreakCount;
        // @ts-ignore
        if (direction)
            // @ts-ignore
            super.breakBlock(relativeLocation.getVanillaBlockLocation(), direction);
        else
            // @ts-ignore
            super.breakBlock(relativeLocation.getVanillaBlockLocation());
        if (this.location.zero().add(blockLocation).getBlock().isAir())
            return;
        //轮询的方法是很蠢，但是有效
        while (this.#blockBreakCount === modCount) {
            if (this.#blockBreakHandler !== handler)
                throw new Error("new blockBreak call has been sent, old request failed");
            await 1;
        }
    }
}
export class FakePlayerManager {
    static async createFakePlayer(dimension, location, name, gamemode = Minecraft.GameMode.survival) {
        if (fakePlayers.has(name))
            throw new Error("fake player existed");
        let pro = new Promise((re) => {
            let req = {
                type: "spawn",
                name,
                gamemode,
                location,
                dimension,
                resolveFunc: re,
            };
            requests.push(req);
        });
        await Command.fetch("execute in the_end positioned 1048576 65536 1048576 rotated 0 0 run gametest run yonimc:fakePlayerSpawner");
        return await pro;
    }
    static getFakePlayer(name) {
        if (fakePlayers.has(name))
            return fakePlayers.get(name);
        throw new Error("no such fake player");
    }
    static removeFakePlayer(name) {
        if (fakePlayers.has(name)) {
            let player = fakePlayers.get(name);
            let req = {
                type: "remove",
                name: player.name,
                player: player.vanillaEntity
            };
            requests.push(req);
            fakePlayers.delete(name);
            return true;
        }
        else {
            return false;
        }
    }
}
let fakePlayers = new Map();
let requests = [];
Gametest.registerAsync("yonimc", "fakePlayerSpawner", async (test) => {
    try {
        while (requests.length > 0) {
            let pendingRequest = requests.shift();
            if (pendingRequest.type === "spawn") {
                let request = pendingRequest;
                spawnSimulatedPlayer(test, request);
            }
            else if (pendingRequest.type === "remove") {
                let request = pendingRequest;
                removeSimulatedPlayer(test, request);
            }
        }
    }
    catch (e) {
        logger.error(e);
    }
})
    .tag(Gametest.Tags.suiteDisabled)
    .maxTicks(2147483647)
    .structureName("yonimc:single_void_structure");
function removeSimulatedPlayer(test, request) {
    test.removeSimulatedPlayer(request.player);
}
function spawnSimulatedPlayer(test, request) {
    let { name, gamemode, location, dimension, resolveFunc } = request;
    if (fakePlayers.has(name)) {
        resolveFunc(fakePlayers.get(name));
        return;
    }
    let spawnedSimulatedPlayer = test.spawnSimulatedPlayer(new Location(0, 0, 0).getVanillaBlockLocation(), name, gamemode);
    let baseLocation = test.worldBlockLocation(new Location(0, 0, 0).getVanillaBlockLocation());
    //@ts-ignore
    let fakePlayer = new FakePlayer(spawnedSimulatedPlayer, test.getDimension(), baseLocation);
    fakePlayer.teleport(new Location({ dimension, location }));
    fakePlayers.set(name, fakePlayer);
    resolveFunc(fakePlayer);
}
