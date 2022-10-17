scoreboard players remove @s arg_0 1

scoreboard players random @s var_0 507870 14078730

scoreboard players operation @s guxi:energy -= @s var_0
xp 1l @s

execute if score @s arg_0 matches 1.. run function yonimc/guxi/energy/transform_to_exp
