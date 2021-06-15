#yoni/status/attack/1


#init
function yoni/init/status_attack

#set score
scoreboard players set @s attack 1

#set tag
execute @s[tag=!status:attack] ~ ~ ~ tag @s add status:attack
execute @s[tag=status:silent] ~ ~ ~ tag @s remove status:silent
