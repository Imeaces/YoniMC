scoreboard objectives add §eid dummy
scoreboard objectives add counter dummy
scoreboard players add @s §eid 0
execute if score @s §eid matches 0 run scoreboard players add §§eid counter 1
execute if score @s §eid matches 0 run scoreboard players operation @s §eid = §§eid counter
