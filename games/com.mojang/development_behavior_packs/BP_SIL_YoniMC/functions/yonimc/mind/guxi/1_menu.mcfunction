scoreboard objectives add mind dummy
scoreboard players add @s mind 0
scoreboard players set @s var_0 0
scoreboard players set @s arg_1 3
function yonimc/mind/operation/enter_timer_076_cycle

#: ret_0 = 0
# 等待用户开始操作

#: ret_0 = 1
# 操作已确认

#: ret_0 = 2
# 操作已取消

#: ret_0 = 3
# 等待操作结束

#: ret_0 = 4
# 操作超时

#: md:timer_076 剩余的时间

execute if score @s ret_0 matches 0 run scoreboard players set @s var_0 1
execute if score @s ret_0 matches 1 run scoreboard players set @s var_0 -301
execute if score @s ret_0 matches 2 run scoreboard players set @s var_0 1
execute if score @s ret_0 matches 3 run scoreboard players set @s var_0 3
execute if score @s ret_0 matches 4 run scoreboard players set @s var_0 1

execute if score @s var_0 matches 3 run titleraw @s actionbar {"rawtext":[{"translate":"%%s§f%%s%%s%%s","with":{"rawtext":[{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:pp_energy=..30}]"},{"text":"§l"}]}},{"score":{"objective":"guxi:energy_pool","name":"@s"}},{"translate":"§o§7|§r%%s%%s","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:pp_energy=..30}]"},{"text":"§f"},{"text":"§7"}]}},{"score":{"objective":"guxi:energy","name":"@s"}}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={md:timer_076=1..}]"},{"translate":"\n>>抬头进入","with":{"rawtext":[{"score":{"objective":"md:timer_076","name":"@s"}}]}}]}}]}}]}
execute if score @s var_0 matches 1 run titleraw @s actionbar {"rawtext":[{"translate":"§7%%s§f|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}},    {"text": "\n§r§7§o"},    {"translate":"##%%s%%s@%%s%%s##","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={md:0_va_e=1..}]"},{"text":"+"},{"text":"§§"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={md:0_lst_e=!0}]"},{"score":{"objective":"md:0_va_e","name":"@s"}},{"text":"§§"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={md:0_va_el=1..}]"},{"text":"+"},{"text":"§§"}]}},{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={md:0_lst_el=!0}]"},{"score":{"objective":"md:0_va_el","name":"@s"}},{"text":"§§"}]}}]}} ]}


execute if score @s var_0 matches -301 run function yonimc/mind/guxi/goto/10_base_menu
