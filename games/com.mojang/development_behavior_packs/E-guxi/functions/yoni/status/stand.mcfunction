#yoni/status/stand

#init
function yoni/init/af48495f

#set score
execute @s[scores={jump=1}] ~ ~ ~ scoreboard players set @s jump 0

#set tag
execute @s[tag=status:jump] ~ ~ ~ tag @s remove status:jump
execute @s[tag=!status:stand] ~ ~ ~ tag @s add status:stand
