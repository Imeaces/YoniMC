// @ts-nocheck

import { ChatCommand } from "../yoni/util/ChatCommand.js";
import { Minecraft, dim } from "../yoni/basis.js";
import { EntityBase } from "../yoni/entity.js";
import Command from "../yoni/command.js";
import Location from "../yoni/Location.js";
import { Scoreboard } from "../yoni/scoreboard.js";
import { EventListener } from "../yoni/event.js";
import { YoniScheduler, Schedule } from "../yoni/schedule.js";
import { World } from "../yoni/world.js";
import { Logger } from "../yoni/util/Logger.js";
 
const { MinecraftEffectTypes, EntityDamageCause } = Minecraft;

const logger = new Logger("Species.guxi");
 
const keyNames = {
    "guxi:energy": "能量堆",
    "guxi:energy_pool": "能量池",
    "guxi:energy_st": "堆上限",
    "guxi:energy_stpo": "池上限",
    "guxi:health_stat": "生命状态",
    
    "guxi:ef_speed": "速度",
    "guxi:ef_mining": "挖掘",
    "guxi:ef_damage": "伤害",
    "guxi:ef_res": "防御",
    "guxi:ef_fireimmu": "火抗",
    "guxi:auto_energy": "自动获得能量",
    "guxi:keep_res": "保持防御",
    "guxi:keep_ef": "保持状态",
    "guxi:like_player": "伪装玩家",
    "guxi:auto_player": "自行伪装玩家",
    "guxi:hotbar_ctrl": "热键控制",
    
    "guxi:cre_ely": "伪鞘翅"
};

class GuxiMain {
    static get readAccessKeys(){
        return Object.keys(keyNames);
    }
    static writeAccessKeys = [
        "guxi:ef_speed",
        "guxi:ef_mining",
        "guxi:ef_damage",
        "guxi:ef_res",
        "guxi:ef_fireimmu",
        "guxi:auto_energy",
        "guxi:keep_res",
        "guxi:keep_ef",
        "guxi:like_player",
        "guxi:auto_player"
    ];
    
    static values = Scoreboard.getObjective("guxi:values", true);
    
    static getFullKey(k){
        if (!k.startsWith("guxi:")){
            k = "guxi:"+k;
        }
        return k;
    }
    
    static objectives: any = new Proxy((function (){
        let objs = {};
        Object.keys(keyNames).forEach(key=>{
            let obj = Scoreboard.getObjective(key, true);
            objs[key] = obj;
        });
        objs.species = Scoreboard.getObjective("species", true);
        return objs;
    })(), {
        get(t, k){
            if (typeof k === "symbol"){
                return t[k];
            }
            if (k === "species"){
                return t.species;
            }
            k = GuxiMain.getFullKey(k);
            return t[k];
        }
    });
    
    static BreakBlockUsedEnergyConstant = 72219;
    
    static onBlockBroken(event){
        if (!EntityBase.hasFamily(event.player, "guxi"))
            return;
        GuxiMain.objectives.energy.removeScore(
            event.player,
            Math.round( Math.max(0, GuxiMain.BreakBlockUsedEnergyConstant * GuxiMain.objectives["ef_mining"].getScore(event.player)) )
        );
    }
    
    static onCommand(sender, command, label, args){
        if (!sender.hasFamily("guxi")){
            sender.sendMessage("抱歉，非本族群不可使用");
            return ChatCommand.unknownCommand;
        }
        let arg1 = args[0];
        switch (args.shift()){
            case "boom":
                GuxiMain.createExplosion(sender, args.shift());
                break;
            case "value":
                GuxiMain.valueCtrl(sender, args);
                break;
            case "elytra":
                GuxiMain.elytraManage(sender, args);
                break;
            default:
                if (GuxiMain.readAccessKeys.includes(GuxiMain.getFullKey(arg1))){
                    args.unshift(arg1);
                    if (args[1])
                        args.unshift("set");
                    else
                        args.unshift("get"); 
                    GuxiMain.valueCtrl(sender, args);
                } else {
                    sender.sendMessage("咕西");
                    sender.sendMessage(`${label} value [set|get|list]`);
                    sender.sendMessage(`${label} boom <radius:number>`);
                    sender.sendMessage(`${label} elytra <expand|recovery>`);
                }
        }
    }
    
    static damageModifier = 722;
    
    static hurtCondition1(event){
        if (event.damagingEntity == null || !EntityBase.hasFamily(event.damagingEntity, "guxi")){
            return;
        }
        
        let cost = Math.round(
            event.damage
            * GuxiMain.damageModifier
            * (
                GuxiMain.objectives["guxi:ef_damage"].getScore(event.damagingEntity)
                + 1
            )
        );
        if (cost > 0){
            GuxiMain.objectives["guxi:energy"].removeScore(event.damagingEntity, cost);
        }
    }
    
