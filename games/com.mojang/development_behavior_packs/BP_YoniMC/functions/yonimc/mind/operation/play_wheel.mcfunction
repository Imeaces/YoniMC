#: arg_1 base_ry  190
#: arg_2 cur_ry  -170
#: arg_3 lst_ost_ry  0
#: ret_0 base_mod_ry
#: ret_1 cur_ost_ry

scoreboard players set @s var_6 180
scoreboard players set @s var_7 360
scoreboard players set @s var_8 -1

#: var_1 = ry - lst - lst_ost_ry # -360
scoreboard players operation @s var_1 = @s arg_2
scoreboard players operation @s var_1 -= @s arg_1
scoreboard players operation @s var_1 -= @s arg_3

#: var_2 = abs var_1 # 360
scoreboard players operation @s var_2 = @s var_1
execute if score @s var_2 matches ..-1 run scoreboard players operation @s var_2 *= @s var_8

#: var_3 = 360 - var_2 # 0
scoreboard players operation @s var_3 = @s var_7
scoreboard players operation @s var_3 -= @s var_2

#: var_4 # 1
#: -1 表示lst小
#: 1 表示ry小
execute if score @s arg_1 < @s arg_2 run scoreboard players set @s var_4 -1
execute if score @s arg_1 > @s arg_2 run scoreboard players set @s var_4 1

#: 最终偏移量 # 10
#: var_5 = var_2 < var_3 ? var_1 : ( var_3 * var_4 )
execute if score @s var_2 < @s var_3 run scoreboard players operation @s var_5 = @s var_1
execute if score @s var_2 >= @s var_3 run scoreboard players operation @s var_5 = @s var_3
execute if score @s var_2 >= @s var_3 run scoreboard players operation @s var_5 *= @s var_4

scoreboard players operation @s var_0 = @s arg_1
scoreboard players operation @s var_0 += @s var_5

#: ret
scoreboard players operation @s ret_0 = @s var_0
scoreboard players operation @s ret_1 = @s var_5
