#init
function yoni/init/ae765c08

#set score
scoreboard players set @s sleeping 0

#change tag
execute @s[tag=status:sleeping] ~ ~ ~ tag @s remove status:sleeping
execute @s[tag=!status:awake] ~ ~ ~ tag @s add status:awake
