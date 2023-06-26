#operation/clear/all

# for non-player entity
execute as @s[type=!minecraft:player] run function operation/clear/entity

# for player
execute as @s[type=minecraft:player] run function operation/clear/player
execute as @s[type=minecraft:player] run clear @s
