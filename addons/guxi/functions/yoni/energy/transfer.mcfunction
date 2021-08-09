scoreboard objectives add var dummy

execute @s[scores={energy=..0}] ~ ~ ~ function yoni/energy/drop

scoreboard players operation @s var = @s energy
scoreboard players operation @s var -= @s energyvol
execute @s[scores={var=1..}] ~ ~ ~ function yoni/energy/raise
