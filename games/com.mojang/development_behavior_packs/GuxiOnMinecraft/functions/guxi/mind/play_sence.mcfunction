scoreboard players set @s mind:lock 1

scoreboard objectives add mind:v0 dummy
scoreboard players add @s mind:v0 0

execute @s[scores={mind:v0=0}] ~ ~ ~ function operation/rotate_y_offset_init
execute @s[scores={mind:v0=0}] ~ ~ ~ scoreboard players set @s mind:v0 1

execute @s[scores={mind:v0=1}] ~ ~ ~ function operation/rotate_y_offset

execute @s[scores={op:ory1=..-15}] ~ ~ ~ function operation/rotate_y_offset_init
execute @s[scores={op:ory1=..-15}] ~ ~ ~ scoreboard players add @s mind -1

execute @s[scores={op:ory1=15..}] ~ ~ ~ function operation/rotate_y_offset_init
execute @s[scores={op:ory1=15..}] ~ ~ ~ scoreboard players add @s mind 1

execute @s[rxm=-86] ~ ~ ~ scoreboard players set @s mind:lock 0
execute @s[rxm=-86] ~ ~ ~ scoreboard players reset @s mind:v0

title @s times 0 5 0
title @s title §r
titleraw @s subtitle {"rawtext":[{"score":{"objective":"mind","name":"@s"}}]}