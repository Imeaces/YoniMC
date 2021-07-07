scoreboard players add @s guxi_moving 1
scoreboard players operation @s var = @s guxi_moving
scoreboard players operation @s var %= guxi_moving_per_ticks var
execute @s[scores={var=0}] ~ ~ ~ function yoni/guxi/consume/moving
