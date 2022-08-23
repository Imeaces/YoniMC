scoreboard players remove @s guxi:energy_pool 1000
summon xp_bottle
execute if score @s guxi:energy_pool matches 1000.. run function yonimc/energy/guxi/spread_exp
