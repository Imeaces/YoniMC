
#: get exp level
function status/player/exp

scoreboard objectives add var_0 dummy
scoreboard players set @s var_0 0

scoreboard objectives add var_1 dummy
scoreboard players set @s var_1 0

#一次转换的经验等级（太大会超函数限制，建议不超过150？（不是，这东西是给谁看的？）
scoreboard objectives add var_2 dummy
scoreboard players set @s var_2 24

#: 用于转换负数
scoreboard objectives add var_3 dummy
scoreboard players set @s var_3 -1

scoreboard objectives add var_4 dummy
scoreboard players set @s var_4 0

#计算与应该保持的经验的差值
scoreboard players operation @s var_1 = @s exp
#:同时确保不超过用经验存储的上限
scoreboard players operation @s var_1 < @s guxi:exp_st
scoreboard players operation @s var_1 -= @s guxi:exp_tr
#根据结果来判断应该运行什么函数，并输出次数
execute if score @s var_1 matches 1.. run scoreboard players set @s var_0 2
execute if score @s var_1 matches ..-1 run scoreboard players set @s var_0 5
execute if score @s var_1 matches ..-1 run scoreboard players operation @s var_1 *= @s var_3

#确保一次转换的经验不会太多
scoreboard players operation @s var_1 < @s var_2

#运行函数
scoreboard objectives add arg_0 dummy 
scoreboard players operation @s arg_0 = @s var_1

#:换成能量
execute if score @s var_0 matches 2 run function yonimc/guxi/energy/transform_from_exp
#: 换成经验(仅当剩余能量大于30%时)
execute if score @s var_0 matches 5 if score @s guxi:pp_energy matches 3000.. run function yonimc/guxi/energy/transform_to_exp

#对于能量池状态作出响应
scoreboard players set @s var_0 0
#sp10003 且 经验可以降低
execute if score @s guxi:sp_energy matches ..10003 if score @s guxi:exp_tr > min_exp_transform_count guxi:values run scoreboard players set @s var_0 743
##sp10003 743降低经验
execute if score @s var_0 matches 743 run scoreboard players operation @s guxi:exp_tr = min_exp_transform_count guxi:values

#pp<7700 能量少了点，试着从经验里拿
#var guxi:auto_energy 1自动管理
execute if score @s guxi:auto_energy matches 1.. if score @s guxi:pp_energy matches ..7699 if score @s guxi:exp_tr > default_exp_transform_count guxi:values run scoreboard players set @s var_0 14487
execute if score @s var_0 matches 14487 run scoreboard players remove @s guxi:exp_tr 1

#pp<7700 总结
#auto_energy 1 3从经验里拿能量
#auto_energy 2 变成玩家吸收经验

stopsound @s random.levelup
