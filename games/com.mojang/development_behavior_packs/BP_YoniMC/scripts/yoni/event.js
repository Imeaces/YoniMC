import { Event, EventRemover } from "./event/Event.js";
import { EventTypes, EventRegisterListener } from "./event/Types.js";
import { EventSignal } from "./event/Signal.js";
import { EventListener } from "./event/Listener.js";
import { EventTrigger } from "./event/Trigger.js";
import { EventTriggerBuilder } from "./event/TriggerBuilder.js";

export default EventTypes;
export {
    Event,
    EventRemover,
    EventTypes,
    EventSignal,
    EventTrigger,
    EventTriggerBuilder,
    EventRegisterListener,
    EventListener
};

import("./event/_loadEvents.js");
