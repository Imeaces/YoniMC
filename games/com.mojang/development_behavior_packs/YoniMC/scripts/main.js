import ChatCommand from "scripts/yoni/command/ChatCommand.js";
import {
    Minecraft,
    VanillaWorld,
    VanillaEvents,
    runCmd, dim
    } from "scripts/yoni/basis.js";
import YoniEntity as Entity from "scripts/yoni/entity.js";
import { tell, say } from "scripts/yoni/util/yoni-lib.js";
import Command from "scripts/yoni/command.js";
import SimpleScoreboard from "scripts/yoni/scoreboard/SimpleScoreboard.js";
import EntryType from "scripts/yoni/scoreboard/EntryType.js";
import EventListener from "scripts/yoni/event.js";
import { EntityDamageCause } from "mojang-minecraft";

class SpeciesCommandExecutor {
    onCommand(sender, rawCommand, label, args){
        let obj = SimpleScoreboard.getObjective("species");
        if (obj == null){
            obj = SimpleScoreboard.addObjective("species", "dummy");
        }
        obj.setScore(sender, Number(args[0]));
    }
}

//切换物种命令（使用id作为参数）
ChatCommand.registerCommand("species", new SpeciesCommandExecutor());

//自杀命令
ChatCommand.registerCommand("suicide", (sender) => sender.kill() );

ChatCommand.registerCommand("test", (sender) => {
    say(new Entity(sender).getHealthComponent().value);
});

EventListener.register("tick", (event) => {
    if (event.currentTick % 10 != 0) return;
    Array.from(Minecraft.world.getPlayers()).forEach((e)=>{
        if (e.isSneaking === true){
           if (!e.hasTag("stat:is_sneaking")){
               //Command.execute(e, "say 我正在潜行");
               e.addTag("stat:is_sneaking");
           }
        } else if (e.isSneaking === false){
           if (e.hasTag("stat:is_sneaking")){
               //Command.execute(e, "say 我没有再潜行了");
               e.removeTag("stat:is_sneaking");
           }
        }
    });
    let healthObj = SimpleScoreboard.getObjective("health");
    if (healthObj == null) healthObj = SimpleScoreboard.addObjective("health", "dummy");
    let maxHealthObj = SimpleScoreboard.getObjective("max_health");
    if (maxHealthObj == null) maxHealthObj = SimpleScoreboard.addObjective("max_health", "dummy");
    Array.from(Minecraft.world.getPlayers()).filter((e)=>{
        return e.hasTag("test:health");
    }).forEach((e) => {
        let comp = e.getComponent("minecraft:health");
        healthObj.setScore(e, comp.current);
        maxHealthObj.setScore(e, comp.value);
    });
});

EventListener.register("itemUse", (event) => {
    if (event.source != null && event.source instanceof Minecraft.Player){
        let ent = event.source;
        if (ent.hasTag("event:itemUse")){
           ent.removeTag("event:itemUse");
        }
    }
});

EventListener.register("itemUseOn", (event) => {
    if (event.source != null && event.source instanceof Minecraft.Player){
        let ent = event.source;
        if (ent.hasTag("event:itemUseOn")){
           ent.removeTag("event:itemUseOn");
        }
    }
});

EventListener.register("beforeItemUseOn", (event) => {
    if (event.source != null && event.source instanceof Minecraft.Player){
        let ent = event.source;
        if (!ent.hasTag("event:itemUseOn")){
            ent.addTag("event:itemUseOn");
        }
    }
});

EventListener.register("beforeItemUse", (event)=> {
    if (event.source != null && event.source instanceof Minecraft.Player){
        let ent = event.source;
        if (!ent.hasTag("event:itemUse")){
           ent.addTag("event:itemUse");
        }
    }
    if (event.item.id == "minecraft:lava_bucket" && event.source != null && Entity.hasFamily(event.source, "guxi")){
        let ent = event.source;
        say("using lava");
        Command.execute(ent, "replaceitem entity @s slot.weapon.mainhand 0 bucket 1");
        let lavaBucketEnergyVolume = SimpleScoreboard.getObjective("guxi:values").getScore("lava_bucket_energy_volume");
        SimpleScoreboard.getObjective("guxi:energy").addScore(ent, Math.round(lavaBucketEnergyVolume*Math.max(1, 100*Math.random())));
        ent.dimension.spawnItem(new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.obsidian, 1, 0), ent.location);
    }
});

EventListener.register("beforeExplosion", (event) => {
   say("爆炸已取消，影响方块"+event.impactedBlocks.length+"个");   
   event.cancel = true;
});

EventListener.register("entityHurt", (event)=> {
    if (Entity.hasFamily(event.hurtEntity, "guxi")){
        let ent = event.hurtEntity;
        let damage = event.damage;
        Command.execute(ent, "tell @s "+event.cause+": "+event.damage);
        let obj = SimpleScoreboard.getObjective("guxi:energy_pool");
        let immuObj = SimpleScoreboard.getObjective("guxi:ef_fireimmu");
        switch(event.cause){
            case EntityDamageCause.fire:
            case EntityDamageCause.fireTick:
            case EntityDamageCause.freezing:
            case EntityDamageCause.lava:
            case EntityDamageCause.magma:
                Command.execute(ent, "effect @s instant_health 1 20 false");
                obj.addScore(ent, Math.round(damage*Math.max(1, 100*Math.random())));
                immuObj.setScore(ent, Math.round(Math.max(4, immuObj.getScore(ent)*3.1*Math.random())));
                if (Math.random()*10000<=3){
                    Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 obsidian 0 replace lava 0");
                    Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 netherrack 0 replace magma -1");
                    Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 obsidian 0 replace flowing_lava 0");
                    Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace lava -1");
                    Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace flowing_lava -1");
                    Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace fire -1");
                }
                break;
            case EntityDamageCause.piston:
                //nothing
                break;
            case EntityDamageCause.projectile:
            case EntityDamageCause.flyIntoWall:
            case EntityDamageCause.fall:
            case EntityDamageCause.fallingBlock:
            case EntityDamageCause.entityExplosion:
            case EntityDamageCause.blockExplosion:
            case EntityDamageCause.anvil:
                obj.removeScore(ent, damage/Entity.getMaxHealth(ent)*2*obj.getScore(ent));
            default:
                obj.removeScore(ent, Math.round(damage/Entity.getMaxHealth(ent)*obj.getScore(ent)));
        }
    } else if (Entity.hasFamily(event.damagingEntity, "guxi")){
        try {Command.execute(event.damagingEntity,"tell @s 伤害: " + event.damage);
        } catch {}
        let cost = Math.round(event.damage*72*(SimpleScoreboard.getObjective("guxi:ef_damage").getScore(event.damagingEntity)+1));
        say(cost);
        if (cost < 1) return;
        
        let obj = SimpleScoreboard.getObjective("guxi:energy_pool");
        obj.removeScore(event.damagingEntity, cost);
    }
});

console.warn("scripts main end");