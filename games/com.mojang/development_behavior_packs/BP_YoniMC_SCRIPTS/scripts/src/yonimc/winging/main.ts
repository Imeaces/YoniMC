import { EventListener, Minecraft, Player, YoniScheduler as Scheduler, World as world, EntityBase } from "yoni-mcscripts-lib";
import { logger } from "../util/logger.js";

const fireRecoverTime = 55;

const fireCooldownTimer: Map<Player, number> = new Map();

const fireworkRocketItem = (function createItem(){
    const item = new Minecraft.ItemStack("minecraft:firework_rocket", 1);
    item.keepOnDeath = true;
    item.lockMode = Minecraft.ItemLockMode.slot;
    item.setLore(["", "", ""]);
    return item;
})();

const elytraItem = (function createItem(){
    const item = new Minecraft.ItemStack("minecraft:elytra");
    item.keepOnDeath = true;
    item.lockMode = Minecraft.ItemLockMode.slot;
    item.setLore(["", "", ""]);
    return item;
})();

EventListener.register("yoni:playerJoined", (event: any) => {
    const player = event.player as Player;
    updateWingingPlayer(player);
});

EventListener.register("minecraft:beforeItemUse",
(event: any) => {
    if (EntityBase.from(event.source)?.hasFamily("winging_human")
    && event.source.location.y > 540
    && event.item.getLore().join("\u0000") === "\x00\x00"){
        event.cancel = true;
    }
});

EventListener.register("minecraft:beforeItemUseOn",
(event: any) => {
    if (EntityBase.from(event.source)?.hasFamily("winging_human")
    && event.item.getLore().join("\u0000") === "\x00\x00"){
        event.cancel = true;
    }
});

EventListener.register("minecraft:beforeItemUse",
(event: any) => {
    if (EntityBase.from(event.source)?.hasFamily("winging_human")
    
    && event.source
        .getComponent("minecraft:equipment_inventory")
        .getEquipment(Minecraft.EquipmentSlot.chest)
        ?.getLore().join("\u0000") === "\u0000\u0000"
    
    && event.item.typeId === "minecraft:firework_rocket"
    && event.item.getLore().join("\u0000") !== "\x00\x00"){
    
        event.cancel = true;
    }
});

EventListener.register("system:scriptEventReceive", (event: Minecraft.ScriptEventCommandMessageEvent) => {
    if (event.id !== "yonimc:species_winging")
        return;
    
    const player = EntityBase.from(event.sourceEntity);
    
    if (player == null || !EntityBase.entityIsPlayer(player)){
        return;
    }
    
    if (event.message === "despawn")
        despawn(player);
});
function despawn(player: Player){
    const comp = player.getComponent("minecraft:equipment_inventory") as Minecraft.EntityEquipmentInventoryComponent;
    console.log("despawn");
    if (comp.getEquipment(Minecraft.EquipmentSlot.chest)
        ?.getLore().join("\u0000") === "\u0000\u0000"){
        
        comp.setEquipment(Minecraft.EquipmentSlot.chest, undefined);
    
    }
    
    const inv = player.getInventory();
    if (inv.getItem(8)?.getLore().join("\u0000") === "\u0000\u0000")
        inv.setItem(8, undefined);
}

Scheduler.runCycleTickTask(function timerCountTask(){
    for (const entry of fireCooldownTimer.entries()){
        const player = entry[0];
        let cooldownTime = entry[1] - 1;

        if (!updateWingingPlayer(player)){
            fireCooldownTimer.delete(player);
            continue;
        }
        // logger.info(cooldownTime);
        if (cooldownTime <= 0){
             addFire(player);
        } else {
             fireCooldownTimer.set(player, cooldownTime);
        }
    }
}, 5, 1);

Scheduler.runCycleTickTask(function getHungerOnGliding(){
    world.getAllPlayers().filter(updateWingingPlayer)
        .filter(player => player.hasTag("flag:status.is_gliding"))
        .forEach(player => {
            appendEffect(
                player,
                Minecraft.MinecraftEffectTypes.hunger,
                fireRecoverTime,
                2,
                false
            );
        });
        
}, 5, fireRecoverTime / 2);

function addFire(player: Player){
    if (!updateWingingPlayer(player))
        return;
    //logger.info("addFire");
    let slownessEffectLevel = 0;
    try {
       slownessEffectLevel = player.getEffect(Minecraft.MinecraftEffectTypes.slowness).amplifier;
    } catch { // no effect
    }
     
    let appandFireRecoverTime = fireRecoverTime + fireRecoverTime * slownessEffectLevel;
    
             //console.info(appandFireRecoverTime);
    fireCooldownTimer.set(player, (fireCooldownTimer.get(player) ?? 0) + appandFireRecoverTime);
    
    if (player.location.y > 540)
        return;
        
    let maxAmount = 1;
    let hotbarItems = [];
    for (let idx = 0; idx < 8; idx++){
        hotbarItems.push(player.getInventory().getItem(idx));
    }
    let lastSlotItem = player.getInventory().getItem(8);
    if (lastSlotItem == null)
        maxAmount ++;
    
    maxAmount += 8 - hotbarItems.filter(v => isItem(v)).length;
    
    if (!isItem(lastSlotItem)){
        lastSlotItem = fireworkRocketItem.clone();
    } else if (lastSlotItem?.getLore().join("\u0000") !== "\u0000\u0000"
    || lastSlotItem.amount >= maxAmount){
        
        return;
    } else {
        lastSlotItem.amount += 1;
    }
    
    appendEffect(player, Minecraft.MinecraftEffectTypes.hunger, fireRecoverTime, 0, false);
    
    player.getInventory().setItem(8, lastSlotItem);
}

function updateWingingPlayer(player: Player){
    
    if (player.hasFamily("winging_human")){
        if (fireCooldownTimer.get(player) == null){
            fireCooldownTimer.set(player, fireRecoverTime);
        }
        const comp = player.getComponent("minecraft:equipment_inventory") as Minecraft.EntityEquipmentInventoryComponent;
        let curItem = comp.getEquipment(Minecraft.EquipmentSlot.chest);
        if (!isItem(curItem) || curItem?.getLore().join("\u0000") === "\u0000\u0000")
            comp.setEquipment(Minecraft.EquipmentSlot.chest, elytraItem.clone());
        return true;
    } else {
        return false;
    }
}

function isItem(item: Minecraft.ItemStack | null | undefined): boolean {
    return item != null && item.typeId != "" && item.typeId != "minecraft:air";
}

function appendEffect(player: Player, effect: Minecraft.EffectType, duration: number, amplifier: number, showParticles: boolean = true){
    let hasSuchEffect = null;
    try {
        hasSuchEffect = player.getEffect(effect);
    } catch {
    }
    
    if (hasSuchEffect != null){
        duration += hasSuchEffect.duration;
        amplifier = Math.max(hasSuchEffect.amplifier, amplifier);
    }
    
    player.addEffect(effect, duration, amplifier, showParticles);
}
