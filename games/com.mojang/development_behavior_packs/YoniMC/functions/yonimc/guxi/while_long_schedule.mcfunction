scoreboard objectives add guxi:time_1 dummy
scoreboard objectives add var_0 dummy
scoreboard players set @s var_0 0

execute if score @s guxi:time_1 matches 0..200 run scoreboard players set @s var_0 1
execute if score @s var_0 matches 0 run scoreboard players set @s guxi:time_1 0
execute if score @s var_0 matches 1 run scoreboard players add @s guxi:time_1 1

execute if score @s var_0 matches 0 run function yonimc/guxi/do_long_schedule
