#yoni/status/silent

#init
function yoni/init/528e78fa

#set score
scoreboard players set @s attack 0

#set tag
execute @s[tag=status:attack] ~ ~ ~ tag @s remove status:attack
execute @s[tag=!status:silent] ~ ~ ~ tag @s add status:silent
