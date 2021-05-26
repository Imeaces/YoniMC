#yoni/status/jump

#init
function yoni/init/af48495f

#set score
execute @s[scores={jump=0}] ~ ~ ~ scoreboard players set @s jump 1

#set tag
execute @s[tag=!status:jump] ~ ~ ~ tag @s add status:jump
execute @s[tag=status:stand] ~ ~ ~ tag @s remove status:stand
