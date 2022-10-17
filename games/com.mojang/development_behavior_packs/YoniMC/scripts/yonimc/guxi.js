import { ChatCommand } from "scripts/yoni/command/ChatCommand.js";
import { Minecraft, dim } from "scripts/yoni/basis.js";
import { YoniEntity } from "scripts/yoni/entity.js";
import Command from "scripts/yoni/command.js";
import { Scoreboard } from "scripts/yoni/scoreboard.js";
import { EventListener } from "scripts/yoni/event.js";
import { YoniScheduler, Schedule } from "scripts/yoni/schedule.js";
import { World } from "scripts/yoni/world.js";
import { log } from "scripts/yoni/util/Logger.js";
const { MinecraftEffectTypes, EntityDamageCause, EntityQueryScoreOptions } = Minecraft;

Scoreboard.getObjective("species", true);
const energyO = Scoreboard.getObjective("guxi:energy");
const energylO = Scoreboard.getObjective("guxi:energy_pool");
const valuesO = Scoreboard.getObjective("guxi:values");

const includeGuxiScoreOpt = ()=>{
    let rt = new EntityQueryScoreOptions();
    rt.objective = "species";
    rt.minScore = 2695;
    rt.maxScore = 2695;
    rt.exclude = false;
    return rt;
}();

const excludeGuxiScoreOpt = ()=>{
    let rt = new EntityQueryScoreOptions();
    rt.objective = "species";
    rt.minScore = 2695;
    rt.maxScore = 2695;
    rt.exclude = true;
    return rt;
}();

const cycleTick = ()=>{
/*
    //切换到此种族
    World.getPlayers({
        excludeFamilies: [ "yoni_guxi" ],
        scoreOptions: [ includeGuxiScoreOpt ]
    }).forEach(player=>initiateGuxi(player));
    
    //离开此种族
    World.getPlayers({
        families: [ "yoni_guxi" ],
        scoreOptions: [ excludeGuxiScoreOpt ]
    }).forEach(player=>despawnGuxi(player));
*/
    let guxis = World.getPlayers({
        families: [ "yoni_guxi" ]
    })
    guxis.forEach((pl)=>{
        let out = pl.onScreenDisplay;
        let text = "§r§f"+energylO.getScore(pl)+"§7|"+energyO.getScore(pl);
        out.setActionBar(text);
    });
    guxis.forEach(pl=>{
      try{
        pl.addEffect(MinecraftEffectTypes["fireResistance"], -200);
}catch(e){
log("{}", e);
}
    });

};


class Obj {
    static get(object, part){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).getScore(part);
    }
    static add(object, part, score){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).addScore(part, score);
    }
    static set(object, part, score){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).setScore(part, score);
    }
    static remove(object, part, score){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).removeScore(part, score);
    }
    static reset(object, part){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).resetScore(part);
    }
    static random(object, part, min, max){
        if (!object.startsWith("guxi:")) object="guxi:"+object;
        return Scoreboard.getObjective(object).randomScore(part, min, max);
    }
}

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
    "guxi:auto_player": "自行伪装玩家",
    "guxi:hotbar_ctrl": "热键控制",
    
    "guxi:cre_ely": "伪鞘翅"
    
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


export function createExplosion(runner, radius){
    
    radius = Number(radius);
    if (!isFinate(radius)){
        sender.sendMessage("范围得是数字");
        return;
    }
    
    let location = runner.location;
    
    let opts = {
        breaksBlocks: true,
        source: runner.vanillaEntity
    };
    
    runner.say("boom!");
    runner.dimension.createExplosion(location, radius, opts);
    
}

function valueCtrl(sender, args){
    switch (args.shift()){
        case "list":
            sender.sendMessage("\n当前状态");
            for (let s in valueList){
                let o = Scoreboard.getObjective(s, true);
                let r = o.getScore(sender);
                let v = (s in setList) ? "" : "§7";
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
            let valueVal = Obj.get(valueToGet, sender);
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
                Obj.set(valueToSet, sender, valForValue);
                sender.sendMessage("成功");
            } catch (e){
                sender.sendMessage("失败");
            }
            break;
        default:
            sender.sendMessage("感到疑惑");
    }
}

function elytraManage(sender, args){
    switch(args[0]){
        case "expand":
            Command.execute(sender, "function yonimc/guxi/creation/elytra/expand");
            sender.sendMessage("展开鞘翅");
            break;
        case "recovery":
            Command.execute(sender, "function yonimc/guxi/creation/elytra/recovery");
            sender.sendMessage("收起鞘翅");
            break;
        default: 
            sender.sendMessage("感到疑惑");
    }
}

