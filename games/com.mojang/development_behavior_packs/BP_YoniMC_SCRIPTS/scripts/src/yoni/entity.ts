import { EntityBase } from "./entity/EntityBase.js";
import { Entity, YoniEntity } from "./entity/Entity.js";
import { Player, YoniPlayer } from "./entity/Player.js";
import { SimulatedPlayer, YoniSimulatedPlayer } from "./entity/SimulatedPlayer.js";

// to load entity class sync
import "./entity/Entity.js";
import "./entity/Player.js";
import "./entity/SimulatedPlayer.js";

export default EntityBase;
export {
    // util
    EntityBase,
    
    // classes
    SimulatedPlayer,
    Player,
    Entity,
    
    // types
    YoniSimulatedPlayer,
    YoniPlayer,
    YoniEntity,
};
