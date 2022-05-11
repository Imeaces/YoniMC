#guxi/mind/guxi

# 初始化
scoreboard objectives add mind:v100 dummy
scoreboard players add @s mind:v100 0

# 跳转到guxi面板26950
execute @s[scores={mind:v100=0}] ~ ~ ~ function yoni/guxi/mind/goto/goto_1

# 根据面板标识显示对应面板
execute @s[scores={mind:v100=1}] ~ ~ ~ function yoni/guxi/mind/th_1
execute @s[scores={mind:v100=100}] ~ ~ ~ function yoni/guxi/mind/th_100
execute @s[scores={mind:v100=100400}] ~ ~ ~ function yoni/guxi/mind/th_100400

execute @s[scores={mind:v105100=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"%%s§f%%s%%s%%s","with":{"rawtext":[{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:energies=..10}]"},{"text":"§l"}]}},{"score":{"objective":"guxi:energies","name":"@s"}},{"translate":"§r%%2","with":{"rawtext":[{"selector":"@s[scores={mind:v105=1}]"},{"translate":"§o§7|§r%%s%%s","with":{"rawtext":[{"translate":"%%2","with":{"rawtext":[{"selector":"@s[scores={guxi:energies=..10}]"},{"text":"§f"},{"text":"§7"}]}},{"score":{"objective":"guxi:energy","name":"@s"}}]}}]}}]}}]}
