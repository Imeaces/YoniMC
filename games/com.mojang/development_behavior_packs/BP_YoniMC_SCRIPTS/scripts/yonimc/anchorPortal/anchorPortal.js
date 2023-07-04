import { logger } from "../util/logger.js";
import { EventListener, YoniScheduler, Location, EntityBase, Command, Minecraft, dim } from "yoni-mcscripts-lib";
const radius = 8;
EventListener.register("minecraft:beforeEvents.ItemUseOn", (event) => {
    if (event.source.typeId !== "minecraft:player")
        return;
    let centerLocation = new Location(event.source.dimension, event.block);
    if (centerLocation.dimension.vanillaDimension === dim.theEnd)
        return;
    let source = EntityBase.getYoniEntity(event.source);
    let block = centerLocation.getBlock();
    if (block.typeId !== "minecraft:respawn_anchor")
        return;
    let chargeLevel = block.permutation.getState("respawn_anchor_charge");
    if (chargeLevel !== 4)
        return;
    event.cancel = true;
    teleportNearToNewDimension(centerLocation, (centerLocation.dimension.vanillaDimension === dim.overworld) ?
        dim.nether :
        dim.overworld).catch(logger.error);
});
async function teleportNearToNewDimension(centerLocation, toDimension) {
    let affaceEntities = Array.from(centerLocation.dimension.getPlayers({
        location: centerLocation.getVanillaLocation(),
        maxDistance: radius
    }));
    let toLocation = centerLocation.clone();
    toLocation.setDimension(toDimension);
    if (toDimension === dim.overworld) {
        toLocation.x /= 8;
        toLocation.z /= 8;
    }
    else {
        toLocation.x *= 8;
        toLocation.z *= 8;
    }
    affaceEntities.filter(e => e.typeId === "minecraft:player")
        .map(pl => EntityBase.getYoniEntity(pl))
        .forEach((pl) => {
        pl.sendMessage("连接维度意识");
    });
    YoniScheduler.runDelayTickTask(() => {
        centerLocation.getBlock().setType(Minecraft.MinecraftBlockTypes.get("minecraft:air"));
        centerLocation.dimension.createExplosion(centerLocation.getVanillaLocation(), radius, {
            breaksBlocks: true,
            allowUnderwater: false,
            causesFire: true
        }); //testing
        affaceEntities.map(e => EntityBase.getYoniEntity(e))
            .forEach((e) => {
            e.teleport(toLocation);
            if (e.typeId === "minecraft:player") {
                YoniScheduler.runDelayTickTask(() => {
                    Command.postExecute(e, [
                        "fill ~-1 ~ ~-1 ~1 ~2 ~1 air 0 destroy",
                        "fill ~-1 ~-1 ~-1 ~1 ~-1 ~1 obsidian 0 destroy",
                        "setblock ~ ~-1 ~ glowstone"
                    ]);
                }, 5);
            }
        });
    }, 15);
}
