#yoni/mind/guxi

# 初始化
scoreboard objectives add mind dummy
scoreboard players add @s mind 0

# 跳转到guxi面板26950
execute @s[scores={mind=0}] ~ ~ ~ function yoni/mind/goto/guxi_0

# 根据面板标识显示对应面板
execute @s[scores={mind=26950}] ~ ~ ~ function yoni/mind/guxi_0
execute @s[scores={mind=26951}] ~ ~ ~ function yoni/mind/guxi_1
execute @s[scores={mind=269515}] ~ ~ ~ function yoni/mind/guxi_15
