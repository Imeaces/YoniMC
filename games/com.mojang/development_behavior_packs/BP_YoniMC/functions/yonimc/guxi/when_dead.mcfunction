tellraw @s {"rawtext":[{"translate":"#: #.你死了"}]}
xp -25000l @s

function yonimc/guxi/creation/elytra/recovery

# 这里可以设置死亡之后生成的最大经验球数量
execute if score @s guxi:pp_energy matches 300.. run scoreboard players set @s arg_0 80
execute if score @s guxi:pp_energy matches 300.. run function yonimc/energy/guxi/spread_exp
