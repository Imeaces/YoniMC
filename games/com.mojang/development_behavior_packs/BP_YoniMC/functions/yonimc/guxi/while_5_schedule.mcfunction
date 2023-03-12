scoreboard objectives add guxi:time_4792 dummy
scoreboard players set @s var_0 0

execute if score @s guxi:time_4792 matches 0..5 run scoreboard players set @s var_0 1
execute if score @s var_0 matches 0 run scoreboard players set @s guxi:time_4792 0
execute if score @s var_0 matches 1 run scoreboard players add @s guxi:time_4792 1

execute if score @s var_0 matches 0 run function yonimc/guxi/do_5_schedule
