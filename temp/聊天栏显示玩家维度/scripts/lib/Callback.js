import {
    World,
    Commands,
    BlockLocation
} from "Minecraft";

const debug = false; //是否在聊天栏输出报错信息

const print = msg => Commands.run(`say ${JSON.stringify(msg).replace(/\[|\]/g, "")}`);
const printErr = err => (debug && Commands.run(`say §4ERROR: §r${JSON.stringify(err).replace(/\[|\]/g, "")}`));

class Callback {
    static callbacks = [];

    static addCallback(name, func) {
        !this.callbacks[name] && (this.callbacks[name] = []);
        this.callbacks[name].push(func);
    }

    static invokeCallback(name, ...args) {
        if (!this.callbacks[name])
            return;
        for (let func in this.callbacks[name]) {
            try {
                this.callbacks[name][func](...args);
            } catch (error) {
                printErr(error);
            }
        }
    }
}

const events = ["beforeChat", "beforeExplosion", "beforePistonActivate", "blockExplode", "chat", "effectAdd", "entityCreate", "explosion", "pistonActivate", "tick", "weatherChange"];
events.forEach(event => World.events[event] && World.events[event].subscribe((eventData) => Callback.invokeCallback(event, eventData)));

const Dimensions = {
    '0': 'overworld',
    '1': 'nether',
    '2': 'the end',
    'overworld': 0,
    'nether': 1,
    'the end': 2
};

class BlockSource {
    constructor(player) {
        this.player = player;
    }

    setBlock(x, y, z, id, data, destroy) {
        try {
            Commands.run(`execute @a[name="${this.player.name}"] ~~~ setblock ${x} ${y} ${z} ${id} ${data || 0} ${destroy ? "destroy" : "replace"}`);
        } catch (error) {
            printErr(error);
        }
    }

    getDimension() {
        for (let i = 0; i < 3; i++) {
            let dim = World.getDimension(Dimensions[i]);
            let pos = this.player.location;
            let entities = dim.getEntitiesAtBlockLocation(new BlockLocation(Math.floor(pos.x), Math.floor(pos.y) - 1, Math.floor(pos.z)));
            for (let e in entities) {
                if (entities[e].id == "minecraft:player" && entities[e].nameTag == this.player.name)
                    return i;
            }
        }
        return -1;
    }
}

export {
    print,
    Callback,
    Dimensions,
    BlockSource
};