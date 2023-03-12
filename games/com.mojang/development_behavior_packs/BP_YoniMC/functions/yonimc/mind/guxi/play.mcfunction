scoreboard objectives add mind dummy
scoreboard players add @s mind 0
execute if score @s mind matches 0 run function yonimc/mind/guxi/goto/1_menu

execute if score @s mind matches 1 run function yonimc/mind/guxi/1_menu
execute if score @s mind matches 10 run function yonimc/mind/guxi/10_base_menu

execute if score @s mind matches 101 run function yonimc/mind/guxi/100/101_elytra
execute if score @s mind matches 102 run function yonimc/mind/guxi/100/102_mining
execute if score @s mind matches 103 run function yonimc/mind/guxi/100/103_damage
execute if score @s mind matches 104 run function yonimc/mind/guxi/100/104_res
execute if score @s mind matches 105 run function yonimc/mind/guxi/100/105_keep_res
execute if score @s mind matches 106 run function yonimc/mind/guxi/100/106_keep_ef
