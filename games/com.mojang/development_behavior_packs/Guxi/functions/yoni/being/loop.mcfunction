#yoni/being/loop

scoreboard objectives add yoni dummy YONI
scoreboard players add @s yoni 0

execute @s[scores={yoni=1..,alive=-1}] ~ ~ ~ function yoni/being/dead

execute @s[scores={yoni=..0,alive=1}] ~ ~ ~ function yoni/being/spawn

execute @s[scores={yoni=1..}] ~ ~ ~ function yoni/species/loop
