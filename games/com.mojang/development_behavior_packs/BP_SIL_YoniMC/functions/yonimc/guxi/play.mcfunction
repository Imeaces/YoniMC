scoreboard players set @s var_0 0

#var
scoreboard objectives add yoni:guxi dummy "咕西"
scoreboard players add @s yoni:guxi 0

#: yoni:guxi_1 负责传递状态
scoreboard objectives add yoni:guxi_1 dummy
scoreboard players set @s yoni:guxi_1 0

#: if 0 do spawn
execute if score @s yoni:guxi matches 0 run function yonimc/guxi/spawn
execute if score @s yoni:guxi matches 0 run scoreboard players set @s yoni:guxi 1

#: if 1 do alive
execute if score @s yoni:guxi matches 1 if entity @s[tag=flag:status.is_alive] run scoreboard players set @s yoni:guxi_1 211
execute if score @s yoni:guxi_1 matches 211 run function yonimc/guxi/while_alive

#:if dead and 1 do on_dead
execute if score @s yoni:guxi matches 1 if entity @s[tag=flag:status.not_alive] run scoreboard players set @s yoni:guxi_1 -2
execute if score @s yoni:guxi_1 matches -2 run function yonimc/guxi/when_dead
execute if score @s yoni:guxi_1 matches -2 run scoreboard players set @s yoni:guxi -20

#: if respawn do respawn
execute if score @s yoni:guxi matches -20 if entity @s[tag=flag:status.is_alive] run scoreboard players set @s yoni:guxi_1 72
execute if score @s yoni:guxi_1 matches 72 run function yonimc/species/guxi/respawn
execute if score @s yoni:guxi_1 matches 72 run scoreboard players set @s yoni:guxi 0

execute if score @s yoni:guxi matches -21 run damage @s 10000 none
execute if score @s yoni:guxi matches -21 run tellraw @a {"rawtext":[{"translate":"%%s 消散了", "with":{"rawtext":[{"selector":"@s"}]}}]}

execute if score @s yoni:guxi matches -21 run scoreboard players set @s yoni:guxi 0
execute if score @s yoni:guxi matches -21 run scoreboard players set @s yoni:guxi_1 -1

#: -1 no need to deal
execute if score @s yoni:guxi matches 0 if entity @s[tag=flag:status.not_alive] run scoreboard players set @s yoni:guxi_1 -1
execute if entity @s[tag=flag:status.not_alive] if score @s yoni:guxi matches -20 run scoreboard players set @s yoni:guxi_1 -1

#: if unexpected kill and reset
execute if score @s yoni:guxi_1 matches 0 run tellraw @s { "rawtext": [{ "translate": "意料之外的情况: \nyoni:guxi: %s\nyoni:guxi_1: %s","with": {"rawtext": [{"score": {"objective": "yoni:guxi","name": "@s"}},{"score": {"objective": "yoni:guxi_1","name": "@s"}}]}}]}
execute if score @s yoni:guxi_1 matches 0 if entity @s[tag=flag:status.is_alive] run tellraw @s {"rawtext": [{"text":"flag:status.is_alive"}]}
execute if score @s yoni:guxi_1 matches 0 if entity @s[tag=flag:status.not_alive] run tellraw @s {"rawtext": [{"text":"flag:status.not_alive"}]}
