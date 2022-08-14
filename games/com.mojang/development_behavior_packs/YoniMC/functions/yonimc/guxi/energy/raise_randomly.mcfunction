# arg_0最小值
# arg_1最大值

scoreboard objectives add var_0 dummy
scoreboard objectives add var_1 dummy
scoreboard players set @s var_0 0
scoreboard players set @s var_1 0

scoreboard players random @s var_0 0 2147483647
scoreboard players operation @s var_1 = @s arg_1
scoreboard players operation @s var_1 -= @s arg_0
scoreboard players operation @s var_0 %= @s var_1
scoreboard players operation @s var_1 = @s arg_0
scoreboard players operation @s var_1 += @s var_0

scoreboard players operation @s guxi:energy += @s var_0
