scoreboard objectives add prom dummy
scoreboard players add @s prom 0
execute @s[scores={prom=0}] ~ ~ ~ function prom/init
