#init
function yoni/init/af48495f

#set score
execute @s[scores={alive=1}] ~ ~ ~ scoreboard players set @s alive 2
execute @s[scores={alive=2}] ~ ~ ~ scoreboard players add @s death_count 1

#set tag
execute @s[tag=!status:dead] ~ ~ ~ tag @s add status:dead
execute @s[tag=status:alive] ~ ~ ~ tag @s remove status:alive
