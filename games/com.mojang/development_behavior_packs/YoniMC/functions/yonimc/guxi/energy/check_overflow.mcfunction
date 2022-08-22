scoreboard objectives add var_0 dummy
scoreboard players set @s var_0 0
scoreboard objectives add var_1 dummy
scoreboard players set @s var_1 0
#:递归次数限制
scoreboard objectives add var_2 dummy
scoreboard players set @s var_2 50

scoreboard objectives add arg_0 dummy
scoreboard players set @s arg_0 0

execute if score @s guxi:pp_energy matches 10000 run scoreboard players set @s var_0 71
execute if score @s var_0 matches 71 run scoreboard players operation @s var_1 = @s guxi:energy_pool
execute if score @s var_0 matches 71 run scoreboard players operation @s var_1 -= @s guxi:energy_stpo

execute if score @s var_1 matches 1.. run scoreboard players set @s var_0 73

execute if score @s var_0 matches 73 run scoreboard players operation @s var_1 < @s var_2

execute if score @s var_0 matches 73 run scoreboard players operation @s arg_0 = @s var_1

#execute if score @s var_0 matches 73 run function yonimc/guxi/energy/spawn_overflow_energy
execute if score @s var_0 matches 73 run function yonimc/guxi/energy/spawn_xp_overflow_energy
