#yoni/mind/settings/enter_delay/default

# 添加设置项ths:enter，用于指定低头打开面板的超时时间，默认为20（1秒）
scoreboard objectives add mind:v106 dummy
scoreboard players add @s mind:v106 0
## 赋默认值
execute if entity @s[scores={mind:v106=..5}] run scoreboard players set @s mind:v106 20

execute if entity @s[scores={mind:v106=1200..}] run scoreboard players set @s mind:v106 20
