import { Event } from "../../event.js";
import { EntityBase } from "../../entity.js";

export class EntityEvent extends Event {
    get entity(){
        return super.entity;
    }
    get entityType(){
        return this.entity.entityType;
    }
    constructor(entity, ...args){
        super({entity: EntityBase.from(entity)}, ...args);
    }
}
