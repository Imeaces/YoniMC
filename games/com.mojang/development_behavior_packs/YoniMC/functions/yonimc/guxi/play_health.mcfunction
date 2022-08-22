
scoreboard objectives add var_0 dummy
scoreboard players set @s var_0 0
scoreboard objectives add var_1 dummy
scoreboard players set @s var_1 0

scoreboard players operation @s var_0 = @s guxi:health_stat
scoreboard players operation @s var_0 -= @s guxi:sp_energy

execute if entity @s[scores={var_0=!0}] run scoreboard players set @s var_1 1

execute if entity @s[scores={var_1=1,guxi:sp_energy=10000}] run event entity @s append:guxi_in_low_energy
execute if entity @s[scores={var_1=1,guxi:sp_energy=10003,guxi:health_stat=10004..}] run event entity @s append:guxi_in_enough_energy
execute if entity @s[scores={var_1=1,guxi:sp_energy=10030}] run event entity @s append:guxi_in_enough_energy
execute if entity @s[scores={var_1=1,guxi:sp_energy=10077}] run event entity @s append:guxi_in_plenty_energy

execute if score @s var_1 matches 1 run scoreboard players operation @s guxi:health_stat = @s guxi:sp_energy
