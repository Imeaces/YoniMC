import { Event } from "../../event.js";
import { Entity } from "../../entity.js";

export class EntityEvent extends Event {
    get entity(){
        return super.entity;
    }
    get entityType(){
        return this.entity.entityType;
    }
    constructor(entity, ...args){
        super({entity: Entity.from(entity)}, ...args);
    }
}