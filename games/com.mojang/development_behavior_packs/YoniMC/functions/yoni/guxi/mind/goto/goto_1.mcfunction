#yoni/mind/goto/guxi_0

# 将思想跳转到主序模式 （翻译：初始化）
scoreboard players set @s mind:v100 1

# 一些需要使用的变量，可能用于存储一些东西
scoreboard objectives add mind:v101 dummy
scoreboard players set @s mind:v101 0

scoreboard objectives add mind:ti100 dummy
scoreboard players set @s mind:ti100 0

# 添加设置项ths:enter
function yoni/guxi/mind/settings/enter_delay/default

# 添加设置项energy_bar
function yoni/guxi/mind/settings/energy_bar/default
