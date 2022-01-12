scoreboard objectives add spec:random dummy
scoreboard players random @s spec:random 0 1

execute @s[scores={spec:random=!2695}] ~ ~ ~ scoreboard players set @s species 2695
