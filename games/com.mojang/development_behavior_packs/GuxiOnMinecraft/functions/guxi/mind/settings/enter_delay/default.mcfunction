#yoni/mind/settings/enter_delay/default

# 添加设置项ths:enter，用于指定低头打开面板的超时时间，默认为20（1秒）
scoreboard objectives add ths:enter dummy
scoreboard players add @s ths:enter 0
## 赋默认值
execute @s[scores={ths:enter=..5}] ~ ~ ~ scoreboard players set @s ths:enter 20
