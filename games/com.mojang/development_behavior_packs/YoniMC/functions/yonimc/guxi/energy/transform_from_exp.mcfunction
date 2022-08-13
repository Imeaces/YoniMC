scoreboard players remove @s arg_0 1

scoreboard objectives add var_0 dummy
scoreboard players random @s var_0 377 1121

xp -1l @s
scoreboard players operation @s guxi:energy_pool += @s var_0

execute if score @s arg_0 matches 1.. run function yonimc/guxi/energy/transform_from_exp
