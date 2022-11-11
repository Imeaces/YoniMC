import { VanillaWorld, dim } from "./basis.js";
import { YoniEntity } from "./entity.js";
import Scoreboard from "./scoreboard.js";

export const World = new Proxy({src: VanillaWorld}, {
    get: (target, prop)=>{
        switch (prop){
            case "getLoadedEntities":
                return YoniEntity.getLoadedEntities;
            case "getPlayers":
                return getYoniPlayers;
            case "scoreboard":
                return Scoreboard;
            case "getDimension":
                return dim;
            default:
                return target.src[prop];
        }
    }
});

function getYoniPlayers(options){
    return [...VanillaWorld.getPlayers(options)].map(pl=>YoniEntity.from(pl));
}
