scoreboard objectives add species dummy "物种"
scoreboard players add @s species 0
scoreboard objectives add spec:arg1 dummy

execute @s[scores={alive=1,species=0}] ~ ~ ~ function yoni/species/spawn
