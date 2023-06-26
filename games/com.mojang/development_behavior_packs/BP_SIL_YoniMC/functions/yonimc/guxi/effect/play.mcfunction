
scoreboard players set @s var_0 0

function yonimc/guxi/effect/talent

# effect about guxi:ef_mining
execute unless score @s guxi:ef_mining matches 0 run function yonimc/guxi/effect/mining
execute if score @s guxi:ef_mining matches 1.. run scoreboard players set @s var_0 531
execute if score @s var_0 matches 531 run scoreboard players operation @s arg_0 = mining_affact_energy_multiplier_min guxi:values
execute if score @s var_0 matches 531 run scoreboard players operation @s arg_1 = mining_affact_energy_multiplier_max guxi:values
execute if score @s var_0 matches 531 run scoreboard players operation @s arg_0 *= @s guxi:ef_mining
execute if score @s var_0 matches 531 run scoreboard players operation @s arg_1 *= @s guxi:ef_mining
execute if score @s guxi:keep_ef matches 0 if score @s guxi:ef_mining matches 1.. run scoreboard players remove @s guxi:ef_mining 1
execute if score @s guxi:ef_mining matches ..0 if score @s guxi:ef_mining > default_mining_affect guxi:values run scoreboard players remove @s guxi:ef_mining 1
execute if score @s var_0 matches 531 run function yonimc/guxi/energy/drop_randomly


# effect about guxi:ef_damage
execute unless score @s guxi:ef_damage matches 0 run function yonimc/guxi/effect/damage
execute if score @s guxi:ef_damage matches 1.. run scoreboard players set @s var_0 -662
execute if score @s var_0 matches -662 run scoreboard players operation @s arg_0 = damage_affact_energy_multiplier_min guxi:values
execute if score @s var_0 matches -662 run scoreboard players operation @s arg_1 = damage_affact_energy_multiplier_max guxi:values
execute if score @s var_0 matches -662 run scoreboard players operation @s arg_0 *= @s guxi:ef_damage
execute if score @s var_0 matches -662 run scoreboard players operation @s arg_1 *= @s guxi:ef_damage
execute if score @s guxi:keep_ef matches 0 if score @s guxi:ef_damage matches 1.. run scoreboard players remove @s guxi:ef_damage 1
execute if score @s guxi:ef_damage matches ..0 if score @s guxi:ef_damage > default_damage_affect guxi:values run scoreboard players remove @s guxi:ef_damage 1
execute if score @s var_0 matches -662 run function yonimc/guxi/energy/drop_randomly


# effect about guxi:ef_res
execute unless score @s guxi:ef_res matches 0 run function yonimc/guxi/effect/resistance
execute if score @s guxi:ef_res matches 1.. run scoreboard players set @s var_0 471
execute if score @s var_0 matches 471 run scoreboard players operation @s arg_0 = speed_affact_energy_multiplier_min guxi:values
execute if score @s var_0 matches 471 run scoreboard players operation @s arg_1 = resistance_affact_energy_multiplier_max guxi:values
execute if score @s var_0 matches 471 run scoreboard players operation @s arg_0 *= @s guxi:ef_res
execute if score @s var_0 matches 471 run scoreboard players operation @s arg_1 *= @s guxi:ef_res
execute if score @s guxi:keep_res matches 0 if score @s guxi:ef_res matches 1.. run scoreboard players remove @s guxi:ef_res 1
execute if score @s var_0 matches 471 run function yonimc/guxi/energy/drop_randomly
