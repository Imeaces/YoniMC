

scoreboard players add @s guxi:val_3001 0
scoreboard players set @s var_0 0
scoreboard players set @s var_1 0
scoreboard players set @s var_2 0

#if arg0 == 1
#then var0 = 1
execute if entity @s[scores={arg_0=1}] run scoreboard players set @s var_0 1
execute if entity @s[scores={var_0=1}] run scoreboard players set @s arg_0 0


# if var_0 == 1 && guxi:val_3001 == 0
# then var_0 = 1
# else var_0 = 2
execute if entity @s[scores={var_0=1,guxi:val_3001=0}] run scoreboard players set @s var_0 1
execute if entity @s[scores={var_0=1,guxi:val_3001=!0}] run scoreboard players set @s var_0 2


# if var_0 == 1 || var_0 == 2
# then var_1 = arg_1 
## arg_1 = 0
execute if entity @s[scores={var_0=1..2}] run scoreboard players operation @s var_1 = @s arg_1
execute if entity @s[scores={var_0=1..2}] run scoreboard players set @s arg_1 0


# if var_0 == 1 && var_1 = 3
# then func"设置鞘翅"()yonimc/guxi/ability/expand_areo
execute if entity @s[scores={var_0=1,var_1=3}] run function yonimc/guxi/ability/expand_areo

# if var_0 == 2 && var_1 = 3
# then func"移除鞘翅"(1)yonimc/guxi/ability/expand_areo
execute if entity @s[scores={var_0=1,var_1=3}] run function yonimc/guxi/ability/expand_areo
