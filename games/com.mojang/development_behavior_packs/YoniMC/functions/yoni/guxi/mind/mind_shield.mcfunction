#function entity/position/init
#function entity/position/getRotateX
execute @s[scores={mind:slot=2}] ~ ~ ~ scoreboard players set @s mind:lock 1
execute @s[scores={mind:slot=!2}] ~ ~ ~ scoreboard players set @s mind:lock 0
execute @s[scores={mind:slot=!2}] ~ ~ ~ scoreboard players operation @s guxi:resistance = @s mind:v200
execute @s[scores={mind:slot=!2}] ~ ~ ~ scoreboard players set @s mind 0

scoreboard objectives add mind:v200 dummy

scoreboard players set @s[rx=-60] mind:v200 0
scoreboard players set @s[rxm=-61,scores={guxi:status=..3}] mind:v200 2

title @s times 0 5 0
title @s title §r
titleraw @s subtitle {"rawtext":[{"score":{"objective":"mind:v200","name":"@s"}}]}
