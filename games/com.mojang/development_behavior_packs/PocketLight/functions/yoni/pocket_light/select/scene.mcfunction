scoreboard players set @s plight:scene 1

execute @s[scores={in_water_or_rain=1}] ~ ~ ~ scoreboard players set @s plight:scene 2


# 检测情景
# execute @s ~ ~ ~ detect ~ ~1 ~ air 0 scoreboard players set @s plight:scene 1
# execute @s ~ ~ ~ detect ~ ~1 ~ water -1 scoreboard players set @s plight:scene 2
# execute @s ~ ~ ~ detect ~ ~1 ~ flowing_water -1 scoreboard players set @s plight:scene 2
