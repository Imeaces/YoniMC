scoreboard players set @s plight:flag0 1
execute @s ~ ~ ~ detect ~ ~-10000 ~ light_block -1 scoreboard players set @s plight:flag0 -1
#say 检查光位置
#tellraw @a {"rawtext":[{"score":{"objective":"plight:flag0","name":"@s"}}]}
