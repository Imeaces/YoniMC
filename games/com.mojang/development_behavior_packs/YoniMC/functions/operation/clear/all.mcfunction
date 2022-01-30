
# for non-player entity
execute @s[type=!minecraft:player] ~ ~ ~ function operation/entity

# for player
execute @s[type=minecraft:player] ~ ~ ~ function operation/player
execute @s[type=minecraft:player] ~ ~ ~ clear @s
