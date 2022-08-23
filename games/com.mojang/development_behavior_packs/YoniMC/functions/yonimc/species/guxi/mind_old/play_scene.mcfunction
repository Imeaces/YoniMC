
#锁定scene
scoreboard players set @s mind:lock 1

#增加变量用于判定
scoreboard objectives add mind:v0 dummy
scoreboard players add @s mind:v0 0

#如果初次进入则设置一次初始角度，用于后续计算用户旋转方向
execute if entity @s[scores={mind:v0=0}] run function yonimc/species/guxi/mind_old/operation/rotate_y_offset_init
execute if entity @s[scores={mind:v0=0}] run scoreboard players set @s mind:v0 1

# 计算旋转方向
execute if entity @s[scores={mind:v0=1}] run function yonimc/species/guxi/mind_old/operation/rotate_y_offset
##向左
# 往上推动轮盘
execute if entity @s[scores={op:ory1=..-30}] run function yonimc/species/guxi/mind_old/operation/rotate_y_offset_init
execute if entity @s[scores={op:ory1=..-30}] run scoreboard players add @s mind -1
##向右
# 反之则往下
execute if entity @s[scores={op:ory1=30..}] run function yonimc/species/guxi/mind_old/operation/rotate_y_offset_init
execute if entity @s[scores={op:ory1=30..}] run scoreboard players add @s mind 1

##限定轮盘的项目数
execute if entity @s[scores={mind=..-1}] run scoreboard players set @s mind 3
execute if entity @s[scores={mind=4..}] run scoreboard players set @s mind 0

# 当目光离开轮盘时，解除锁，并重置变量
execute if entity @s[rxm=-86] run scoreboard players set @s mind:lock 0
execute if entity @s[rxm=-86] run scoreboard players reset @s mind:v0

# 展示轮盘
title @s times 0 5 0
title @s title §r
titleraw @s subtitle {"rawtext":[{"score":{"objective":"mind","name":"@s"}}]}
