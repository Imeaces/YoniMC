#每日消耗1能量
scoreboard players operation @s var = @s timer
scoreboard players operation @s var %= day_ticks var
execute @s[scores={var=0}] ~ ~ ~ function yoni/guxi/day_consume

#移动时消耗能量
execute @s[tag=status.is_moving] ~ ~ ~ function yoni/guxi/moving
