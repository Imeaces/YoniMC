#operation/rotate_y_offset

scoreboard players operation @s op:ry_offset = @s rotate_y
scoreboard players operation @s op:ry_offset -= @s op:ry_origin

execute @s[scores={op:ry_offset=180..}] ~ ~ ~ scoreboard players add @s op:ry_offset -360
execute @s[scores={op:ry_offset=..-180}] ~ ~ ~ scoreboard players add @s op:ry_offset 360
