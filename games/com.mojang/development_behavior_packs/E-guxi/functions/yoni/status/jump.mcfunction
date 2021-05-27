#yoni/status/jump

#init
function yoni/init/2d604a27

#set score
scoreboard players set @s jump 1

#set tag
execute @s[tag=!status:jump] ~ ~ ~ tag @s add status:jump
execute @s[tag=status:stand] ~ ~ ~ tag @s remove status:stand
