import { load } from "../loader.js";
const loader = load.getLoader("./event/");
const eventList = new Set()
   .add("entity/EntityMovementEvent.js")
   .add("player/PlayerDeadEvent.js")
   .add("player/PlayerRespawnEvent.js")
   .add("player/PlayerJoinedEvent.js")
   .add("player/PlayerTeleportDimensionEvent.js")
   .add("world/raid/RaidTriggerEvent.js")
   .add("world/TickEvent.js");

Array.from(eventList).forEach(path=>loader(path));
