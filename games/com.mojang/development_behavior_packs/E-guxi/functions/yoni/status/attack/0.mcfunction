#yoni/status/attack/0


#init
function yoni/init/status_attack

#set score
scoreboard players set @s attack 0

#set tag
execute @s[tag=status:attack] ~ ~ ~ tag @s remove status:attack
execute @s[tag=!status:silent] ~ ~ ~ tag @s add status:silent
