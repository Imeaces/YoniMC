#yoni/status/alive/2

#init
function yoni/init/status_dead

scoreboard players add @s death_count 1

#set tag
execute @s[tag=status:alive] ~ ~ ~ tag @s remove status:alive
