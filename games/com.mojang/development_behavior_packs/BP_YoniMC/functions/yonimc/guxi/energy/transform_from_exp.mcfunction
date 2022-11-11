scoreboard players remove @s arg_0 1

scoreboard players random @s var_0 37577 1782121

xp -1l @s
scoreboard players operation @s guxi:energy += @s var_0

execute if score @s arg_0 matches 1.. run function yonimc/guxi/energy/transform_from_exp
