#yoni/species/spawn_random

# 建个记分项，然后赋值
scoreboard objectives add spec:random dummy
scoreboard players random @s spec:random 0 1000

execute @s[scores={species=0,spec:random=1000}] ~ ~ ~ scoreboard players set @s species 2695

execute @s[scores={species=0}] ~ ~ ~ scoreboard players set @s species 42
