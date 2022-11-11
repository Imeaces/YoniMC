import { EventSignal, EventListener } from "yoni/event.js";
import { PlayerEvent } from "./PlayerEvent.js";

class PlayerSleepEvent extends PlayerEvent {
    constructor(player, bed, setCancel){
        super(player);
        this.bed = bed;
        this.setCancel = setCancel;
    }
    setCancel;
    set cancel(bool){
        this.setCancel(bool);
    }
    getBed(){
        return bed;
    }
}

const signal = EventSignal.builder("yoni:playerSleep")
    