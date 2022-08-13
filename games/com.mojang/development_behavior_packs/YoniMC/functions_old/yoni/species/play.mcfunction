#yoni/species/play

# species主函数
# add objective "species"
# objective "species" init @s

## if @s isAlive
# timer(20tick) => @s execFunction species.spawn






scoreboard objectives add species dummy
scoreboard players add @s species 0
scoreboard players add @s[scores={alive=1,species=..0}] species -1

execute if entity @s[scores={alive=1,species=..-20}] run function yoni/species/spawn
