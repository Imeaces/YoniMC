scoreboard objectives add guxi:energy_pool dummy
#mapping var self.guxi.energy_pool_size = guxi:energy_pool

scoreboard objectives add var_0 dummy
scoreboard objectives add var_1 dummy

#scoreboard players set @s var_0 0
#scoreboard players set @s var_1 0

scoreboard players operation @s var_0 = @s guxi:energy
scoreboard players operation @s var_0 /= @s guxi:energy_st
scoreboard players operation @s var_1 = @s guxi:energy
scoreboard players operation @s var_1 %= @s guxi:energy_st

execute if entity @s[scores={var_0=!0}] run scoreboard players operation @s guxi:energy_pool += @s var_0
execute if entity @s[scores={var_0=!0}] run scoreboard players operation @s guxi:energy = @s var_1

#mapping var self.guxi.energy_stack = guxi:val_5000

execute if entity @s[scores={var_1=..-1}] run scoreboard players remove @s guxi:energy_pool 1
execute if entity @s[scores={var_1=..-1}] run scoreboard players operation @s guxi:energy += @s guxi:energy_st
