#var op:lst_ry last rotate y
scoreboard objectives add op:lst_ry dummy

#var op:ry_ost rotate y -> op:lst_ry
scoreboard objectives add op:ry_ost dummy
scoreboard players set @s op:ry_ost 0

function yonimc/species/guxi/mind_old/entity/position/getRotateY

scoreboard players operation @s op:lst_ry = @s pos:rotate_y
