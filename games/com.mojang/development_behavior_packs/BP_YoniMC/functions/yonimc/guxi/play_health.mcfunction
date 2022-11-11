#根据当前拥有的能量决定血量

scoreboard players set @s var_0 0

execute unless score @s guxi:health_stat = @s guxi:sp_energy run scoreboard players set @s var_0 2333

execute if score @s var_0 matches 2333 if score @s guxi:sp_energy matches 10000 run event entity @s append:guxi_in_low_energy
execute if score @s var_0 matches 2333 if score @s guxi:sp_energy matches 10003 if score @s guxi:health_stat matches 10004.. run event entity @s append:guxi_in_enough_energy
execute if score @s var_0 matches 2333 if score @s guxi:sp_energy matches 10030 run event entity @s append:guxi_in_enough_energy

execute if score @s var_0 matches 2333 if score @s guxi:sp_energy matches 10077.. run event entity @s append:guxi_in_plenty_energy

execute if score @s var_0 matches 2333 run scoreboard players operation @s guxi:health_stat = @s guxi:sp_energy
