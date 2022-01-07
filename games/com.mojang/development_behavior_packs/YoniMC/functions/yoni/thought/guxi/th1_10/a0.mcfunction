#yoni/thought/guxi/th1_10/a0
execute @s[scores={op:ry_origin=31..}] ~ ~ ~ scoreboard players add @s op:ry_origin -20
execute @s[scores={op:ry_origin=..-31}] ~ ~ ~ scoreboard players add @s op:ry_origin 20

function operation/rotate_y_offset_append
