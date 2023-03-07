import { logger } from "./logger.js";

const eventList = [
  "./entity/EntityMovementEvent.js",
  "./player/PlayerDeadEvent.js",
  "./player/PlayerRespawnEvent.js",
  "./player/PlayerJoinedEvent.js",
  "./player/PlayerTeleportDimensionEvent.js",
  "./world/raid/RaidTriggerEvent.js",
  "./world/TickEvent.js",
  "./mcyoni/_loadEvent.js",
];

eventList.map(path=>import(path)).forEach(pro => pro.catch(logger.error));
