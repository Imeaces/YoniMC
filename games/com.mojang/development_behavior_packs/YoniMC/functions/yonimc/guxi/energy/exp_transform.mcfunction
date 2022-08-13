function status/player/exp

scoreboard players set @s var_0 0
scoreboard objectives add var_1 dummy
scoreboard players set @s var_1 0
scoreboard objectives add var_2 dummy
#一次转换的经验等级（太大会超函数限制，建议不超过150）
scoreboard players set @s var_2 24
scoreboard objectives add var_3 dummy
scoreboard players set @s var_3 -1

#计算与应该保持的经验的差值
scoreboard players operation @s var_1 = @s exp
scoreboard players operation @s var_1 -= @s guxi:exp_tr
#根据结果来判断应该运行什么函数，并输出次数
execute if score @s var_1 matches 1.. run scoreboard players set @s var_0 2
execute if score @s var_1 matches ..-1 run scoreboard players set @s var_0 5
execute if score @s var_1 matches ..-1 run scoreboard players operation @s var_1 *= @s var_3
#确保一次转换的经验不会太多
scoreboard players operation @s var_1 < @s var_2

#运行函数
scoreboard objectives add arg_0 dummy 
scoreboard players operation @s arg_0 = @s var_1

execute if score @s var_0 matches 2 run function yonimc/guxi/energy/transform_from_exp
execute if score @s var_0 matches 5 run function yonimc/guxi/energy/transform_to_exp

stopsound @s random.levelup
