tellraw @s {"rawtext":[{"translate":"#: #.你死了"}]}
xp -25000l @s

function yonimc/guxi/creation/elytra/recovery

execute if score @s guxi:pp_energy matches 300.. run scoreboard players set @s arg_0 40
execute if score @s guxi:pp_energy matches 300.. run function yonimc/energy/guxi/spread_exp
