
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


# 当 物品 切换
#   更新 plight
scoreboard players set @s plight 0
execute @s ~ ~ ~ detect ~ ~1 ~ air 0 function yoni/pocket_light/select
execute @s ~ ~ ~ detect ~ ~1 ~ water -1 function yoni/pocket_light/select_in_water

#   如果 没有 光点
#     创建 光点
scoreboard players set @s plight:flag0 -2
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~-10000 ~ execute @e[r=1,c=1,scores={plight:flag0=-2}] ~ ~ ~ scoreboard players set @s plight:flag0 1
execute @s[scores={plight:flag1=-2,plight=1..}] ~ ~10000 ~ function yoni/pocket_light/create_point


# 当 plight 更新
#scoreboard players operation @s plight:flag0 -= @s plight
#execute @s[scores={plight:flag0=!0}] ~ ~ ~ function yoni/pocket_light/update
#scoreboard players operation @s plight:flag0 = @s plight
