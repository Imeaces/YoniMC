let entityMap = new WeakMap();

export class EntityBase {
    /**
     * @hideconstructor
     */
    constructor(entity){
        
        if (entityMap.has(entity)){
            throw new Error("not allow create a entity object use constructor, use Entity.from()");
        }
        
        //如果不是MCEntity则报错
        if (!Entity.isMinecraftEntity(entity))
            throw new TypeError("There is not a Minecraft Entity type");
        
        Object.defineProperty(this, "vanillaEntity", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: entity
        });
    }
    
    static getYoniEntity(vanillaEntity){
        return entityMap.get(vanillaEntity);
    }
    
}