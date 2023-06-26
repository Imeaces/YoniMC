scoreboard players remove @s arg_0 1

execute if score @s arg_0 matches 1.. run function yonimc/guxi/energy/give_overflow_energy

scoreboard players remove @s guxi:energy_pool 100

give @s experience_bottle 10
