#yoni/status/sleeping

#init
function yoni/init/ae765c08

#set score
scoreboard players set @s sleeping 1

#change tag
execute @s[tag=!status:sleeping] ~ ~ ~ tag @s add status:sleeping
execute @s[tag=status:awake] ~ ~ ~ tag @s remove status:awake
