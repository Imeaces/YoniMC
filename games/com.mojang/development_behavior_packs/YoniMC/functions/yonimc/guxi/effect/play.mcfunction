
scoreboard players set @s var_0 0

function yonimc/guxi/effect/talent

# effect about guxi:ef_speed
execute unless score @s guxi:ef_speed matches 0 run function yonimc/guxi/effect/speed
execute if score @s guxi:ef_speed matches 1.. run scoreboard players set @s var_0 881
execute if score @s var_0 matches 881 run scoreboard players set @s arg_0 15
execute if score @s var_0 matches 881 run scoreboard players set @s arg_1 70
execute if score @s var_0 matches 881 run scoreboard players operation @s arg_0 *= @s guxi:ef_speed
execute if score @s var_0 matches 881 run scoreboard players operation @s arg_1 *= @s guxi:ef_speed
execute if score @s guxi:keep_ef matches 0 if score @s guxi:ef_speed > default_speed_affect guxi:values run scoreboard players remove @s guxi:ef_speed 1
execute if score @s var_0 matches 881 run function yonimc/guxi/energy/drop_randomly

# effect about guxi:ef_mining
execute unless score @s guxi:ef_mining matches 0 run function yonimc/guxi/effect/mining
execute if score @s guxi:ef_mining matches 1.. run scoreboard players set @s var_0 531
execute if score @s var_0 matches 531 run scoreboard players set @s arg_0 27
execute if score @s var_0 matches 531 run scoreboard players set @s arg_1 142
execute if score @s var_0 matches 531 run scoreboard players operation @s arg_0 *= @s guxi:ef_mining
execute if score @s var_0 matches 531 run scoreboard players operation @s arg_1 *= @s guxi:ef_mining
execute if score @s guxi:keep_ef matches 0 if score @s guxi:ef_mining > default_mining_affect guxi:values run scoreboard players remove @s guxi:ef_mining 1
execute if score @s var_0 matches 531 run function yonimc/guxi/energy/drop_randomly


# effect about guxi:ef_damage
execute unless score @s guxi:ef_damage matches 0 run function yonimc/guxi/effect/damage
execute if score @s guxi:ef_damage matches 1.. run scoreboard players set @s var_0 -662
execute if score @s var_0 matches -662 run scoreboard players set @s arg_0 49
execute if score @s var_0 matches -662 run scoreboard players set @s arg_1 752
execute if score @s var_0 matches -662 run scoreboard players operation @s arg_0 *= @s guxi:ef_damage
execute if score @s var_0 matches -662 run scoreboard players operation @s arg_1 *= @s guxi:ef_damage
execute if score @s guxi:keep_ef matches 0 if score @s guxi:ef_damage > default_damage_affect guxi:values run scoreboard players remove @s guxi:ef_damage 1
execute if score @s var_0 matches -662 run function yonimc/guxi/energy/drop_randomly


# effect about guxi:ef_res
execute unless score @s guxi:ef_res matches 0 run function yonimc/guxi/effect/resistance
execute if score @s guxi:ef_res matches 1.. run scoreboard players set @s var_0 471
execute if score @s var_0 matches 471 run scoreboard players set @s arg_0 1020
execute if score @s var_0 matches 471 run scoreboard players set @s arg_1 9812
execute if score @s var_0 matches 471 run scoreboard players operation @s arg_0 *= @s guxi:ef_res
execute if score @s var_0 matches 471 run scoreboard players operation @s arg_1 *= @s guxi:ef_res
execute if score @s guxi:keep_res matches 0 if score @s guxi:ef_res matches 1.. run scoreboard players remove @s guxi:ef_res 1
execute if score @s var_0 matches 471 run function yonimc/guxi/energy/drop_randomly

# effect about guxi:ef_fireimmu
execute unless score @s guxi:ef_fireimmu matches 0 run function yonimc/guxi/effect/fire_immune
execute if score @s guxi:ef_fireimmu matches 1.. run scoreboard players set @s var_0 134
execute if score @s var_0 matches 134 run scoreboard players set @s arg_0 160
execute if score @s var_0 matches 134 run scoreboard players set @s arg_1 390
execute if score @s var_0 matches 134 run scoreboard players operation @s arg_0 *= @s guxi:ef_fireimmu
execute if score @s var_0 matches 134 run scoreboard players operation @s arg_1 *= @s guxi:ef_fireimmu
execute if score @s var_0 matches 134 run scoreboard players remove @s guxi:ef_fireimmu 4
execute if score @s var_0 matches 134 run function yonimc/guxi/energy/raise_randomly

