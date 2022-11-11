#operation/rotate_y_offset
# 一个用于计算横轴视角偏移的函数

function entity/position/init
function entity/position/getRotateY

scoreboard objectives add op:ry_offset dummy

scoreboard players operation @s op:ry_offset = @s pos:rotate_y
scoreboard players operation @s op:ry_offset -= @s op:ry_start

execute if score @s op:ry_offset matches 180.. run scoreboard players add @s op:ry_offset -360
execute if score @s op:ry_offset matches ..-181 run scoreboard players add @s op:ry_offset 360
