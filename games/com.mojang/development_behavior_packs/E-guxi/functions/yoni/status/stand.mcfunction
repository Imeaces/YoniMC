#yoni/status/stand

#init
function yoni/init/2d604a27

#set score
scoreboard players set @s jump 0

#set tag
execute @s[tag=status:jump] ~ ~ ~ tag @s remove status:jump
execute @s[tag=!status:stand] ~ ~ ~ tag @s add status:stand
