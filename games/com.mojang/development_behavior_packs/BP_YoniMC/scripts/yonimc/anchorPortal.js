import "yoni/index.js";
import { logger } from "./logger.js";

const radius = 8;
EventListener.register("minecraft:itemUseOn", (event)=>{
    if (event.source.typeId !== "minecraft:player") return;
    
    let centerLocation = new Location(event.source.dimension, event.blockLocation);
    
    if (centerLocation.dimension === dim.theEnd) return;
    
    let source = YoniEntity.from(event.source);
    
    let block = centerLocation.getBlock();
    
    if (block.typeId !== "minecraft:respawn_anchor") return;
    
    let chargeLevel = block.permutation.getProperty("respawn_anchor_charge").value;
    
    if (chargeLevel !== 4) return;
    
    event.cancel = true;
    
    teleportNearToNewDimension(
        centerLocation,
        (centerLocation.dimension === dim.overworld) ?
            dim.nether :
            dim.overworld
    ).catch(logger.error);
});

async function teleportNearToNewDimension(centerLocation, toDimension){
    let affaceEntities = Entity.getAliveEntities({
        dimension: centerLocation.dimension,
        location: centerLocation.getVanillaLocation(),
        maxDistance: radius
    });
    console.debug(affaceEntities.length);
    let toLocation = centerLocation.clone();
    toLocation.dimension = toDimension;
    if (toDimension === dim.overworld){
        toLocation.x /= 8;
        toLocation.z /= 8;
    } else {
        toLocation.x *= 8;
        toLocation.z *= 8;
    }
    
    affaceEntities.filter(e => e.typeId === "minecraft:player")
    .map( pl => Entity.from(pl) )
    .forEach((pl)=>{
        pl.sendMessage("连接维度意识");
    });
    
    YoniScheduler.runDelayTickTask(()=>{
    
        centerLocation.getBlock().setType(Minecraft.MinecraftBlockTypes.get("minecraft:air"));
        
        centerLocation.dimension.createExplosion(
            centerLocation.getVanillaLocation(),
            radius,
            {
                breaksBlocks:true,
                allowUnderwater:false,
                causesFire: true
            }
        );
        
        affaceEntities.map(e => Entity.from(e) )
        .forEach(async (e)=>{
            e.teleport(toLocation);
            /*if (e.typeId === "minecraft:player"){
                YoniScheduler.runDelayTickTask(()=>{
                    Command.postExecute(e, [
                        "fill ~-1 ~ ~-1 ~1 ~2 ~1 air 0 destroy",
                        "fill ~-1 ~-1 ~-1 ~1 ~-1 ~1 obsidian 0 destroy",
                        "setblock ~ ~-1 ~ glowstone"
                    ]);
                }, 5);
            }*/
        });
        
    }, 15);
}
/*
async function doTeleport(dimension, location, tick=10){
    if (tick > 0){
        runTask(()=>{
            doTeleport(dimension, location, tick-1);
        });
        return;
    }
    try{
    
    let destinationDim = null;
    let 乘数 = null;
    let height = null;
    if (dimension.id === "minecraft:nether"){
        destinationDim = world.getDimension("overworld");
        乘数 = 1/8;
        height = Math.random()*384-64;
        Command.addExecute(Command.PRIORITY_HIGHEST, dimension, `setblock ${location.x} ${location.y} ${location.z} air`);
        dimension.createExplosion(
            new Minecraft.Location(
                location.x,
                location.y,
                location.z,
            ),
            8,
            {
                breaksBlocks:true,
                allowUnderwater:false,
                causesFire: true
            }
        )
    } else if (dimension.id === "minecraft:overworld"){
        destinationDim = world.getDimension("nether");
        height = Math.random()*110+10;
        乘数 = 8;
    } else {
        return;
    }
    let nearPlayers = Array.from(
        dimension.getEntities({
            location: new Minecraft.Location(
                location.x,
                location.y,
                location.z
            ),
            maxDistance: 8
        })
    ).map(ent=>YoniEntity.from(ent));
    
    nearPlayers.forEach(source=>{
        let oloc = source.location;
        let rotation = source.rotation;
        source.teleport({
                x: oloc.x*乘数,
                y: height,
                z: oloc.z*乘数
            },
            destinationDim,
            rotation.x,
            rotation.y,
            false
        );
        if (source.typeId === "minecraft:player"){
            source.sendMessage("连接维度意识");
            Command.addExecute(Command.PRIORITY_LOWEST, source, `fill ~-1 ~ ~-1 ~1 ~2 ~1 air 0 destroy`);
            Command.addExecute(Command.PRIORITY_LOWEST, source, `fill ~-1 ~-1 ~-1 ~1 ~-1 ~1 obsidian 0 destroy`);
            Command.addExecute(Command.PRIORITY_LOWEST, source, `setblock ~ ~-1 ~ glowstone`);
        }
    });
    } catch(e){
        console.error(e);
    }
}
*/