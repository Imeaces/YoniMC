
#: var_1 = ry - lst
scoreboard players operation @s var_1 = @s op:lst_ry
scoreboard players operation @s var_1 -= @s pos:rotate_y

#: var_2 = var_1的绝对值
scoreboard players operation @s var_2 = @s var_1
execute if score @s var_2 matches ..-1 run scoreboard players operation @s var_2 *= @s var_8

#: var_3 = 360 - var_2
scoreboard players operation @s var_3 = @s var_7
scoreboard players operation @s var_3 -= @s var_2

#: var_4
#: -1 表示lst小
#: 1 表示ry小
execute if score @s md:lst_ry < @s pos:rotate_y run scoreboard players set @s var_4 -1
execute if score @s pos:rotate_y > @s op:lst_ry run scoreboard players set @s var_4 1

#: 最终偏移量
#: var_5 = var_2 < var_3 ? var_1 : ( var_3 * var_4 )
execute if score @s var_2 < @s var_3 run scoreboard players operation @s var_5 = @s var_1
execute if score @s var_2 >= @s var_3 run scoreboard players operation @s var_5 = @s var_3
execute if score @s var_2 >= @s var_3 run scoreboard players operation @s var_5 *= @s var_4

scoreboard players operation @s op:lst_ry = @s pos:rotate_y

scoreboard players operation @s op:ry_ost = @s var_5
