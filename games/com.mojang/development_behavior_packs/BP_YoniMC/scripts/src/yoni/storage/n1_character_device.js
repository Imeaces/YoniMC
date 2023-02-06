import { ScoreboardObjectiveEntryIndexMapper } from "./n0_block_device.js";

export class CharacterDevice {
    static openDevice(deviceId){
        return new CharacterDevice(CharacterDevice.#symbol, deviceId);
    }
    static closeDevice(deviceInstance){
    }
}
