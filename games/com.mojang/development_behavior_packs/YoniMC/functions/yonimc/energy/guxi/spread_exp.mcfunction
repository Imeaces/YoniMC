function yonimc/guxi/energy/pool
scoreboard players remove @s guxi:energy 79291
scoreboard players remove @s arg_0 1
execute if score @s arg_0 matches 1.. if score @s guxi:energy_pool matches 1.. run function yonimc/energy/guxi/spread_exp
summon xp_orb
