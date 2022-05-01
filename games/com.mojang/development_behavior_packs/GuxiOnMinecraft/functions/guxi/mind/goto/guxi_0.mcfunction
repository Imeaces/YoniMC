#yoni/mind/goto/guxi_0


# 将思想跳转到26950
scoreboard players set @s mind:v100 26950

# 初始化一些需要使用的变量，可能用于存储一些东西
scoreboard objectives add th:flag0 dummy
scoreboard players set @s th:flag0 0

scoreboard objectives add th:timer0 dummy
scoreboard players set @s th:timer0 0

# 添加设置项ths:set26950，用于指定默认的展示项目
scoreboard objectives add ths:set26950 dummy
scoreboard players add @s ths:set26950 0
## 赋默认值
execute @s[scores={ths:set26950=0}] ~ ~ ~ scoreboard players set @s ths:set26950 1

# 添加设置项ths:enter
function guxi/mind/settings/enter_delay/default
