import { Event } from "yoni/event.js";
import { Minecraft } from "yoni/basis.js";
import { Entity } from "yoni/entity.js";

const EntityTypes = Minecraft.EntityTypes;

export class PlayerEvent extends Event{
    constructor(player, ...args){
        super(...args);
        this.#player = Entity.from(player);
    }
    #player;
    get player(){
        return this.#player;
    }
    eventType = EntityTypes.get("minecraft:player");
}

export default PlayerEvent;