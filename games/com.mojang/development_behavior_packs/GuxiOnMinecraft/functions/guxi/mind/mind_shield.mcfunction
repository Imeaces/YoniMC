#function entity/position/init
#function entity/position/getRotateX


scoreboard players set @s[rxm=-88,rx=-49] guxi:resistance 0
scoreboard players set @s[rxm=-48,rx=-10,scores={guxi:status=..3}] guxi:resistance 1
scoreboard players set @s[rxm=-9,rx=30,scores={guxi:status=..3}] guxi:resistance 2
scoreboard players set @s[rxm=31,rx=60,scores={guxi:status=..3}] guxi:resistance 3
scoreboard players set @s[rxm=61,rx=85,scores={guxi:status=..3}] guxi:resistance 4

title @s times 0 5 0
title @s title §r
titleraw @s subtitle {"rawtext":[{"score":{"objective":"guxi:resistance","name":"@s"}}]}
