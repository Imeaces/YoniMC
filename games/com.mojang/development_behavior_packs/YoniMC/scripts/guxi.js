import ChatCommand from "scripts/yoni/command/ChatCommand.js";
import {
    Minecraft,
    dim
    } from "scripts/yoni/basis.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import { tell, say } from "scripts/yoni/util/yoni-lib.js";
import Command from "scripts/yoni/command.js";
import SimpleScoreboard from "scripts/yoni/scoreboard/SimpleScoreboard.js";
import { EventListener } from "scripts/yoni/event.js";
import { EntityDamageCause } from "mojang-minecraft";

let valueList = {
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
    "guxi:auto_player": "自行伪装玩家"
};
let setList = {
    "guxi:ef_speed": "速度",
    "guxi:ef_mining": "挖掘",
    "guxi:ef_damage": "伤害",
    "guxi:ef_res": "防御",
    "guxi:ef_fireimmu": "火抗",
    "guxi:auto_energy": "自动获得能量",
    "guxi:keep_res": "保持防御",
    "guxi:keep_ef": "保持状态",
    "guxi:like_player": "伪装玩家",
    "guxi:auto_player": "自行伪装玩家"
};

function createBoom(runner, r){
    let radius = Number(r);
    if (isNaN(radius)){
        sender.sendMessage("范围得是数字");
        return;
    }
    let location = runner.location;
    
    let opts = {
        breaksBlocks: true,
        source: runner.vanillaEntity
    };
    
    say("boom!", runner);
    runner.dimension.createExplosion(location, radius, opts);
}
function valueCtrl(sender, args){
    switch (args.shift()){
        case "list":
            sender.sendMessage("\n当前状态");
            for (let s in valueList){
                let o = SimpleScoreboard.getObjective(s, true);
                let r = o.getScore(sender);
                let v = setList[s] !== undefined ? "" : "§7";
                sender.sendMessage(`${v}${valueList[s]}(${o.id}): ${r}`);
            };
            break;
        case "get":
            let valueToGet = args.shift();
            if (!valueToGet.startsWith("guxi:")) valueToGet = "guxi:" + valueToGet;
            if (valueList[valueToGet] === undefined){
                sender.sendMessage("没有");
                return;
            }
            let valueVal = SimpleScoreboard.getObjective(valueToGet).getScore(sender);
            sender.sendMessage(`${valueList[valueToGet]}(${valueToGet}): ${valueVal}`);
        case "set":
            let valueToSet = args.shift();
            if (!valueToSet.startsWith("guxi:")) valueToSet = "guxi:" + valueToSet;
            if (setList[valueToSet] === undefined){
                sender.sendMessage("做不到");
                return;
            }
            let valForValue = args.shift();
            if (valForValue === "false"){
                valForValue = 0;
            } else if (valForValue === "true"){
                valForValue = 1;
            } else {
                valForValue = Number(valForValue);
            }
            try {
                SimpleScoreboard.getObjective(valueToSet).setScore(sender, valForValue);
                sender.sendMessage("成功");
            } catch (e){
                sender.sendMessage(e.message);
            }
            break;
        default:
            sender.sendMessage("感到疑惑");
    }
}
function elytraManage(sender, args){
    let opt = args[0];
    if (opt === "expand"){
        Command.execute(sender, "function yonimc/guxi/creation/elytra/expand");
        sender.sendMessage("展开鞘翅");
    } else if (opt === "recovery"){
        Command.execute(sender, "function yonimc/guxi/creation/elytra/recovery");
        sender.sendMessage("收起鞘翅");
    } else {
        sender.sendMessage("感到疑惑");
    }
}

ChatCommand.registerPrefixCommand("#", "guxi", (runner, command, label, args) => {
    if (!YoniEntity.hasAnyFamily(runner, "guxi")) return;
    let sender = new YoniEntity(runner);
    switch (args.shift()){
        case "boom":
            createBoom(sender, args.shift());
            break;
        case "value":
            valueCtrl(sender, Array.from(args));
            break;
        case "elytra":
            elytraManage(sender, Array.from(args));
            break;
        default:
            sender.sendMessage("咕西");
            sender.sendMessage(`${label} value [set|get|list]`);
            sender.sendMessage(`${label} boom <radius:number>`);
            sender.sendMessage(`${label} elytra <expand|recovery>`);
    }
});

//咕西获取能量的方式：杀死实体
/*
EventListener.register("entityHurt", (event) => {
  if (!YoniEntity.hasAnyFamily(event.damagingEntity, "guxi")) return;
  if (event.hurtEntity.getComponent("minecraft:health").current == 0){
    let damageEnergyEntity = event.hurtEntity.dimension.spawnEntity("guxi:energy", event.hurtEntity.location);
    let damageEnergy = event.hurtEntity.getComponent("minecraft:health").value ^ 5 * 32;
    let damageEnergies = Math.floor(damageEnergy / 10000000);
    damageEnergy = damageEnergy % 10000000;
    runCmd("scoreboard players set @s guxi:energies "+damageEnergies, damageEnergyEntity);
    runCmd("scoreboard players set @s guxi:energy "+damageEnergy, damageEnergyEntity);
  }
  return
});
*/

EventListener.register("blockBreak", (event)=>{
    if (!YoniEntity.hasFamily(event.player, "guxi")) return;
    
    Energy.remove(Energy.stack, event.player,
        Math.round(Math.max(0,
            72219*
            SimpleScoreboard
            .getObjective("guxi:ef_mining")
            .getScore(event.player)
        )));
});

