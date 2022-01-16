
#say # 检查光位置
tp @s ~ ~ ~ 0 0 false
tp @s ~ ~-10000 ~ 10 0 true
execute @s[rym=10] ~ ~ ~ scoreboard players set @s plight:flag0 1

execute @s[scores={plight:flag0=1}] ~ ~ ~ tp @s ~ ~10000 ~ 0 0 false

execute @s[scores={plight:flag0=1}] ~ ~ ~ detect ~ ~-10000 ~ light_block -1 scoreboard players set @s plight:flag0 -1

#tellraw @a {"rawtext":[{"score":{"objective":"plight:flag0","name":"@s"}}]}

