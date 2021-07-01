#yoni/status/t

scoreboard objectives add a dummy
scoreboard objectives add b dummy
scoreboard objectives add c dummy

scoreboard players add @s a 0

function yoni/status/rotate_y
scoreboard players operation @s b = @s rotate_y

scoreboard players operation @s c = @s b
scoreboard players operation @s c -= @s a

execute @s[scores={c=180..}] ~ ~ ~ scoreboard players add @s c -360
execute @s[scores={c=..-180}] ~ ~ ~ scoreboard players add @s c 360

titleraw @s actionbar {"rawtext":[{"translate":"当前%%1\n原值%%2\n偏移%%3","with":{"rawtext":[{"score":{"objective":"rotate_y","name":"*"}},{"score":{"objective":"a","name":"*"}},{"score":{"objective":"c","name":"*"}}]}}]}
