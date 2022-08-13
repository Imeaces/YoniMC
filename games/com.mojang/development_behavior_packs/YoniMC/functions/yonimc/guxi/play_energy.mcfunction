scoreboard objectives add var_0 dummy
scoreboard players set @s var_0 0
scoreboard objectives add var_1 dummy
scoreboard players set @s var_1 0

scoreboard objectives add arg_0 dummy
scoreboard objectives add arg_1 dummy

scoreboard players set @s arg_0 1
scoreboard players set @s arg_1 100
function yonimc/guxi/energy/drop_randomly

#检测能量状态
scoreboard objectives add guxi:ss_energy dummy
#default 正常或无法识别 0 
scoreboard players set @s guxi:ss_energy 0
#能量堆耗尽 100
execute if score @s guxi:energy matches ..0 run scoreboard players set @s guxi:ss_energy 100
#能量池耗尽 50
execute if score @s guxi:energy_pool matches ..0 run scoreboard players set @s guxi:ss_energy 50
#能量池满溢 75
execute if score @s guxi:energy_pool > @s guxi:energy_stpo run scoreboard players set @s guxi:ss_energy 75
#能量池和堆满溢 57
execute if score @s guxi:energy_pool >= @s guxi:energy_stpo if score @s guxi:energy >= @s guxi:energy_st run scoreboard players set @s guxi:ss_energy 57

#对能量堆状态作出响应
execute if score @s guxi:ss_energy matches 75 run scoreboard players set @s var_0 -8282
execute if score @s var_0 matches -8282 run scoreboard players add @s guxi:exp_tr 1


#能量池状态
scoreboard objectives add guxi:sp_energy dummy
scoreboard players set @s guxi:sp_energy 10000

#能量池过默认3%
scoreboard players operation @s var_0 = default_energy_pool_volume guxi:values
scoreboard players set @s var_1 3
scoreboard players operation @s var_0 *= @s var_1
scoreboard players set @s var_1 100
scoreboard players operation @s var_0 /= @s var_1
execute if score @s guxi:energy_pool >= @s var_0 run scoreboard players set @s guxi:sp_energy 10003

#能量池过30%
scoreboard players operation @s var_0 = @s guxi:energy_stpo
scoreboard players set @s var_1 30
scoreboard players operation @s var_0 *= @s var_1
scoreboard players set @s var_1 100
scoreboard players operation @s var_0 /= @s var_1
execute if score @s guxi:energy_pool >= @s var_0 run scoreboard players set @s guxi:sp_energy 10030

#能量池过77%
scoreboard players operation @s var_0 = @s guxi:energy_stpo
scoreboard players set @s var_1 77
scoreboard players operation @s var_0 *= @s var_1
scoreboard players set @s var_1 100
scoreboard players operation @s var_0 /= @s var_1
execute if score @s guxi:energy_pool >= @s var_0 run scoreboard players set @s guxi:sp_energy 10077

#对于能量池状态作出响应
execute if score @s guxi:sp_energy matches ..10003 if score @s guxi:exp_tr > min_exp_transform_count guxi:values run scoreboard players set @s var_0 743
execute if score @s var_0 matches 743 run function yonimc/guxi/energy/exp_transform_low_energy

execute if score @s guxi:sp_energy matches ..10076 if score @s guxi:exp_tr > default_exp_transform_count guxi:values run scoreboard players set @s var_0 14487
execute if score @s var_0 matches 14487 run scoreboard players remove @s guxi:exp_tr 1

execute if score @s guxi:ss_energy matches 50 run kill @s
execute if score @s guxi:ss_energy matches 50 run tellraw @a {"rawtext":[{"translate":"%%s 消散了", "with":{"rawtext":[{"selector":"@s"}]}}]}

scoreboard objectives add guxi:like_player dummy
scoreboard players add @s guxi:like_player 0
execute if entity @s[scores={guxi:sp_energy=..10076,guxi:like_player=0}] run scoreboard players set @s var_0 -6437
execute if score @s var_0 matches -6437 run event entity @s guxi:like_player
execute if score @s var_0 matches -6437 run tell @s like player
execute if score @s var_0 matches -6437 run scoreboard players set @s guxi:like_player 1

execute if entity @s[scores={guxi:sp_energy=10077..,guxi:like_player=!0}] run scoreboard players set @s var_0 -755
execute if score @s var_0 matches -755 run event entity @s guxi:not_like_player
execute if score @s var_0 matches -755 run tell @s not player
execute if score @s var_0 matches -755 run scoreboard players set @s guxi:like_player 0
