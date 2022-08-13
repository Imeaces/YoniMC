import ChatCommand from "scripts/yoni/command/ChatCommand.js";
import { Minecraft, vanillaWorld, runCmd, vanillaScoreboard, dim } from "scripts/yoni/basis.js";
import YoniEntity from "scripts/yoni/entity.js";
import { say } from "scripts/yoni/util/yoni-lib.js";
import { Command } from "scripts/yoni/command.js";
import SimpleScoreboard from "scripts/yoni/scoreboard/SimpleScoreboard.js";
import Entry from "scripts/yoni/scoreboard/Entry.js";
import { Listener } from "scripts/yoni/Listener.js";
import { EntityDamageCause, Entity, Player as VanillaEntity } from "mojang-minecraft";

class SpeciesCommandExecutor {
    onCommand(sender, rawCommand, label, args){
        let obj = SimpleScoreboard.getObjective("species");
        obj.setScore(sender, Number(args[0]));
    }
}
class TestCommandExecutor {
    onCommand(sender, rawCommand, label, args){
        try {
            dim(0).runCommand("execute if entity gy6");
        } catch (err){
            let c = JSON.parse(err);
            for (let s in c){
                runCmd("say "+s);
            }
        }
    }
}

ChatCommand.registerCommand("species", new SpeciesCommandExecutor());
ChatCommand.registerCommand("test", new TestCommandExecutor());
ChatCommand.registerCommand("suicide", (sender) => sender.kill() );

runCmd("titleraw @a times 0 20 0");


Listener(vanillaWorld.events.beforeItemUse, (event)=> {
    if (event.item.id == "minecraft:lava_bucket" && YoniEntity.hasFamily(event.source, "guxi")){
        Command.execute(event.source, "replaceitem entity @s slot.weapon.mainhand 0 bucket 1");
        Command.execute(event.source, "scoreboard players add @s guxi:energy 297552");
        event.source.dimension.spawnItem(new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.obsidian, 1, 0), event.source.location);
    }
});
Listener(vanillaWorld.events.entityHurt, (event)=> {
    if (YoniEntity.hasFamily(event.hurtEntity, "guxi")){
        let ent = event.hurtEntity;
        let damage = event.damage;
        Command.execute(ent, "tell @s "+event.cause+": "+event.damage);
        switch(event.cause){
            case EntityDamageCause.fire:
            case EntityDamageCause.fireTick:
            case EntityDamageCause.freezing:
            case EntityDamageCause.lava:
            case EntityDamageCause.magma:
                Command.execute(ent, "scoreboard players add @s guxi:energy_pool "+Math.round(damage*Math.max(1, 100*Math.random())));
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
                Command.execute(ent, "scoreboard players remove @s guxi:energy_pool "+Math.round(damage*Math.max(1, 200*Math.random())));
            default:
                Command.execute(ent, "scoreboard players remove @s guxi:energy_pool "+Math.round(damage*Math.max(1, 100*Math.random())));
        }
    }
});

console.warn("scripts main end");