    static createExplosion(runner, radius){
        runner = EntityBase.from(runner);
        
        radius = Number(radius);
        if (!isFinite(radius)){
            runner.sendMessage("范围得是数字");
            return;
        }
    
        let location = new Location(runner);
        
        runner.say("boom!");
        runner.dimension.createExplosion(location.getVanillaLocation(), radius, {
            breaksBlocks: true,
            source: EntityBase.getMinecraftEntity(runner)
        });
    } 
    static valueCtrl(sender, args){
        let [ arg1, arg2, arg3, arg4, arg5, arg6 ] = args;
        if (arg1 === "list"){
            sender.sendMessage("\n当前状态");
            for (let key of GuxiMain.readAccessKeys){
                let value = GuxiMain.objectives[key].getScore(sender);
                let color = (GuxiMain.writeAccessKeys.includes(key)) ? "" : "§7";
                sender.sendMessage(`${color}${key}(${GuxiMain.objectives[key].id}): ${value}`);
            };
        } else if (arg1 === "get"){
            if (!GuxiMain.objectives[arg2]){
                sender.sendMessage("没有");
            }
            let value = GuxiMain.objectives[arg2].getScore(sender);
            
            sender.sendMessage(`${arg2}(${GuxiMain.objectives[arg2].id}): ${value}`);
        } else if (arg1 === "set"){
            if (!GuxiMain.objectives[arg2]){
                sender.sendMessage("没有");
                return;
            }
            if (!GuxiMain.writeAccessKeys.includes(GuxiMain.getFullKey(arg2))){
                sender.sendMessage("做不到");
                return;
            }
            GuxiMain.objectives[arg2].setScore(sender, Number(arg3))
                .then(()=> sender.sendMessage("成功"))
                .catch(()=> sender.sendMessage("失败"));
        } else {
            sender.sendMessage("感到疑惑");
        }
    }
    static elytraManage(sender, args){
        switch(args[0]){
            case "expand":
                Command.fetchExecute(sender, "function yonimc/guxi/creation/elytra/expand");
                sender.sendMessage("展开鞘翅");
                break;
            case "recovery":
                Command.fetchExecute(sender, "function yonimc/guxi/creation/elytra/recovery");
                sender.sendMessage("收起鞘翅");
                break;
            default: 
                sender.sendMessage("感到疑惑");
        }
    }
    static hurtCondition2(event){
        if (!EntityBase.hasFamily(event.hurtEntity, "guxi"))
            return;
        
        let entity = EntityBase.from(event.hurtEntity);
        let damage = event.damage;
        let type = "unknown";
        
        switch(event.cause){
            case EntityDamageCause.fire:
            case EntityDamageCause.fireTick:
            case EntityDamageCause.freezing:
            case EntityDamageCause.lava:
            case EntityDamageCause.magma:
                type = "hot";
                break;
            case EntityDamageCause.magic:
                type = "magic";
                break;
            case EntityDamageCause.projectile:
            case EntityDamageCause.flyIntoWall:
            case EntityDamageCause.fall:
            case EntityDamageCause.fallingBlock:
            case EntityDamageCause.entityExplosion:
            case EntityDamageCause.blockExplosion:
            case EntityDamageCause.anvil:
                type = "fatal";
                break;
            default:
                type = "normal";
        }
        
        let maxHealth = entity.getMaxHealth();
        let currentHealth = entity.getCurrentHealth();
        let lostHealth = maxHealth - currentHealth;
        let efResLevel = GuxiMain.objectives.ef_res.getScore(entity);
        let absDamage = efResLevel !== undefined ? Math.max(0, Math.min(4, efResLevel)) * 4 : 0;
        let realDamage = damage - absDamage;
        let realFatalDamage = damage - absDamage / 2;
        
        if (type === "fatal"){
            if (realFatalDamage <= 0){
                entity.onScreenDisplay.setActionBar("§e已阻挡");
                return;
            }
            
            let lost = Math.min(realFatalDamage, lostHealth)
                ** 2 * 0.01
                * GuxiMain.objectives.energy_pool.getScore(entity);
            
            GuxiMain.objectives.energy_pool.removeScore(entity, Math.round(lost));
        
        } else if (type === "hot"){
        
            entity.addEffect(Minecraft.MinecraftEffectTypes["instantHealth"], 2, 20, false);
            
            GuxiMain.objectives.energy_pool.addScore(entity, 
                Math.round( damage * Math.max(1, 100 * Math.random() ) ) );
            
            GuxiMain.objectives.ef_fireimmu.addScore(entity, 
                Math.round( damage
                    * Math.max(4, GuxiMain.objectives.ef_fireimmu.getScore(entity)
                        * 3.1
                    )
                )
            );
            
            if (Math.random() * 1000 <= 1){
                GuxiMain.objectives.energy_pool.addScore(entity, Math.round(damage*500));
                Command.postExecute(entity, [
                    "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 obsidian 0 replace lava 0",
                    "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 netherrack 0 replace magma -1",
                    "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 obsidian 0 replace flowing_lava 0",
                    "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace lava -1",
                    "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace flowing_lava -1",
                    "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace fire -1"
                ]);
            }
            
            
        } else if (type === "immune"){
        
        //do nothing
        
        } else {
            if (realDamage <= 0){
                entity.onScreenDisplay.setActionBar("§e已阻挡");
                return;
            }
            
            let lost = Math.min(realDamage, lostHealth) / maxHealth
                * GuxiMain.objectives.energy_pool.getScore(entity);
            
            GuxiMain.objectives.energy_pool.removeScore(entity, Math.round(lost));
            
        }
        
        if (type === "fatal" || type === "normal"){
            if (absDamage > 0){
                GuxiMain.objectives.energy.removeScore(entity, Math.round(absDamage * GuxiMain.perDamageDropEnergy));
            }
        }
    }
    
