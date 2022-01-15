scoreboard objectives add plight:scene dummy
scoreboard players set @s plight:scene 0

# 检测情景
execute @s ~ ~ ~ detect ~ ~1 ~ air 0 scoreboard players set @s plight:scene 1
execute @s ~ ~ ~ detect ~ ~1 ~ water -1 scoreboard players set @s plight:scene 2

# 重置光
scoreboard players set @s plight 0

# 根据情景设置光
execute @s[scores={plight:scene=1}] ~ ~ ~ function yoni/pocket_light/select/scene1
execute @s[scores={plight:scene=2}] ~ ~ ~ function yoni/pocket_light/select/scene2

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
