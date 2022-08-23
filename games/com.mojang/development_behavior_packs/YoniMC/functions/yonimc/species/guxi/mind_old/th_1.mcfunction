#guxi/mind/guxi_0

# 当低头时，将标志切换到1
execute if entity @s[rxm=85,scores={mind:v101=0}] run scoreboard players set @s mind:v101 1

# 当标志为1时
## 复制延迟设置
execute if entity @s[scores={mind:v101=1,mind:ti100=0}] run scoreboard players operation @s mind:ti100 = @s mind:v106
## 计时
execute if entity @s[scores={mind:v101=1,mind:ti100=1..}] run scoreboard players add @s mind:ti100 -1
## 计时结束后，设置标志为-1
execute if entity @s[scores={mind:v101=1,mind:ti100=..0}] run scoreboard players set @s mind:v101 -1

# 当抬头时
## 如果正在计时，重置计时器
execute if entity @s[rx=84,scores={mind:ti100=1..}] run scoreboard players set @s mind:ti100 0
## 如果标志为1，跳转面板26951
execute if entity @s[rx=84,scores={mind:v101=1}] run function yonimc/species/guxi/mind_old/goto/goto_100
#enter
execute if entity @s[scores={mind:enter=1}] run function yonimc/species/guxi/mind_old/goto/goto_100
## 重置标志
execute if entity @s[rx=84] run scoreboard players set @s mind:v101 0

# 显示面板（参见guxi_0.json）
titleraw @s actionbar {"rawtext":[{"translate":"%%s§f%%s%%s%%s","with":{"rawtext":[{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:energies=..10}]"},{"text":"§l"}]}},{"score":{"objective":"guxi:energies","name":"@s"}},{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v105=1}]"},{"translate":"§o§7|§r%%s%%s","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:energies=..10}]"},{"text":"§f"},{"text":"§7"}]}},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={mind:ti100=1..}]"},{"translate":"\n>>%%s","with":{"rawtext":[{"score":{"objective":"mind:ti100","name":"@s"}}]}}]}}]}}]}
