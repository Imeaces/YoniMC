
# 物品亮度表
# 正常 水中 物品 物品值
# 14 14 end_rod 208
# 14 0 torch 1
# 15 15 glowstone 89
# 15 15 beacon 138
# 15 9 lit_pumpkin 91
# 3 0 magma 213
# 5 5 amethyst_shard 771
# 7 5 enchanting_table 116
# 15 0 lantern -208
# 10 10 soul_lantern -269
# 15 13 shroomlight -230
# 15 15 conduit -157
# 15 15 sealantern 169
# 15 0 lava_bucket 325
# 7 7 redstone_torch 76
# 10 7 crying_obsidian -289
scoreboard objectives add plight dummy
scoreboard objectives add plight:flag0 dummy
scoreboard objectives add plight:flag1 dummy
scoreboard objectives add plight:flag2 dummy


# 当 物品 切换
#   更新 plight
execute @s ~ ~ ~ function yoni/pocket_light/select
execute @s ~ ~ ~ detect ~ ~1 ~ water -1 function yoni/pocket_light/select

# 当 plight 更新
scoreboard players operation @s plight:flag0 -= @s plight
execute @s[scores={plight:diff=!0}] ~ ~ ~ function yoni/pocket_light/update
scoreboard players operation @s plight:flag0 = @s plight
