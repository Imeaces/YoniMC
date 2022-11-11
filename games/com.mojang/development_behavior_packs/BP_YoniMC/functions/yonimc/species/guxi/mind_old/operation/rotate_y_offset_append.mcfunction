#operation/rotate_y_offset_append

# 一个用于计算横轴视角偏移的函数
# 需要参数op:ory0，存储初始角度
# 返回参数op:ory1，执行者与初始角度的偏差
## 该函数用于修复op:ory0的范围

execute if entity @s[scores={op:ory0=181..}] run scoreboard players add @s op:ory0 -360
execute if entity @s[scores={op:ory0=..-180}] run scoreboard players add @s op:ory0 360
