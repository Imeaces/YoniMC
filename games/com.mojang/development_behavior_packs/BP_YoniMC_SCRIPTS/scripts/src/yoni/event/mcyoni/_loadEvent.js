import { logger } from "../logger.js";

const eventList = [
  "./BeforeItemUseOnEvent.js",
  "./BeforeItemUseEvent.js",
  "./EntityHurtEvent.js",
];

eventList.map(path=>import(path)).forEach(pro => pro.catch(logger.error));
