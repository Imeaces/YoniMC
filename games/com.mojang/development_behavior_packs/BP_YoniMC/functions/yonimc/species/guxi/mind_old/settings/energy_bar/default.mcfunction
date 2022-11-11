# 添加设置项ths:set26950，用于指定默认的展示项目



# v105 energy_bar是否展示详细信息
scoreboard objectives add mind:v105 dummy
scoreboard players add @s mind:v105 0
## 赋默认值
execute if entity @s[scores={mind:v105=0}] run scoreboard players set @s mind:v105 1

# v105100 energy_bar是否在情况下都展示
# 0 不
# 1 是
scoreboard objectives add mind:v105100 dummy
scoreboard players add @s mind:v105100 0
