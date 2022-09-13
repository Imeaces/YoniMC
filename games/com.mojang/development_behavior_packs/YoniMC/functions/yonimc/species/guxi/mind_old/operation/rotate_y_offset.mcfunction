scoreboard players set @s var_0 0
scoreboard players set @s var_3 180
scoreboard players set @s var_7 360
scoreboard players set @s var_8 -1

function yonimc/species/guxi/mind_old/entity/position/getRotateY

execute unless score @s md:lst_ry = @s pos:rotate_y run function yonimc/species/guxi/mind_old/operation/play_wheel
