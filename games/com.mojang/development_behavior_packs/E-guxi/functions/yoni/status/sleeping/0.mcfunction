#yoni/status/awake

#init
function yoni/init/status_sleeping

#set score
scoreboard players set @s sleeping 0

#change tag
execute @s[tag=status:sleeping] ~ ~ ~ tag @s remove status:sleeping
execute @s[tag=!status:awake] ~ ~ ~ tag @s add status:awake
