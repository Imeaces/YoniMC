import "yoni/index.js";
EventListener.register("minecraft:itemUseOn", (event)=>{
    if (event.source.typeId !== "minecraft:player") return;
    let source = YoniEntity.from(event.source);
    let block = source.dimension.getBlock(event.blockLocation);
    let blockLocation = event.blockLocation;
    if (block.typeId !== "minecraft:respawn_anchor") return;
    let chargeLevel = block.permutation.getProperty("respawn_anchor_charge").value;
    if (chargeLevel !== 4) return;
    doTeleport(source.dimension, blockLocation);
});
async function doTeleport(dimension, location, tick=10){
    if (tick > 0){
        runTask(()=>{
            doTeleport(dimension, location, tick-1);
        });
        return;
    }
    console.error("doing ttt");
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
/*
Array.from(EventTypes.getEventTypes().keys()).forEach(key=>{
    if (key!=="minecraft:tick"&&key.startsWith("minecraft:")){
        EventListener.register(key,()=>{
            console.debug("触发了事件{}",key);
        });
    }
});
*/