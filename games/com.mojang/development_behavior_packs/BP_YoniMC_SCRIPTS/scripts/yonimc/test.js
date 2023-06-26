import { EventListener, Minecraft } from "yoni-mcscripts-lib";
EventListener.register("entityMovement", function (event) {
    const { entity } = event;
    const { dimension } = entity;
    if (event.movementKeys.includes("x")
        || event.movementKeys.includes("z"))
        dimension.spawnParticle("minecraft:endrod", event.to.getVanillaLocation(), new Minecraft.MolangVariableMap());
}, { entityTypes: ["minecraft:player"] });
