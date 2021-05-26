#yoni/status/alive

#init
function yoni/init/af48495f

#set score
execute @s[scores={alive=2}] ~ ~ ~ scoreboard players set @s alive 1

#set tag
execute @s[tag=status:dead] ~ ~ ~ tag @s remove status:dead
execute @s[tag=!status:alive] ~ ~ ~ tag @s add status:alive
