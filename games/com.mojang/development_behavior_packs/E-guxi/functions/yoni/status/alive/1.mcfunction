#yoni/status/alive/1

#init
function yoni/init/status_alive

#set score
scoreboard players set @s alive 1

#set tag
execute @s[tag=status:dead] ~ ~ ~ tag @s remove status:dead
execute @s[tag=!status:alive] ~ ~ ~ tag @s add status:alive