EventListener.register("beforeItemUse", (event)=> {
    if (event.item.id === "minecraft:lava_bucket" && event.source != null && YoniEntity.hasFamily(event.source, "guxi")){
        event.cancel = true;

        let ent = event.source;
        Command.execute(ent, "replaceitem entity @s slot.weapon.mainhand 0 bucket 1");
        let lavaBucketEnergyVolume = SimpleScoreboard.getObjective("guxi:values").getScore("lava_bucket_energy_volume");
        SimpleScoreboard.getObjective("guxi:energy").addScore(ent, Math.round(lavaBucketEnergyVolume*Math.max(1, 100*Math.random())));
        ent.dimension.spawnItem(new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.obsidian, 1, 0), ent.location);
    }
});

let itemUseCondition = (event)=> {
    if (!YoniEntity.hasFamily(event.source, "guxi")) return;
    if (event.item.id === "yonimc:energy"){
        event.cancel = true;
        let ent = event.source;
        Command.execute(ent, "effect @s instant_health 1 20 false");
        Energy.add(Energy.stack, ent, 30000000);
    } else if (event.item.id === "minecraft:firework_rocket" &&
        SimpleScoreboard.getObjective("guxi:cre_ely").getScore(event.source) === 2 && event.source.selectedSlot === 8){
            Energy.remove(Energy.stack, event.source, 262144);
    }
};

EventListener.register("itemUse", itemUseCondition);
EventListener.register("itemUseOn", itemUseCondition);

class Energy {
    get pool(){
        return SimpleScoreboard.getObjective("guxi:energy_pool", true);
    }
    get stack(){
        return SimpleScoreboard.getObjective("guxi:energy", true);
    }
    get fireImmune(){
        return SimpleScoreboard.getObjective("guxi:ef_fireimmu", true);
    }
    get efRes(){
        return SimpleScoreboard.getObjective("guxi:ef_res", true);
    }
    add(t, ent, e){
        t.addScore(ent, +e);
    }
    remove(t, ent, e){
        t.removeScore(ent, e);
    }
    get(t, ent){
        return t.getScore(ent);
    }
    set(t, ent, e){
        t.setScore(ent, e);
    }
}

Energy = new Energy();

EventListener.register("entityHurt", (event)=> {
    if (!YoniEntity.hasFamily(event.hurtEntity, "guxi"))
        return;
    let ent = event.hurtEntity;
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
    let maxHealth = YoniEntity.getMaxHealth(ent);
    let currentHealth = YoniEntity.getCurrentHealth(ent);
    let lostHealth = maxHealth - currentHealth;
    
    
    if (type == "fatal"){
        let i = Math.round(Math.max(0, damage**2*0.01*Energy.pool.getScore(ent)));
        Energy.remove(Energy.pool, ent, i);
        
        
    } else if (type == "hot"){
        Command.execute(ent, "effect @s instant_health 1 20 false");
        Energy.add(Energy.pool, ent, Math.round(damage*Math.max(1, 100*Math.random())));
        Energy.add(Energy.fireImmune, ent, Math.round(Math.max(4, Energy.fireImmune.getScore(ent)*3.1*Math.random())));
        if (Math.random()*1000<=1){
            Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 obsidian 0 replace lava 0");
            Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 netherrack 0 replace magma -1");
            Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 obsidian 0 replace flowing_lava 0");
            Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace lava -1");
            Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace flowing_lava -1");
            Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace fire -1");
        }
        
        
    } else if(type == "immune"){
    
    
    } else {
        let resLevel = Energy.get(Energy.efRes, ent);
        let lost = Math.max(0, Math.min(lostHealth, damage));
            
        if (resLevel > 0){ //防伤害
            Energy.remove(Energy.pool, ent, Math.max(0,Math.round(Math.max(1, damage)/resLevel*1000)));
            lost = lost - 16;
        }
        if (lost > 0){
            Energy.remove(Energy.pool, ent, Math.round(Math.max(0, lost/maxHealth*Energy.pool.getScore(ent))));
        }
        //Command.execute(ent, `title @s title 损失血量 ${lostHealth}`);
        //Command.execute(ent, `title @s subtitle ${event.cause} ${event.damage}`);
        
        
    }
});

EventListener.register("entityHurt", (event)=> {
    if (YoniEntity.hasFamily(event.damagingEntity, "guxi")){
        let cost = Math.round(event.damage*722*(SimpleScoreboard.getObjective("guxi:ef_damage").getScore(event.damagingEntity)+1));
        if (cost > 0){
            Energy.stack.removeScore(event.damagingEntity, cost);
        }
    }
});
let guxis = new Set();

EventListener.register("tick", (event)=>{
    //say(JSON.stringify(Command.run("time query gametime")));
    //say(`c: ${event.currentTick}, d: ${event.deltaTime}`)
    /*
    let plAlive = new Set();
    Array.from(YoniEntity.getAliveEntities({type:"minecraft:player"})).forEach(_=>plAlive.add(_));
    Array.from(Minecraft.world.getPlayers()).forEach((_)=>{
        if (plAlive.has(_)) return;
        say(_.name);
    });
*/    
    if (event.currentTick % 30 != 6) return;
    
    Command.run("execute if entity @e[type=guxi:energy] as @e[type=guxi:energy] at @s run particle minecraft:endrod ~ ~ ~");
    
});
