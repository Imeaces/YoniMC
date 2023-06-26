tellraw @s {"rawtext":[{"translate":"#: #.你死了"}]}
xp -25000l @s

function yonimc/guxi/creation/elytra/recovery

# 这里可以设置死亡之后生成的最大经验球数量
function yonimc/guxi/play_energy
scoreboard players set @s arg_0 0
scoreboard players set @s var_0 0
scoreboard players set @s var_1 100
execute if score @s guxi:pp_energy matches 300.. run scoreboard players set @s var_0 876

execute if score @s var_0 matches 876 run scoreboard players operation @s arg_0 = @s guxi:energy_pool
execute if score @s var_0 matches 876 run scoreboard players operation @s arg_0 *= @s var_1
execute if score @s var_0 matches 876 run scoreboard players operation @s arg_0 /= @s guxi:pp_energy
execute if score @s var_0 matches 876 run function yonimc/guxi/energy/spread_exp
