#operation/rotate_y_offset

# 一个用于计算横轴视角偏移的函数
# 需要参数op:ory0，存储初始角度
# 返回参数op:ory1，执行者与初始角度的偏差
## 该函数用于计算op:ory1

function entity/status/rotate_y

scoreboard players operation @s op:ory1 = @s rotate_y
scoreboard players operation @s op:ory1 -= @s op:ory0

execute @s[scores={op:ory1=180..}] ~ ~ ~ scoreboard players add @s op:ory1 -360
execute @s[scores={op:ory1=..-180}] ~ ~ ~ scoreboard players add @s op:ory1 360
