scoreboard objectives add a dummy
scoreboard objectives add b dummy
scoreboard objectives add c dummy
scoreboard objectives add d dummy

scoreboard players add @s a 0

function yoni/status/rotate_y
scoreboard players operation @s b = @s rotate_y

scoreboard players operation @s c = @s b
scoreboard players operation @s c -= @s a

scoreboard players set "-1" d -1
scoreboard players operation @s d = @s c
scoreboard players operation @s d -= @s a
execute @s[scores={d=..-1}] ~ ~ ~ scoreboard players operation @s d *= "-1" d

execute @s[scores={d=180..}] ~ ~ ~ execute @s[scores={a=1..}] ~ ~ ~ scoreboard players add @s c 360
execute @s[scores={d=180..}] ~ ~ ~ execute @s[scores={a=..-1}] ~ ~ ~ scoreboard players add @s c -360

titleraw @s actionbar {"rawtext":[{"translate":"当前%%1\n原值%%2\n偏移%%3","with":{"rawtext":[{"score":{"objective":"rotate_y","name":"*"}},{"score":{"objective":"a","name":"*"}},{"score":{"objective":"c","name":"*"}}]}}]}
