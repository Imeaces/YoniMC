scoreboard players set @s var_0 0
scoreboard players set @s var_1 0

scoreboard players set @s var_2 100

scoreboard players set @s var_3 0


#: 活着就会消耗的能量
scoreboard players set @s arg_0 1
scoreboard players set @s arg_1 100
function yonimc/guxi/energy/drop_randomly

#能量状态（新）
#var guxi:pp_energy 能量池存储百分比(到小数点后两位，且范围在0~100%)
scoreboard objectives add guxi:pp_energy dummy
scoreboard players operation @s var_0 = @s guxi:energy_pool
scoreboard players operation @s var_3 = @s guxi:energy_stpo
scoreboard players operation @s var_0 *= @s var_2
scoreboard players operation @s var_3 /= @s var_2
scoreboard players operation @s var_0 /= @s var_3
execute if score @s var_0 matches 10001.. run scoreboard players set @s guxi:pp_energy 10000
execute if score @s var_0 matches ..-1 run scoreboard players set @s guxi:pp_energy 0
execute if score @s var_0 matches 0..10000 run scoreboard players operation @s guxi:pp_energy = @s var_0

#:能量满了
execute if score @s guxi:pp_energy matches 10000 if score @s guxi:energy_st < max_energy_volume guxi:values run scoreboard players set @s var_0 715152
#:扩展能量堆大小
execute if score @s var_0 matches 715152 run scoreboard players add @s guxi:energy_st 1
execute if score @s var_0 matches 715152 run scoreboard players operation @s guxi:energy -= @s guxi:energy_pool
#:扩展经验存储上限
execute if score @s var_0 matches 715152 if score @s guxi:exp_tr < @s guxi:exp_st run scoreboard players add @s guxi:exp_tr 1
#:debug 
#execute if score @s var_0 matches 715152 run say this 715152

#经验池存储百分比（没写，这不是应该在经验管理里边写吗？
scoreboard objectives add guxi:lp_energy dummy

#能量池状态
scoreboard objectives add guxi:sp_energy dummy
#: 10000 默认，或者都不到
scoreboard players set @s guxi:sp_energy 10000

#: 10003 能量池过3%
execute if score @s guxi:pp_energy matches 300.. run scoreboard players set @s guxi:sp_energy 10003

#: 10030 能量池过30%
execute if score @s guxi:pp_energy matches 3000.. run scoreboard players set @s guxi:sp_energy 10030

#: 10077 能量池过77%
execute if score @s guxi:pp_energy matches 7700.. run scoreboard players set @s guxi:sp_energy 10077

#: 10000 能量池不到默认3%
scoreboard players operation @s var_0 = default_energy_pool_volume guxi:values
scoreboard players set @s var_1 3
scoreboard players operation @s var_0 *= @s var_1
scoreboard players set @s var_1 100
scoreboard players operation @s var_0 /= @s var_1
execute if score @s guxi:energy_pool < @s var_0 run scoreboard players set @s guxi:sp_energy 10000

#如果可能，缩小能量堆来获得能量
#:10000
execute if score @s guxi:sp_energy matches ..10030 if score @s guxi:energy_st > default_energy_volume guxi:values run scoreboard players set @s var_0 751415
execute if score @s var_0 matches 751415 run scoreboard players remove @s guxi:energy_st 1
execute if score @s var_0 matches 751415 run scoreboard players operation @s guxi:energy += @s guxi:energy_pool
#:debug 
#execute if score @s var_0 matches 751415 run say this 751415


#如果可能，降低经验需求来获得能量
#:10000
execute if score @s guxi:sp_energy matches ..10003 if score @s guxi:exp_tr > min_exp_transform_count guxi:values run scoreboard players set @s var_0 74751
execute if score @s var_0 matches 74751 run scoreboard players remove @s guxi:exp_tr 1

#死亡

#: pp0 虽然来到这个世界是个意外，不过，还是不太想走呢
##0 可惜能量已经不够了
execute if score @s guxi:pp_energy matches 0 if score @s guxi:energy_pool matches ..0 run scoreboard players set @s var_0 70052
execute if score @s var_0 matches 70052 run kill @s
execute if score @s var_0 matches 70052 run tellraw @a {"rawtext":[{"translate":"%%s 消散了", "with":{"rawtext":[{"selector":"@s"}]}}]}
