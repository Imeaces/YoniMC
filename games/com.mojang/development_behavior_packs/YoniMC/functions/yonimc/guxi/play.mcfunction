scoreboard objectives add var_0 dummy
scoreboard players set @s var_0 0

scoreboard objectives add yoni:guxi dummy "咕西"
scoreboard players add @s yoni:guxi 0

execute if score @s yoni:guxi matches 0 run function yonimc/guxi/spawn
execute if score @s yoni:guxi matches 0 run scoreboard players set @s yoni:guxi 1

execute if entity @s[scores={yoni:guxi=1,alive=1}] run scoreboard players set @s var_0 211
execute if score @s var_0 matches 211 run function yonimc/guxi/while_alive

execute if entity @s[scores={yoni:guxi=1,alive=-1}] run scoreboard players set @s var_0 -2
execute if score @s var_0 matches -2 run function yonimc/guxi/when_dead
execute if score @s var_0 matches -2 run scoreboard players set @s yoni:guxi -20

execute if entity @s[scores={yoni:guxi=-20,alive=1}] run scoreboard players set @s var_0 72
execute if score @s var_0 matches 72 run function yonimc/species/guxi/respawn
execute if score @s var_0 matches 72 run scoreboard players set @s yoni:guxi 0
