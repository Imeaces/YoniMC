scoreboard players set @s var_0 0
execute if entity @s[scores={yoni:guxi=1,alive=1}] run scoreboard players set @s var_0 211
execute if score @s var_0 matches 211 run function yonimc/guxi/while_10_schedule
