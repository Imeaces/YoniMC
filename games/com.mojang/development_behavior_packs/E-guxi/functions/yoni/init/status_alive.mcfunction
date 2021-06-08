#yoni/init/status_alive

# create objectives
scoreboard objectives add alive dummy
scoreboard objectives add death_count dummy

# set default
scoreboard players add @s death_count 0
scoreboard players set @s alive 1
