scoreboard objectives add arg_0 dummy
scoreboard objectives add arg_1 dummy

scoreboard objectives add var_0 dummy
scoreboard players set @s var_0 0

function yonimc/guxi/effect/talent

# effect about guxi:ef_speed
execute if entity @s[scores={guxi:ef_speed=!0}] run function yonimc/guxi/effect/speed
execute if score @s guxi:ef_speed matches 1.. run scoreboard players set @s var_0 881
execute if score @s var_0 matches 881 run scoreboard players set @s arg_0 15
execute if score @s var_0 matches 881 run scoreboard players set @s arg_1 70
execute if score @s var_0 matches 881 run scoreboard players operation @s arg_0 *= @s guxi:ef_speed
execute if score @s var_0 matches 881 run scoreboard players operation @s arg_1 *= @s guxi:ef_speed
execute if score @s var_0 matches 881 run scoreboard players remove @s guxi:ef_speed 1
execute if score @s var_0 matches 881 run function yonimc/guxi/energy/drop_randomly

# effect about guxi:ef_mining
execute if entity @s[scores={guxi:ef_mining=!0}] run function yonimc/guxi/effect/mining
execute if score @s guxi:ef_mining matches 1.. run scoreboard players set @s var_0 531
execute if score @s var_0 matches 531 run scoreboard players set @s arg_0 27
execute if score @s var_0 matches 531 run scoreboard players set @s arg_1 142
execute if score @s var_0 matches 531 run scoreboard players operation @s arg_0 *= @s guxi:ef_mining
execute if score @s var_0 matches 531 run scoreboard players operation @s arg_1 *= @s guxi:ef_mining
execute if score @s var_0 matches 531 run scoreboard players remove @s guxi:ef_mining 1
execute if score @s var_0 matches 531 run function yonimc/guxi/energy/drop_randomly


# effect about guxi:ef_damage
execute if entity @s[scores={guxi:ef_damage=!0}] run function yonimc/guxi/effect/damage
execute if score @s guxi:ef_damage matches 1.. run scoreboard players set @s var_0 -662
execute if score @s var_0 matches -662 run scoreboard players set @s arg_0 49
execute if score @s var_0 matches -662 run scoreboard players set @s arg_1 752
execute if score @s var_0 matches -662 run scoreboard players operation @s arg_0 *= @s guxi:ef_damage
execute if score @s var_0 matches -662 run scoreboard players operation @s arg_1 *= @s guxi:ef_damage
execute if score @s var_0 matches -662 run scoreboard players remove @s guxi:ef_damage 1
execute if score @s var_0 matches -662 run function yonimc/guxi/energy/drop_randomly


# effect about guxi:ef_res
execute if entity @s[scores={guxi:ef_res=!0}] run function yonimc/guxi/effect/resistance
execute if score @s guxi:ef_res matches 1.. run scoreboard players set @s var_0 471
execute if score @s var_0 matches 471 run scoreboard players set @s arg_0 49
execute if score @s var_0 matches 471 run scoreboard players set @s arg_1 752
execute if score @s var_0 matches 471 run scoreboard players operation @s arg_0 *= @s guxi:ef_res
execute if score @s var_0 matches 471 run scoreboard players operation @s arg_1 *= @s guxi:ef_res
execute if score @s var_0 matches 471 run function yonimc/guxi/energy/drop_randomly

