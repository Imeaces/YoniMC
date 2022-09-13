scoreboard players set @s var_0 0

#var
scoreboard objectives add yoni:guxi dummy "咕西"
scoreboard players add @s yoni:guxi 0

scoreboard objectives add yoni:guxi_1 dummy
scoreboard players set @s yoni:guxi_1 0

#: if 0 do spawn
execute if score @s yoni:guxi matches 0 run function yonimc/guxi/spawn
execute if score @s yoni:guxi matches 0 run scoreboard players set @s yoni:guxi 1

#: if 1 do alive
execute if entity @s[scores={yoni:guxi=1,alive=1}] run scoreboard players set @s yoni:guxi_1 211
execute if score @s yoni:guxi_1 matches 211 run function yonimc/guxi/while_alive

#:if dead and 1 do on_dead
execute if entity @s[scores={yoni:guxi=1,alive=-1}] run scoreboard players set @s yoni:guxi_1 -2
execute if score @s yoni:guxi_1 matches -2 run function yonimc/guxi/when_dead
execute if score @s yoni:guxi_1 matches -2 run scoreboard players set @s yoni:guxi -20

#: if respawn do respawn
execute if entity @s[scores={yoni:guxi=-20,alive=1}] run scoreboard players set @s yoni:guxi_1 72
execute if score @s yoni:guxi_1 matches 72 run function yonimc/species/guxi/respawn
execute if score @s yoni:guxi_1 matches 72 run scoreboard players set @s yoni:guxi 0

#: -1 no need to deal
execute if score @s alive matches -1 if score @s yoni:guxi matches 0 run scoreboard players set @s yoni:guxi_1 -1
execute if score @s alive matches -1 if score @s yoni:guxi matches -20 run scoreboard players set @s yoni:guxi_1 -1

#: if unexpected kill and reset
execute if score @s yoni:guxi_1 matches 0 run tell @s 意料之外的情况
execute if score @s yoni:guxi_1 matches 0 run tellraw @s {"rawtext":[{"score":{"objective":"yoni:guxi", "name":"@s"}}]}
execute if score @s yoni:guxi_1 matches 0 run tellraw @s {"rawtext":[{"score":{"objective":"alive", "name":"@s"}}]}
execute if score @s yoni:guxi_1 matches 0 run tellraw @s {"rawtext":[{"score":{"objective":"yoni:guxi_1", "name":"@s"}}]}
execute if score @s yoni:guxi_1 matches 0 run kill @s
execute if score @s yoni:guxi_1 matches 0 run kill @s
