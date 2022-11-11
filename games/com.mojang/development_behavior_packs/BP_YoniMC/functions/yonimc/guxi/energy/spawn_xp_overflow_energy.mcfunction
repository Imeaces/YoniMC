scoreboard players remove @s arg_0 1


execute if score @s arg_0 matches 1.. run function yonimc/guxi/energy/spawn_xp_overflow_energy

scoreboard players operation @s guxi:energy -= @s arg_1
#scoreboard players remove @s guxi:energy 3712882
function yonimc/guxi/energy/pool

xp 10000
