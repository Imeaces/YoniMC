import { ChatCommand, Location, EventListener, Utils } from "yoni-mcscripts-lib";
import { logger } from "./logger.js";
import { FakePlayerManager } from "./FakePlayer.js";

const { say } = Utils;

globalThis._=EventListener.register("minecraft:blockPlace", event => {
    let { player, block } = event;
    say(block.typeId);
});
//EventListener.unregister(_);

let pl = null;
let fff0 = async (sender, command, label, args) => {
    let [dim, x, y, z] = args;
    let tLoc = new Location (dim,
        Number(x),
        Number(y),
        Number(z)
    );
        
    if (pl == null){
        pl = await FakePlayerManager.createFakePlayer(
            sender.dimension,
            sender.location,
            "digger", 
            sender.gamemode
        );
        pl.getComponent("scale").value = 0.0001;
        pl.addEffect(Minecraft.MinecraftEffectTypes.haste, 20000000, 127, true);
        pl.addEffect(Minecraft.MinecraftEffectTypes.instantHealth, 20000000, 127, true);
        pl.addEffect(Minecraft.MinecraftEffectTypes.resistance, 20000000, 127, true);
        pl.addEffect(Minecraft.MinecraftEffectTypes.fireResistance, 20000000, 127, true);
    }
    pl.teleport(tLoc);
    pl.breakBlock(tLoc.getVanillaBlockLocation());
}

ChatCommand.registerCommand("dig", function (){
    fff0.apply(null, arguments)
        .catch(logger.error);
});

ChatCommand.registerCommand("fakeplayer", (sender, command, label, args) => {
    let action = args[0];
    
    if (action == "spawn"){
        let [action, name, x, y, z, gamemode] = args;
        let location = sender.location;
        
        if (name == null || name.trim() == ""){
            sender.sendMessage("未指定名字");
            return;
        }
        
        if (!(x && y && z)){
            x = location.x;
            y = location.y;
            z = location.z;
        } else {
            x = Number(x);
            y = Number(y);
            z = Number(z);
        }
        
        if (!gamemode) gamemode = "survival";
        
        FakePlayerManager.createFakePlayer(
            sender.dimension,
            { x, y, z },
            name, 
            gamemode
        )
        .catch(logger.error)
        
    } else if (action){
        sender.sendMessage("未知命令");
    } else { 
        sender.sendMessage("未指定子命令");
    }
    
});
