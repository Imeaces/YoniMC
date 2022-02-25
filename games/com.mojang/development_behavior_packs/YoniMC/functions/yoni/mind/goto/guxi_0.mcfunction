#yoni/guxi/mind/goto/t1

# 将思想跳转到26950
scoreboard players set @s mind 26950

# 初始化一些需要使用的变量，可能用于存储一些东西
scoreboard objectives add th:flag0 dummy
scoreboard players set @s th:flag0 0

scoreboard objectives add th:timer0 dummy
scoreboard players set @s th:timer0 0

# 添加设置项
scoreboard objectives add ths:gxds dummy
scoreboard players add @s ths:gxds 0
## 赋默认值
execute @s[scores={ths:gxds=0}] ~ ~ ~ scoreboard players set @s ths:gxds 1

# 添加设置项
scoreboard objectives add ths:enter dummy
scoreboard players add @s ths:enter 0
## 赋默认值
execute @s[scores={ths:enter=..5}] ~ ~ ~ scoreboard players set @s ths:enter 20
