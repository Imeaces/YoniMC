import { Event } from "../../event.js";
import { Minecraft } from "../../basis.js";
import { Entity } from "../../entity.js";

const EntityTypes = Minecraft.EntityTypes;

export class PlayerEvent extends Event{
    constructor(player, ...args){
        super(...args);
        this.#player = Entity.from(player);
    }
    /**
     * @type {Player}
     */
    #player;
    get player(){
        return this.#player;
    }
    eventType = EntityTypes.get("minecraft:player");
}

export default PlayerEvent;
