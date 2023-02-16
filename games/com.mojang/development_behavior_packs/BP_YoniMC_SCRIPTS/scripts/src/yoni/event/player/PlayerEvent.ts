import { Event } from "../../event.js";
import { Minecraft } from "../../basis.js";
import { EntityBase, Player } from "../../entity.js";

const EntityTypes = Minecraft.EntityTypes;

export class PlayerEvent extends Event {
    constructor(player: Player, ...args: any[]){
        super(...args);
        this.#player = EntityBase.from(player) as unknown as Player;
    }
    /**
     * @type {Player}
     */
    #player: Player;
    get player(){
        return this.#player;
    }
    eventType = EntityTypes.get("minecraft:player");
}

export default PlayerEvent;
