scoreboard players add @s guxi:energy 40233
scoreboard players random @s var_0 1 1200
#scoreboard players random @s var_0 999 1000

execute if score @s var_0 matches 1000 run fill ~-4 ~-4 ~-4 ~4 ~4 ~4 obsidian [] replace lava
execute if score @s var_0 matches 1000 run fill ~-4 ~-4 ~-4 ~4 ~4 ~4 stone [] replace flowing_lava
execute if score @s var_0 matches 1000 run fill ~-3 ~-3 ~-3 ~3 ~3 ~3 netherrack [] replace magma
execute if score @s var_0 matches 1000 run fill ~-3 ~-3 ~-3 ~3 ~3 ~3 air [] replace fire
