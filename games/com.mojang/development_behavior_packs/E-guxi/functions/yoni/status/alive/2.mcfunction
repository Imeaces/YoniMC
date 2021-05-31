#yoni/status/alive/2

#init
function yoni/init/status_alive

#set score
scoreboard players set @s alive 2
scoreboard players add @s death_count 1

#set tag
execute @s[tag=!status:dead] ~ ~ ~ tag @s add status:dead
execute @s[tag=status:alive] ~ ~ ~ tag @s remove status:alive
