#yoni/init/af48495f

# create objectives
scoreboard objectives add alive dummy
scoreboard objectives add death_count dummy

#set default
scoreboard players add @s death_count 0
scoreboard players add @s alive 0
scoreboard players set @s[scores={alive=0}] alive 1
