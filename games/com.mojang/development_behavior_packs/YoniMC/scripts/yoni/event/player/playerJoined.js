import { Player } from "scripts/yoni/entity.js";
import { EventListener, EventSignal } from "scripts/yoni/event.js";
import { dim, VanillaWorld } from "scripts/yoni/basis.js";

class PlayerJoinedEvent {
    constructor (player){
        this.player = new Player(player);
        Object.freeze(this);
    }
    get cancel(){
        if (new Set(VanillaWorld.getPlayers()).has(this.player.vanillaEntity)) return true;
        return false;
    }
    set cancel(y){
        if (y == true) this.player.kick("加入游戏被取消");
    }
}

let joiningPlayers = new Set();
let e1;
let e2;

const signal = new EventSignal("yonimc:playerJoined", PlayerJoinedEvent)
    .register(()=>{
        e1 = EventListener.register("minecraft:tick", ()=>{
            if (joiningPlayers.size === 0) return;
            
            [...VanillaWorld.getPlayers()].forEach((pl)=>{
                if (joiningPlayers.has(pl)){
                    joiningPlayers.delete(pl);
                    signal.triggerEvent(pl);
                }
            });
        });
        e2 = EventListener.register("minecraft:playerJoin", (event)=>{
            joiningPlayers.add(event.player);
        });
    })
    .unregister(()=>{
        EventListener.unregister(e1);
        EventListener.unregister(e2);
    })
    .registerEvent();
