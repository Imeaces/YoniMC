#yoni/species/spawn
scoreboard objectives add yoni:species dummy

scoreboard objectives add yoni:var00001 dummy
scoreboard players random @s yoni:var00001 0 0

execute @s[scores={yoni:var00001=0}] ~ ~ ~ function yoni/species/guxi/spawn
