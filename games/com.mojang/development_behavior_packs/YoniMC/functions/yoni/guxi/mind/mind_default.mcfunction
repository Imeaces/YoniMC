#guxi/mind/guxi

# 初始化
scoreboard objectives add mind:v100 dummy
scoreboard players add @s mind:v100 0

scoreboard objectives add mind:v100100 dummy
scoreboard players operation @s mind:v100100 = @s mind:v100

# 跳转到guxi面板26950
execute @s[scores={mind:v100100=0}] ~ ~ ~ function yoni/guxi/mind/goto/goto_1

# 根据面板标识显示对应面板
execute @s[scores={mind:v100100=1}] ~ ~ ~ function yoni/guxi/mind/th_1
execute @s[scores={mind:v100100=100}] ~ ~ ~ function yoni/guxi/mind/th_100
execute @s[scores={mind:v100100=100400}] ~ ~ ~ function yoni/guxi/mind/th_100400
execute @s[scores={mind:v100100=100410}] ~ ~ ~ function yoni/guxi/mind/th_100410

execute @s[scores={mind:v105100=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"%%s§f%%s%%s%%s","with":{"rawtext":[{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:energies=..10}]"},{"text":"§l"}]}},{"score":{"objective":"guxi:energies","name":"@s"}},{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v105=1}]"},{"translate":"§o§7|§r%%s%%s","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:energies=..10}]"},{"text":"§f"},{"text":"§7"}]}},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}}]}}]}



# ability to add energy

scoreboard objectives add guxi:op5 dummy
scoreboard players random @s guxi:op5 0 10000

#execute @s[tag=guxi:event_adding_energy] ~ ~ ~ scoreboard players add @s guxi:energy 1900
execute @s[tag=guxi:event_adding_energy] ~ ~ ~ scoreboard players add @s guxi:energy 38000

execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0..50}] ~ ~ ~ fill ~-1 ~ ~-1 ~1 ~ ~1 obsidian 0 replace lava 0
execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0..50}] ~ ~ ~ fill ~-1 ~ ~-1 ~1 ~ ~1 stone 0 replace lava -1
execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0..90}] ~ ~ ~ fill ~-1 ~ ~-1 ~1 ~ ~1 obsidian 0 replace flowing_lava 0
execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0..90}] ~ ~ ~ fill ~-1 ~ ~-1 ~1 ~ ~1 stone 0 replace flowing_lava -1

execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0..500}] ~ ~ ~ fill ~-1 ~ ~-1 ~1 ~ ~1 air 0 replace fire

execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0}] ~ ~ ~ fill ~-3 ~ ~-3 ~3 ~ ~3 obsidian 0 replace lava 0
execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0}] ~ ~ ~ fill ~-3 ~ ~-3 ~3 ~ ~3 stone 0 replace lava -1
execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0}] ~ ~ ~ fill ~-2 ~ ~-2 ~2 ~ ~2 stone 0 replace flowing_lava
execute @s[tag=guxi:event_adding_energy,scores={guxi:op5=0}] ~ ~ ~ scoreboard players add @s guxi:energies 103
