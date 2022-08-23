tellraw @s {"rawtext":[{"translate":"#: #.你死了"}]}
xp -25000l @s

execute if score @s guxi:pp_energy matches 300.. run function yonimc/energy/guxi/spread_exp