    static perDamageDropEnergy = 20000;
    static energyInsideYoniMCEnergy = 80000000;
    static fireworkBoostEnergyUsed = 262144;
    
    static itemUseCondition(event: Minecraft.ItemUseEvent | Minecraft.ItemUseOnEvent){
    
        if (Date.now() - GuxiMain.lastCall_itemUseCondition < 50){
            return;
        } else if (event.source == null
        || !EntityBase.hasFamily(event.source, "guxi")){
            return;
        } else if (!EntityBase.entityIsPlayer(event.source)){
            return;
        }
        
        GuxiMain.lastCall_itemUseCondition = Date.now();
        
        let player = EntityBase.from(event.source) as unknown as Player;
        let itemst = event.item;
        
        if (itemst.typeId === "yonimc:energy"){
            player.addEffect(Minecraft.MinecraftEffectTypes["instantHealth"], 1, 20, false);
            GuxiMain.objectives.energy.addScore(player, GuxiMain.energyInsideYoniMCEnergy);
        } else if (itemst.typeId === "minecraft:firework_rocket"
        && GuxiMain.objectives.cre_ely.getScore(player) === 2
        && player.selectedSlot === 8
        ){
            GuxiMain.objectives.energy.removeScore(player, GuxiMain.fireworkBoostEnergyUsed);
        }
    }
    
    static lastCall_itemUseCondition = -50;
    
    static lavaUseCondition(event){
    
        if (Date.now() - GuxiMain.lastCall_itemUseCondition < 50){
            return;
        } else if (event.source == null
        || !EntityBase.hasFamily(event.source, "guxi")){
            return;
        } else if (!EntityBase.entityIsPlayer(event.source)){
            return;
        }
        
        let itemst = event.item;
        
        if (itemst.typeId !== "minecraft:lava_bucket"){
            return;
        }
        
        GuxiMain.lastCall_itemUseCondition = Date.now();
        
        let player = EntityBase.from(event.source) as unknown as Player;
        
        let backItemst = new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.bucket, 1, 0);
        player.getInventory().setItem(entity.selectedSlot, backItemst);
        
        let lavaBucketEnergyVolume = GuxiMain.values.getScore("lava_bucket_energy_volume");
        
        GuxiMain.objectives.energy.addScore(player,
            Math.round(
                lavaBucketEnergyVolume
                * Math.max(
                    1,
                    100 * Math.random()
                )
            )
        );
        
        player
            .dimension.spawnItem(
                new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.obsidian, 1),
                player.location.getVanillaLocation()
            );
    }
    
    static cycle(){
    }
    
}

EventListener.register("minecraft:itemUse", GuxiMain.lavaUseCondition);
EventListener.register("minecraft:itemUse", GuxiMain.itemUseCondition);
EventListener.register("minecraft:itemUseOn", GuxiMain.itemUseCondition);
EventListener.register("minecraft:entityHurt", GuxiMain.hurtCondition2);
EventListener.register("minecraft:entityHurt", GuxiMain.hurtCondition1);
EventListener.register("minecraft:blockBreak", GuxiMain.onBlockBroken);

ChatCommand.registerPrefixCommand("#", "guxi", GuxiMain);

YoniScheduler.runCycleTickTask(GuxiMain.cycle, 0, 1, false);
