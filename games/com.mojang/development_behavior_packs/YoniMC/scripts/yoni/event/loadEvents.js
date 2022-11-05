import { load } from "yoni/loader.js";
const loader = load.getLoader("yoni/event/");
const eventList = new Set()
   .add("entity/EntityMovementEvent.js")
   .add("player/PlayerDeadEvent.js")
   .add("player/PlayerJoinedEvent.js")
   .add("world/TickEvent.js");

Array.from(eventList).forEach(path=>loader(path));
