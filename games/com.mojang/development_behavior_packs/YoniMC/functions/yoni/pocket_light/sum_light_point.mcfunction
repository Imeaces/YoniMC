summon minecraft:armor_stand ~ ~10000 ~
execute @s ~ ~10000 ~ tag @e[type=minecraft:armor_stand,c=1] add lightPoint
tag @s add hasBeenSumLight
