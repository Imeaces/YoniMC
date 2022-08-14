scoreboard objectives add guxi:values dummy

#var default guxi:energy_stpo 36000
scoreboard players set default_energy_pool_volume guxi:values 36000

#var default guxi:energy_pool 3600
scoreboard players set default_energy_pool_size guxi:values 3600

#var default guxi:energy_st 10000
scoreboard players set default_energy_volume guxi:values 10000

#var max guxi:energy_st 1000000
scoreboard players set max_energy_volume guxi:values 1000000

#var default guxi:energy 10000
scoreboard players set default_energy_count guxi:values 10000

#var default guxi:memory_er 10000
scoreboard players set default_memory_count guxi:values 10000

#var default guxi:exp_tr 30
scoreboard players set default_exp_transform_count guxi:values 30

#var min guxi:exp_tr 24
scoreboard players set min_exp_transform_count guxi:values 24


#var default guxi:ef_speed -2
scoreboard players set default_speed_affect guxi:values -2

#var default guxi:ef_mining -1
scoreboard players set default_mining_affect guxi:values -1

#var default guxi:ef_damage -2
scoreboard players set default_damage_affect guxi:values -1

#var default guxi:ef_res 0
scoreboard players set default_resistance_affect guxi:values 0

#var default guxi:ef_res 0
scoreboard players set default_fire_immune_affect guxi:values 15

#var default guxi:exp_st 40
scoreboard players set default_max_exp_energy_volume guxi:values 40

#:var lava_bucket_eat_energy
scoreboard players set lava_bucket_energy_volume guxi:values 20000


tell @s 设置了全局使用的变量