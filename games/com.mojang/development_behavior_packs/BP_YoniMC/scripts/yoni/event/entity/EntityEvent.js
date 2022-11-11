import { Event, EventRemover } from "yoni/event.js";
import { Entity } from "yoni/entity.js";

export class EntityEvent extends Event {
    entity;
    get entityType(){
        return this.entity.entityType;
    }
    constructor(entity, ...args){
        super();
        this.entity = Entity.from(entity);
    }
}