
function yonimc/mind/operation/rotate_y_offset
scoreboard players set @s var_0 0
scoreboard players set @s var_1 15
scoreboard players operation @s var_0 = @s md:ry_ost
scoreboard players operation @s var_0 /= @s var_1
execute unless score @s var_0 matches 0 run scoreboard players operation @s md:mining_v0 += @s var_0
execute unless score @s var_0 matches 0 run function yonimc/mind/operation/rotate_y_offset_init

# 限制范围
execute if score @s md:mining_v0 matches ..-1 run scoreboard players set @s md:mining_v0 0
execute if score @s md:mining_v0 matches 21.. run scoreboard players set @s md:mining_v0 20

# 操作探测
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

scoreboard players set @s var_0 0
execute if score @s ret_0 matches 1 run scoreboard players set @s var_0 100
execute if score @s ret_0 matches 2 run scoreboard players set @s var_0 -100
execute if score @s ret_0 matches 4 run scoreboard players set @s var_0 -100

#tellraw @s {"rawtext": [{"score": {"objective": "var_0", "name": "@s" }}]}
#tellraw @s {"rawtext": [{"score": {"objective": "ret_0", "name": "@s" }}]}


# var_0 matches -301 run tellraw @s {"rawtext": [{"text": "操作未定义"}]}

#显示当前分数
titleraw @s actionbar {"rawtext": [{"translate": "§l#mining: %%s", "with": {"rawtext": [{"score": {"objective": "md:mining_v0", "name": "@s" }}]}}, {"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={md:timer_076=1..}]"},{"translate":"\n>>#t: %%s","with":{"rawtext":[{"score":{"objective":"md:timer_076","name":"@s"}}]}}]}}, {"translate":"\n§r§7%%s§f|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}]}

# 确认设置
execute if score @s var_0 matches 100 run scoreboard players operation @s guxi:ef_mining = @s md:mining_v0

execute if score @s var_0 matches -100..100 unless score @s var_0 matches -99..99 run function yonimc/mind/guxi/goto/10_base_menu
