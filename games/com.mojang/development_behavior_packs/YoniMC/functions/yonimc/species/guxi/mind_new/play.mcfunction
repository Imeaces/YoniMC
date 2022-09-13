#初始化

scoreboard players set @s var_0 0

scoreboard players set @s var_1 0

#:var mind 记录当前想法
scoreboard objectives add mind dummy
scoreboard players add @s mind 0

scoreboard objectives add mind:val_0 dummy
scoreboard players add @s mind:val_0 0
scoreboard objectives add mind:val_1 dummy
scoreboard players add @s mind:val_1 0
#:var mind:nt 记录下一个想法
scoreboard objectives add mind:nt dummy
scoreboard players add @s mind:nt 0

#切换想法
execute if score @s mind matches 0 unless score @s mind:nt matches 0 run scoreboard players set @s var_0 6241
execute if score @s var_0 matches 6241 run scoreboard players operation @s mind = @s mind:nt
execute if score @s var_0 matches 6241 run scoreboard players set @s mind:nt 0

#默认想法
#: if mind == 0 then var_0 = 2000
execute if score @s mind matches 0 run scoreboard players set @s var_0 2000
execute if score @s var_0 matches 2000 run scoreboard players set @s var_1 10
#execute if score @s var_0 matches -2000 run scoreboard players set @s mind:val_0 0
#execute if score @s var_0 matches -2000 run scoreboard players set @s var_0 2000

#: if var_0 == 2000 && mind:val_0 == 0 then var_0 = 20000
execute if score @s var_0 matches 2000 if score @s mind:val_0 matches 0 run scoreboard players set @s var_0 20000
#: if var_0 == 2000 && mind:val_0 == 100 then var_0 = 20001
execute if score @s var_0 matches 2000 if score @s mind:val_0 matches 100 run scoreboard players set @s var_0 20001
#: if var_0 == 20000 && self.rotation.x >= 88 then var_1 = 201
execute if score @s var_0 matches 20000 if entity @s[rxm=88] run scoreboard players set @s var_1 201
#: if var_0 == 20001 && self.rotation.x <= 87 then var_1 = 201
execute if score @s var_0 matches 20001 if entity @s[rx=87] run scoreboard players set @s var_1 200
#: if var_1 == 201 then mind:val_0 = 100
execute if score @s var_1 matches 201 run scoreboard players set @s mind:val_0 100
execute if score @s var_1 matches 200 run scoreboard players set @s mind:val_0 0

execute if score @s var_1 matches 10 run titleraw @s actionbar {"rawtext":[{"translate":"§7%%s§f|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}]}

execute if score @s var_1 matches 201 run titleraw @s actionbar {"rawtext":[{"translate":"\n§7%%s§f|%%s\n将切换到xxxx","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}]}

execute if score @s var_0 matches 20001 run title @s actionbar unknown mind

#废弃代码
#: execute if score @s mind matches 0 unless score @s mind:nt matches 0 run scoreboard players operation @s mind = @s mind:nt
#: execute if score @s mind matches 0 run replaceitem entity @s slot.hotbar 8 destroy guxi:enter 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}} 
#: execute if score @s mind matches 1 run replaceitem entity @s slot.hotbar 8 destroy guxi:enter_attack 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}} 
#: execute if score @s mind matches 2 run replaceitem entity @s slot.hotbar 8 destroy guxi:enter_shield 1 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}
#: execute if score @s mind matches 3 run replaceitem entity @s slot.hotbar 8 destroy firework_rocket 2 0 {"keep_on_death":{},"item_lock":{"mode":"lock_in_slot"}}

#: scoreboard players set @s mind:slot -2

#: execute as @s[scores={mind=0},hasitem={location=slot.weapon.mainhand,slot=0,item=guxi:enter}] at @s positioned ~ ~ ~ run scoreboard players set @s mind:slot 0
#: execute as @s[scores={mind=1},hasitem={location=slot.weapon.mainhand,slot=0,item=guxi:enter_attack}] at @s positioned ~ ~ ~ run scoreboard players set @s mind:slot 1
#: execute @s[scores={mind=2},hasitem={location=slot.weapon.mainhand,slot=0,item=guxi:enter_shield}] ~ ~ ~ scoreboard players set @s mind:slot 2
#: execute @s[scores={mind=3},hasitem={location=slot.weapon.mainhand,slot=0,item=firework_rocket}] ~ ~ ~ scoreboard players set @s mind:slot 3

# 检测使用状态
#: execute if score @s mind:lock matches 0 run scoreboard players operation @s mind:scene = @s mind:slot

# 轮盘菜单
#: execute @s[scores={mind:scene=0..,mind:lock=0},rx=-89] ~ ~ ~ scoreboard players set @s mind:scene -1

#: # 检测是否已经决定
#: execute @s[tag=event:itemUse] ~ ~ ~ scoreboard players set @s mind:enter 1
#: execute @s[tag=event:itemUseOn] ~ ~ ~ scoreboard players set @s mind:enter 1

#: #执行想法
#: execute if score @s mind:scene matches -1 run function yoni/guxi/mind/play_scene

#: execute if score @s mind:scene matches 0 run function yoni/guxi/mind/mind_default
#: execute if score @s mind:scene matches 1 run function yoni/guxi/mind/mind_attack
#: execute if score @s mind:scene matches 2 run function yoni/guxi/mind/mind_shield
#: execute if score @s mind:scene matches 3 run function yoni/guxi/mind/mind_gliding

