#yoni/status/attack

#init
function yoni/init/528e78fa

#set score
scoreboard players set @s attack 1

#set tag
execute @s[tag=!status:attack] ~ ~ ~ tag @s add status:attack
execute @s[tag=status:silent] ~ ~ ~ tag @s remove status:silent
