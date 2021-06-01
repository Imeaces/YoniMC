#yoni/guxi/operation/main

# 初始化
scoreboard players add @s e92ac130 0

# 主面板
## 抬头计时
execute @s[scores={e92ac130=0},rx=-89] ~ ~ ~ scoreboard players add @s 292361b0 1
## 文字提示
execute @s[scores={e92ac130=0,292361b0=10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["1.5"]}]}
execute @s[scores={e92ac130=0,292361b0=20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["1.0"]}]}
execute @s[scores={e92ac130=0,292361b0=30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["0.5"]}]}
## 取消抬头时重置计时
execute @s[scores={e92ac130=0,292361b0=1..},rxm=-88] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"中止"}]}
execute @s[scores={e92ac130=0,292361b0=1..},rxm=-88] ~ ~ ~ scoreboard players set @s 292361b0 0
## 两秒后打开
scoreboard players set @s[scores={e92ac130=0,292361b0=40}] e92ac130 1
scoreboard players set @s[scores={e92ac130=0,292361b0=40}] 292361b0 0
## 执行1号面板
execute @s[scores={e92ac130=1}] ~ ~ ~ function yoni/guxi/operation/1