ChatCommand.registerNonPrefixCommand("#guxi", (sender, command, label, args) => {
    if (!sender.hasFamily("guxi")){
        sender.sendMessage("抱歉，非本族群不可使用");
        return;
    }
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
    
    Obj.remove("energy", event.player,
        Math.round(Math.max(0,
            72219*
            Obj.get("ef_mining", event.player)
        )));
});

EventListener.register("beforeItemUse", (event)=> {
    if (event.item.id === "minecraft:lava_bucket" && event.source != null && YoniEntity.hasFamily(event.source, "guxi")){
        event.cancel = true;

        let ent = event.source;
        Command.execute(ent, "replaceitem entity @s slot.weapon.mainhand 0 bucket 1");
        let lavaBucketEnergyVolume = Obj.get("values", "lava_bucket_energy_volume");
        Obj.add(
            "energy",
            ent,
            Math.round(
                lavaBucketEnergyVolume
                *Math.max(
                    1,
                    100*Math.random()
                )
            )
        );
        ent.dimension
            .spawnItem(
                new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.obsidian, 1, 0),
                ent.location
            );
    }
});

let itemUseCondition = (event)=> {
    if (event.source === undefined || !YoniEntity.hasFamily(event.source, "guxi")) return;
    if (event.item.id === "yonimc:energy"){
        event.cancel = true;
        let ent = event.source;
        ent.addEffect(Minecraft.MinecraftEffectTypes["instantHealth"], 1, 20, false);
        Obj.add("energy", ent, 30000000);
    } else if (event.item.id === "minecraft:firework_rocket" &&
        Obj.get("cre_ely", event.source) === 2 &&
        event.source.selectedSlot === 8){
            Obj.remove("energy", event.source, 262144);
    }
};

EventListener.register("itemUse", itemUseCondition);
EventListener.register("itemUseOn", itemUseCondition);

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
        let i = Math.round(
            Math.max(
                0,
                damage
                    **2
                    *0.01
                    *Obj.get("energy_pool",ent)
            )
        );
        Obj.remove("energy_pool", ent, i);
        
        
    } else if (type == "hot"){
        ent.addEffect(Minecraft.MinecraftEffectTypes["instantHealth"], 2, 20, false);
        Obj.add("energy_pool", ent, Math.round(damage*Math.max(1, 100*Math.random())));
        Obj.add("ef_fireimmu", ent, Math.round(Math.max(4, Obj.get("ef_fireimmu", ent)*3.1*Math.random())));
        if (Math.random()*1000<=1){
            Obj.add("energy_pool", ent, Math.round(damage*500));
            Command.execute(ent, "fill ~-4 ~-4 ~-4 ~4 ~4 ~4 obsidian 0 replace lava 0")
            .next("fill ~-4 ~-4 ~-4 ~4 ~4 ~4 netherrack 0 replace magma -1")
            .next("fill ~-4 ~-4 ~-4 ~4 ~4 ~4 obsidian 0 replace flowing_lava 0")
            .next("fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace lava -1")
            .next("fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace flowing_lava -1")
            .next("fill ~-4 ~-4 ~-4 ~4 ~4 ~4 air 0 replace fire -1");
        }
        
        
    } else if(type == "immune"){
    
    //do nothing
    
    } else {
        let resLevel = Obj.get("ef_res", ent);
        let lost = Math.max(0, Math.min(lostHealth, damage));
            
        if (resLevel > 0){ //防伤害
            Obj.remove("energy_pool", ent, Math.max(0,Math.round(Math.max(1, damage)/resLevel*1000)));
            lost = lost - 16;
        }
        if (lost > 0){
            Obj.remove("energy_pool", ent, Math.round(Math.max(0, lost/maxHealth*Obj.get("energy_pool", ent))));
        }
        //Command.execute(ent, `title @s title 损失血量 ${lostHealth}`);
        //Command.execute(ent, `title @s subtitle ${event.cause} ${event.damage}`);
        
        
    }
});

EventListener.register("entityHurt", (event)=> {
    if (event.damagingEntity !== undefined && YoniEntity.hasFamily(event.damagingEntity, "guxi")){
        let cost = Math.round(event.damage*722*(Scoreboard.getObjective("guxi:ef_damage").getScore(event.damagingEntity)+1));
        if (cost > 0){
            Obj.remove("energy", event.damagingEntity, cost);
        }
    }
});

YoniScheduler.addSchedule(new Schedule ({
    async: false,
    type: Schedule.tickCycleSchedule,
    delay: 2,
    period: 5,
    callback: cycleTick
}));
