#operation/rotate_y_offset_append
execute @s[scores={op:ry_origin=181..}] ~ ~ ~ scoreboard players add @s op:ry_origin -360
execute @s[scores={op:ry_origin=..-181}] ~ ~ ~ scoreboard players add @s op:ry_origin 360
