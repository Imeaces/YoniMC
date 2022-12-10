import { Minecraft, VanillaWorld } from "yoni/basis.js";
import { Location } from "yoni/Location.js";

export function defineEntityPrototypeFor(targetPrototype, srcPrototype){
    let undefinedKeys = [];
    for (let key in srcPrototype){
        if (key in targetPrototype){
            continue;
        }
        
        let propertyDescriptor = Object.getOwnPropertyDescriptor(srcPrototype, key);
        if ("value" in propertyDescriptor && typeof propertyDescriptor.value === "function"){
            Object.defineProperty(targetPrototype, key, {
                configurable: true,
                enumerable: false,
                writable: false,
                value: function (){
                    return this.vanillaEntity[key].apply(this.vanillaEntity, arguments);
                }
            });
        } else {
            Object.defineProperty(targetPrototype, key, {
                configurable: true,
                enumerable: false,
                get: function (){
                    return this.vanillaEntity[key];
                },
                set: function (value){
                    this.vanillaEntity[key] = value;
                }
            });
        }
    }
}

export function getAliveEntities(option){
    let entities = [];
    
    Object.values(Minecraft.MinecraftDimensionTypes)
        .forEach((dimid)=>{
            for (let ent of VanillaWorld.getDimension(dimid).getEntities(option)){
                entities.push(ent);
            }
        });
    return entities;
}

export function getLoadedEntities(option){
    if (("location" in option || "maxDistance" in option || "minDistance" in option) && !("dimension" in option)){
        throw new Error("'location', 'maxDistance' or 'minDistance' usage in options is not allow, unless specified 'dimension' filed");
    }
    let entities = [];
    let players = [];
    if (option.dimension != null){
        let absoluteLocation = new Location(option);
        let absoluteDimension = absoluteLocation.dimension;
        if (absoluteDimension !== null){
            entities = Array.from(absoluteDimension.getEntities(option));
            //如果有这个属性的话，获取玩家会报错
            if (! ("entityType" in option && option.entityType === "minecraft:player")){
                players = Array.from(absoluteDimension.getPlayers(option));
            }
        }
    } else {
        entities = getAliveEntities(option);
        players = Array.from(VanillaWorld.getPlayers(option));
    }
    
    //如果玩家实体对象不在entities中，则推入
    //虽然很好看，但是可能有隐患
    //不过如果不想它的话，这个代码的确挺好看的
    // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply#%E4%BD%BF%E7%94%A8_apply_%E5%92%8C%E5%86%85%E7%BD%AE%E5%87%BD%E6%95%B0
    entities.push.apply(entities, players.filter(player => {
        return false === entities.includes(player);
    }));
    
    return entities;
}
