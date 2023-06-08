
function yonimc/mind/operation/rotate_y_offset
scoreboard players set @s var_0 0
execute if score @s md:ry_ost matches 35.. run scoreboard players set @s var_0 1
execute if score @s md:ry_ost matches ..-35 run scoreboard players set @s var_0 -1
execute unless score @s var_0 matches 0 run scoreboard players operation @s md:base_menu_v0 += @s var_0
execute unless score @s var_0 matches 0 run function yonimc/mind/operation/rotate_y_offset_init

# 限制范围
execute if score @s md:base_menu_v0 matches ..-1 run scoreboard players set @s md:base_menu_v0 7
execute if score @s md:base_menu_v0 matches 8.. run scoreboard players set @s md:base_menu_v0 0

# titleraw @s actionbar {"rawtext": [{"score": {"objective": "md:base_menu_v0", "name": "@s" }}]}

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
execute if score @s ret_0 matches 0 run scoreboard players set @s var_0 1
execute if score @s ret_0 matches 2 run scoreboard players set @s var_0 2
execute if score @s ret_0 matches 3 run scoreboard players set @s var_0 3
execute if score @s ret_0 matches 4 run scoreboard players set @s var_0 2
execute if score @s ret_0 matches 1 run scoreboard players set @s var_0 -301

execute if score @s var_0 matches 2 run function yonimc/mind/guxi/goto/1_menu
#tellraw @s {"rawtext": [{"score": {"objective": "var_0", "name": "@s" }}]}
#tellraw @s {"rawtext": [{"score": {"objective": "ret_0", "name": "@s" }}]}


# var_0 matches -301 run tellraw @s {"rawtext": [{"text": "操作未定义"}]}

execute if score @s md:base_menu_v0 matches 0 run titleraw @s actionbar {"rawtext": [{"translate":"§7%%s§f|%%s\n§r","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}, {"text":"§§#none"},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={md:timer_076=1..}]"},{"translate":"\n>>#t: %%s","with":{"rawtext":[{"score":{"objective":"md:timer_076","name":"@s"}}]}}]}}]}
execute if score @s md:base_menu_v0 matches 0 if score @s var_0 matches -301 run function yonimc/mind/guxi/goto/1_menu

execute if score @s md:base_menu_v0 matches 1 run titleraw @s actionbar {"rawtext": [{"translate":"§7%%s§f|%%s\n§r","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}, {"translate": "§§#elytra: %%2", "with": {"rawtext": [{"selector": "@s[scores={guxi:cre_ely=2}]"},{"text": "#+"},{"text": "#_"}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={md:timer_076=1..}]"},{"translate":"\n>>#t: %%s","with":{"rawtext":[{"score":{"objective":"md:timer_076","name":"@s"}}]}}]}}]}
execute if score @s md:base_menu_v0 matches 1 if score @s var_0 matches -301 run function yonimc/mind/guxi/goto/101_elytra

execute if score @s md:base_menu_v0 matches 2 run titleraw @s actionbar {"rawtext": [{"translate":"§7%%s§f|%%s\n§r","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}, {"translate":"§§#mining: %%s", "with": {"rawtext": [{"score": {"objective":"guxi:ef_mining","name": "@s"}}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={md:timer_076=1..}]"},{"translate":"\n>>#t: %%s","with":{"rawtext":[{"score":{"objective":"md:timer_076","name":"@s"}}]}}]}}]}
execute if score @s md:base_menu_v0 matches 2 if score @s var_0 matches -301 run function yonimc/mind/guxi/goto/102_mining

execute if score @s md:base_menu_v0 matches 3 run titleraw @s actionbar {"rawtext": [{"translate":"§7%%s§f|%%s\n§r","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}, {"translate":"§§#damage: %%s", "with": {"rawtext": [{"score": {"objective":"guxi:ef_damage","name": "@s"}}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={md:timer_076=1..}]"},{"translate":"\n>>#t: %%s","with":{"rawtext":[{"score":{"objective":"md:timer_076","name":"@s"}}]}}]}}]}
execute if score @s md:base_menu_v0 matches 3 if score @s var_0 matches -301 run function yonimc/mind/guxi/goto/103_damage

execute if score @s md:base_menu_v0 matches 4 run titleraw @s actionbar {"rawtext": [{"translate":"§7%%s§f|%%s\n§r","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}, {"translate":"§§#res: %%s", "with": {"rawtext": [{"score": {"objective":"guxi:ef_res","name": "@s"}}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={md:timer_076=1..}]"},{"translate":"\n>>#t: %%s","with":{"rawtext":[{"score":{"objective":"md:timer_076","name":"@s"}}]}}]}}]}
execute if score @s md:base_menu_v0 matches 4 if score @s var_0 matches -301 run function yonimc/mind/guxi/goto/104_res

execute if score @s md:base_menu_v0 matches 5 run titleraw @s actionbar {"rawtext": [{"translate":"§7%%s§f|%%s\n§r","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}, {"translate": "§§#res*/: %%2", "with": {"rawtext": [{"selector": "@s[scores={guxi:keep_res=!0}]"},{"text": "#!"},{"text": "#_"}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={md:timer_076=1..}]"},{"translate":"\n>>#t: %%s","with":{"rawtext":[{"score":{"objective":"md:timer_076","name":"@s"}}]}}]}}]}
execute if score @s md:base_menu_v0 matches 5 if score @s var_0 matches -301 run function yonimc/mind/guxi/goto/105_keep_res

execute if score @s md:base_menu_v0 matches 6 run titleraw @s actionbar {"rawtext": [{"translate":"§7%%s§f|%%s\n§r","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}, {"translate": "§§#/eff: %%2", "with": {"rawtext": [{"selector": "@s[scores={guxi:keep_ef=!0}]"},{"text": "#!"},{"text": "#_"}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={md:timer_076=1..}]"},{"translate":"\n>>#t: %%s","with":{"rawtext":[{"score":{"objective":"md:timer_076","name":"@s"}}]}}]}}]}
execute if score @s md:base_menu_v0 matches 6 if score @s var_0 matches -301 run function yonimc/mind/guxi/goto/106_keep_ef

execute if score @s md:base_menu_v0 matches 7 run titleraw @s actionbar {"rawtext": [{"translate":"§7%%s§f|%%s\n§r","with":{"rawtext":[{"score":{"objective":"guxi:energy","name":"@s"}},{"score":{"objective":"guxi:energy_pool","name":"@s"}}]}}, {"translate": "§§#.auto: %%2", "with": {"rawtext": [{"selector": "@s[scores={guxi:auto_energy=!0}]"},{"text": "#!"},{"text": "#_"}]}},{"translate":"§r%%2§r","with":{"rawtext":[{"selector":"@s[scores={md:timer_076=1..}]"},{"translate":"\n>>#t: %%s","with":{"rawtext":[{"score":{"objective":"md:timer_076","name":"@s"}}]}}]}}]}
execute if score @s md:base_menu_v0 matches 7 if score @s var_0 matches -301 run function yonimc/mind/guxi/goto/107_auto_energy
