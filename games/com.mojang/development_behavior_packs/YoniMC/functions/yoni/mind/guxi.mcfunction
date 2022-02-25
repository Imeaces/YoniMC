#yoni/guxi/mind/conscious
# 初始化
scoreboard objectives add mind dummy
scoreboard players add @s mind 0

# 跳转到guxi面板26950
execute @s[scores={mind=0}] ~ ~ ~ function yoni/mind/goto/guxi_0

execute @s[scores={mind=1}] ~ ~ ~ function yoni/guxi/mind/th1
execute @s[scores={mind=2}] ~ ~ ~ function yoni/guxi/mind/th2
