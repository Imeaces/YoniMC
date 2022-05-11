#guxi/mind/guxi

# 初始化
scoreboard objectives add mind:v100 dummy
scoreboard players add @s mind:v100 0

# 跳转到guxi面板26950
execute @s[scores={mind:v100=0}] ~ ~ ~ function guxi/mind/goto/guxi_0

# 根据面板标识显示对应面板
execute @s[scores={mind:v100=26950}] ~ ~ ~ function guxi/mind/guxi_0
execute @s[scores={mind:v100=26951}] ~ ~ ~ function guxi/mind/guxi_1
execute @s[scores={mind:v100=269515}] ~ ~ ~ function guxi/mind/guxi_15
