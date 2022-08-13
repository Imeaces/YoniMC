scoreboard players remove @s arg_0 1

scoreboard objectives add var_0 dummy
scoreboard players random @s var_0 500 1400

scoreboard players operation @s guxi:energy_pool -= @s var_0
xp 1l @s

execute if score @s arg_0 matches 1.. run function yonimc/guxi/energy/transform_to_exp
