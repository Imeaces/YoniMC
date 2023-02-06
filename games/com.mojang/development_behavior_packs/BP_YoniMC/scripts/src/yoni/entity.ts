import { EntityBase } from "./entity/EntityBase.js";
import Entity from "./entity/Entity.js";
import Player from "./entity/Player.js";
import SimulatedPlayer from "./entity/SimulatedPlayer.js";

// to load entity class sync
import "./entity/Entity.js";
import "./entity/Player.js";
import "./entity/SimulatedPlayer.js";

export default EntityBase;
export {
    EntityBase,
    SimulatedPlayer,
    Player,
    Entity
};
