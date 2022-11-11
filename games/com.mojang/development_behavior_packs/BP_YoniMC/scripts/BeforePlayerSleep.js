var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BeforePlayerSleepEventSignal_callbacks;
import { world, MinecraftBlockTypes } from "@minecraft/server";
export class BeforePlayerSleepEvent {
    constructor() {
        this.cancel = false;
    }
}
export class BeforePlayerSleepEventSignal {
    constructor() {
        _BeforePlayerSleepEventSignal_callbacks.set(this, []);
        let event;
        world.events.beforeItemUseOn.subscribe(arg => {
            let block = arg.source.dimension.getBlock(arg.blockLocation);
            if (!arg.source.isSneaking
                && block?.typeId === MinecraftBlockTypes.bed.id
                && block?.dimension.id === "minecraft:overworld"
                && world.getTime() >= 13000 && world.getTime() <= 23000) {
                event = new BeforePlayerSleepEvent;
                event.block = block;
                event.player = Array.from(world.getPlayers({ name: arg.source.nameTag }))[0];
                __classPrivateFieldGet(this, _BeforePlayerSleepEventSignal_callbacks, "f").forEach(callback => callback(event));
                arg.cancel = event.cancel;
            }
        });
    }
    subscribe(callback) {
        __classPrivateFieldGet(this, _BeforePlayerSleepEventSignal_callbacks, "f").push(callback);
        return callback;
    }
    unsubscribe(callback) {
        __classPrivateFieldGet(this, _BeforePlayerSleepEventSignal_callbacks, "f").includes(callback) && delete __classPrivateFieldGet(this, _BeforePlayerSleepEventSignal_callbacks, "f")[__classPrivateFieldGet(this, _BeforePlayerSleepEventSignal_callbacks, "f").indexOf(callback)];
    }
}
_BeforePlayerSleepEventSignal_callbacks = new WeakMap();
//# sourceMappingURL=BeforePlayerSleep.js.map