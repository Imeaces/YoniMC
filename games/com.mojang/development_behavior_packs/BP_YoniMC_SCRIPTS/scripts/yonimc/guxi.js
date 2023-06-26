import { Logger, Minecraft, EntityBase, Location, Scoreboard, EventListener, YoniScheduler, system, } from "yoni-mcscripts-lib";
const { MinecraftEffectTypes, EntityDamageCause } = Minecraft;
const logger = new Logger("Species.guxi");
const values = (new (class {
    damageModifier = 18100;
    enter_attack_energy = 72281;
    per_damage_drop_energy = 20000;
    creation_elytra_boost_speed_energy = 262144;
    lava_bucket_energy_volume = 973145;
    energy_inside_yonimc_energy = 82827272;
    BreakBlockUsedEnergyConstant = 43866;
}));
function getFullKey(k) {
    if (!k.startsWith("guxi:")) {
        k = "guxi:" + k;
    }
    // @ts-ignore
    return k;
}
async function removeScoreAsync(entry, objective, score) {
    let curScore = score;
    while (curScore > 1000000) {
        let _re = () => { };
        let pro = new Promise((re) => _re = re);
        YoniScheduler.runDelayTickTask(() => {
            _re();
        }, 1);
        await pro;
        objective.removeScore(entry, 1000000);
        curScore -= 1000000;
    }
    if (curScore > 0)
        objective.removeScore(entry, curScore);
}
async function addScoreAsync(entry, objective, score) {
    let curScore = score;
    while (curScore > 1000000) {
        let _re = () => { };
        let pro = new Promise((re) => _re = re);
        YoniScheduler.runDelayTickTask(() => {
            _re();
        }, 1);
        await pro;
        objective.addScore(entry, 1000000);
        curScore -= 1000000;
    }
    if (curScore > 0)
        objective.addScore(entry, curScore);
}
function getKeyName(k) {
    return keyNames[getFullKey(k)];
}
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
const objectives = new Proxy({}, {
    get(_t, k) {
        if (typeof k === "symbol") {
            return _t[k];
        }
        k = getFullKey(k);
        return Scoreboard.getObjective(k, true);
    }
});
function isGuxi(entity) {
    if (EntityBase.isEntity(entity)
        && EntityBase.hasFamily(entity, "yoni_guxi"))
        return true;
    return false;
}
//处理攻击相关
EventListener.register("mcyoni:entityHurt", (event) => {
    let { hurtEntity, damagingEntity, cause, damage, damagingProjectile } = event;
    if (isGuxi(hurtEntity))
        GuxiHurt(event);
    if (isGuxi(damagingEntity))
        DamageByGuxi(event);
    if (damagingProjectile?.typeId === "guxi:flow_energy")
        ProjectileFlowEnergy(event);
});
function ProjectileFlowEnergy(event) {
    let { hurtEntity, damagingEntity, cause, damage, damagingProjectile } = event;
    hurtEntity.applyDamage(0, { cause: Minecraft.EntityDamageCause.suicide });
}
function DamageByGuxi(event) {
    let { hurtEntity, damagingEntity, cause, damage, damagingProjectile } = event;
    if (!isGuxi(damagingEntity))
        return;
    let damageLevel = objectives["guxi:ef_damage"].getScore(damagingEntity);
    if (damageLevel === undefined
        || damageLevel < 1)
        return;
    let cost = Math.round(damage
        * values.damageModifier
        * damageLevel);
    if (cost > 0) {
        removeScoreAsync(damagingEntity, objectives["guxi:energy"], cost);
    }
}
function GuxiHurt(event) {
    let { hurtEntity, damagingEntity, cause, damage, damagingProjectile } = event;
    if (damage <= 0)
        return; //某些情况下可能碰到0或更少的伤害
    let guxiDamageType = "unknown";
    let entity = hurtEntity;
    switch (cause) {
        case EntityDamageCause.fire:
        case EntityDamageCause.fireTick:
        case EntityDamageCause.lava:
        case EntityDamageCause.magma:
            guxiDamageType = "hot";
            break;
        case EntityDamageCause.freezing:
            guxiDamageType = "immune";
            break;
        case EntityDamageCause.magic:
            guxiDamageType = "magic";
            break;
        case EntityDamageCause.projectile:
        case EntityDamageCause.flyIntoWall:
        case EntityDamageCause.fall:
        case EntityDamageCause.fallingBlock:
        case EntityDamageCause.entityExplosion:
        case EntityDamageCause.blockExplosion:
        case EntityDamageCause.anvil:
            guxiDamageType = "fatal";
            break;
        default:
            guxiDamageType = "normal";
    }
    let maxHealth = entity.getMaxHealth();
    let currentHealth = entity.getCurrentHealth();
    let lostHealth = maxHealth - currentHealth;
    let efResLevel = objectives.ef_res.getScore(entity);
    let absDamage = efResLevel !== undefined ? Math.max(0, Math.min(4, efResLevel)) * 4 : 0;
    let realDamage = damage - absDamage;
    let realFatalDamage = damage - absDamage / 2;
    if (guxiDamageType === "hot"
        || guxiDamageType === "immune") {
        //do nothing
    }
    else {
        if (realDamage <= 0) {
            return;
        }
        let lost = Math.min(realDamage, lostHealth) / maxHealth
            * (objectives.energy_pool.getScore(entity) ?? 0);
        removeScoreAsync(entity, objectives.energy_pool, Math.round(lost));
    }
    if (guxiDamageType === "fatal" || guxiDamageType === "normal") {
        if (absDamage > 0) {
            removeScoreAsync(entity, objectives.energy, Math.round(absDamage * values.per_damage_drop_energy));
        }
    }
}
function useEnergy(event) {
    let source = EntityBase.getYoniEntity(event.source);
    if (!isGuxi(source))
        return;
    if (!EntityBase.entityIsPlayer(source))
        return;
    let player = source;
    let itemst = event.item;
    if (itemst.typeId === "minecraft:firework_rocket"
        && objectives.cre_ely.getScore(player) === 2
        && player.selectedSlot === 8) {
        //利用能量驱动滑翔
        removeScoreAsync(player, objectives.energy, values.creation_elytra_boost_speed_energy);
    }
}
EventListener.register("minecraft:itemUse", (event) => {
    let source = EntityBase.getYoniEntity(event.source);
    if (!isGuxi(source))
        return;
    if (!EntityBase.entityIsPlayer(source))
        return;
    let player = source;
    let itemst = event.item;
    if (itemst.typeId === "minecraft:lava_bucket") {
        //冷却岩浆获得能量
        let backItemst = new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.bucket, 1);
        player.getInventory().setItem(player.selectedSlot, backItemst);
        let lavaBucketEnergyVolume = values.lava_bucket_energy_volume;
        addScoreAsync(player, objectives.energy, lavaBucketEnergyVolume);
        player
            .dimension.spawnItem(new Minecraft.ItemStack(Minecraft.MinecraftItemTypes.obsidian, 1), player.location.getVanillaLocation());
    }
    else if (itemst.typeId === "guxi:enter_attack") {
        let cost = Math.round(31
            * values.damageModifier
            * 0.84);
        if (cost > 0)
            removeScoreAsync(player, objectives.energy, cost);
    }
    else if (itemst.typeId === "yonimc:energy") {
        //抽取yonimc:energy中的能量
        player.addEffect(Minecraft.MinecraftEffectTypes["instantHealth"], 1, 20, false);
        addScoreAsync(player, objectives.energy, values.energy_inside_yonimc_energy);
    }
});
EventListener.register("minecraft:itemUse", useEnergy);
EventListener.register("minecraft:itemUseOn", useEnergy);
let PlayerLastTouchRecord = new WeakMap();
let PlayerLastBlockDestructionRecord = new WeakMap();
EventListener.register("minecraft:entityHit", (event) => {
    if (!event.hitBlock)
        return;
    let player = EntityBase.getYoniEntity(event.entity);
    let location = new Location(event.hitBlock);
    let curTick = system.currentTick;
    let lastBlockBrokenInfo = PlayerLastBlockDestructionRecord.get(player);
    if (lastBlockBrokenInfo !== undefined
        && lastBlockBrokenInfo[0].equals(location)
        && lastBlockBrokenInfo[1] === curTick)
        PlayerLastTouchRecord.delete(player);
    else
        PlayerLastTouchRecord.set(player, [location, curTick]);
}, {
    entityTypes: ["minecraft:player"]
});
EventListener.register("minecraft:blockBreak", (event) => {
    let player = EntityBase.getYoniEntity(event.player);
    let curTick = system.currentTick;
    let interval;
    let lastHittingInfo = PlayerLastTouchRecord.get(player);
    let location = new Location(event.block);
    if (undefined === lastHittingInfo) {
        interval = 0;
    }
    else {
        if (location.equals(lastHittingInfo[0]))
            interval = curTick - lastHittingInfo[1];
        else
            interval = 0;
    }
    PlayerLastBlockDestructionRecord.set(player, [location, curTick]);
    BlockBrokenCondition(player, interval);
});
function BlockBrokenCondition(player, interval) {
    if (!isGuxi(player))
        return;
    let level = objectives["ef_mining"].getScore(player) ?? 0;
    if (level <= 0)
        return;
    let usedEnergy = values.BreakBlockUsedEnergyConstant
        * Math.max(1, interval) * (level ** 2);
    if (usedEnergy <= 0)
        return;
    // logger.info("usedEnergy: {}, waveTime: {}, level: {}", usedEnergy, interval, level);
    removeScoreAsync(player, objectives.energy, Math.round(usedEnergy));
}
