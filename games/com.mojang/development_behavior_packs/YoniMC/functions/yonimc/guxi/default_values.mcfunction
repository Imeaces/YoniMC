function yonimc/guxi/set_global_values

#var guxi:energy_stpo energy pool max stack count
scoreboard objectives add guxi:energy_stpo dummy
#var default guxi:energy_stpo 360000
scoreboard players operation @s guxi:energy_stpo = default_energy_pool_volume guxi:values

#var guxi:energy_pool energy pool
scoreboard objectives add guxi:energy_pool dummy
#var default guxi:energy_pool 3600
scoreboard players operation @s guxi:energy_pool = default_energy_pool_size guxi:values 

#var guxi:energy_st per energy stack count
scoreboard objectives add guxi:energy_st dummy
#var default guxi:energy_st 100000
scoreboard players operation @s guxi:energy_st = default_energy_volume guxi:values

#var guxi:energy energy
scoreboard objectives add guxi:energy dummy
#var default guxi:energy 100000
scoreboard players operation @s guxi:energy =  default_energy_count guxi:values

#var guxi:memory_er energy by menory
scoreboard objectives add guxi:memory_er dummy
#var default guxi:memory_er 10000
scoreboard players operation @s guxi:memory_er = default_memory_count guxi:values

#var guxi:exp_tr energy by menory
scoreboard objectives add guxi:exp_tr dummy
#var default guxi:exp_tr 30
scoreboard players operation @s guxi:exp_tr = default_exp_transform_count guxi:values 


#var guxi:ef_speed - use effect to modify guxi's speed
scoreboard objectives add guxi:ef_speed dummy
#var default guxi:ef_speed -2
scoreboard players operation @s guxi:ef_speed = default_speed_affect guxi:values

#var guxi:ef_mining - use effect to modify guxi's mining speed
scoreboard objectives add guxi:ef_mining dummy
#var default guxi:ef_mining -1
scoreboard players operation @s guxi:ef_mining = default_mining_affect guxi:values

#var guxi:ef_damage - use effect to modify guxi's attack damage
scoreboard objectives add guxi:ef_damage dummy
#var default guxi:ef_damage -2
scoreboard players operation @s guxi:ef_damage = default_damage_affect guxi:values

#var guxi:ef_res - use effect to modify guxi's resistance 
scoreboard objectives add guxi:ef_res dummy
#var default guxi:ef_res 0
scoreboard players operation @s guxi:ef_res = default_resistance_affect guxi:values

tell @s 设置了自己使用的变量