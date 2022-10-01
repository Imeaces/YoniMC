import { VanillaEvents } from "scripts/yoni/basis.js";

let callbacks = [];

export class PlayerJoiningEvent {
    constructor(player){
        this.player = player;
        Object.freeze(this);
    }
}

export class PlayerJoiningEventSignal {
    static subscribe(f){
        callbacks.push(f);
        if (callbacks.length > 0){
            tick.subscribe(triggerEvent);
        }
    }
    static unsubscribe(callback){
        callbacks = callbacks.filter((f)=>{
            if (f === callback){
                return;
            } else {
                return f;
            }
        });
        if (callbacks.length < 1){
            tick.unsubscribe(triggerEvent);
        }
    }
}

const triggerEvent = function (e){
    callbacks.forEach((f)=>{
        let event = new PlayerJoiningEvent(e.player);
        f(event);
    });
};
