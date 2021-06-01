#yoni/status/sleeping

#init
function yoni/init/status_sleeping

#set score
scoreboard players set @s sleeping 1

#change tag
execute @s[tag=!status:sleeping] ~ ~ ~ tag @s add status:sleeping
execute @s[tag=status:awake] ~ ~ ~ tag @s remove status:awake
