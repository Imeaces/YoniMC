scoreboard players set global var_0 0

execute if score timer yonimc:effect matches 0..20 run scoreboard players set global var_0 1
execute if score global var_0 matches 0 run scoreboard players set timer yonimc:timer 0
execute if score global var_0 matches 1 run scoreboard players add timer yonimc:timer 1

execute if score global var_0 matches 0 run function yonimc/effect/do_schedule
