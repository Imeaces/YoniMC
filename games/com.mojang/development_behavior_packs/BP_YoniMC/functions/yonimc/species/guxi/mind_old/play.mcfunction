#初始化
# 记录当前想法
scoreboard objectives add mind dummy
scoreboard players add @s mind 0

# 记录已经决定想法
scoreboard objectives add mind:enter dummy
scoreboard players set @s mind:enter 0
# 记录当前slot物品
scoreboard objectives add mind:slot dummy

scoreboard objectives add mind:lock dummy
scoreboard players add @s mind:lock 0

scoreboard objectives add mind:scene dummy

# 在特定的mind下显示特定的物品
# 默认模式0
# 攻击模式1
# 防御模式2
# 滑翔模式3
execute if score @s mind matches 0 run replaceitem entity @s slot.hotbar 8 destroy guxi:enter 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}} 
execute if score @s mind matches 1 run replaceitem entity @s slot.hotbar 8 destroy guxi:enter_attack 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}} 
execute if score @s mind matches 2 run replaceitem entity @s slot.hotbar 8 destroy guxi:enter_shield 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
execute if score @s mind matches 3 run replaceitem entity @s slot.hotbar 8 destroy firework_rocket 2 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}

# 检测使用状态
execute if score @s slot_hotbar matches 8 if score @s mind:lock matches 0 run scoreboard players operation @s mind:scene = @s mind

## 轮盘菜单
execute if score @s mind:scene matches 0.. if score @s mind:lock matches 0 if entity @s[rx=-89] run scoreboard players set @s mind:scene -1

# 检测是否已经决定
execute if entity @s[tag=event:itemUse] run scoreboard players set @s mind:enter 1
execute if entity @s[tag=event:itemUseOn] run scoreboard players set @s mind:enter 1

#执行想法
execute if score @s slot_hotbar matches 8 if score @s mind:scene matches -1 run function yonimc/species/guxi/mind_old/play_scene

execute if score @s slot_hotbar matches 8 if score @s mind:scene matches 0 run function yonimc/species/guxi/mind_old/mind_default
execute if score @s slot_hotbar matches 8 if score @s mind:scene matches 1 run function yonimc/species/guxi/mind_old/mind_attack
execute if score @s slot_hotbar matches 8 if score @s mind:scene matches 2 run function yonimc/species/guxi/mind_old/mind_shield
execute if score @s slot_hotbar matches 8 if score @s mind:scene matches 3 run function yonimc/species/guxi/mind_old/mind_gliding
