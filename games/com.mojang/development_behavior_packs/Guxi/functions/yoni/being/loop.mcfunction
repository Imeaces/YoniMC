#yoni/being/loop

# initial scoreboard
scoreboard objectives add yoni dummy YONI
scoreboard players add @s yoni 0

# if spawn
execute @s[scores={yoni=0,alive=1}] ~ ~ ~ function yoni/being/spawn

# if dead
execute @s[scores={yoni=1,alive=-1}] ~ ~ ~ function yoni/being/dead

# (player) respawn
execute @s[scores={yoni=-1,alive=1}] ~ ~ ~ scoreboard players set @s yoni 0

# mainly
execute @s[scores={yoni=1..}] ~ ~ ~ function yoni/being/mainly
