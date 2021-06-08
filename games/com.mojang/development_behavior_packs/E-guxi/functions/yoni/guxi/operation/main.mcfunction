#yoni/guxi/operation/main

# 初始化
scoreboard players add @s guxi-opt 0

# 主面板
## 抬头计时
execute @s[scores={guxi-op=0},rx=-89] ~ ~ ~ scoreboard players add @s guxi-opt 1

## 文字提示
execute @s[scores={guxi-op=0,guxi-opt=10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["1.5"]}]}
execute @s[scores={guxi-op=0,guxi-opt=20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["1.0"]}]}
execute @s[scores={guxi-op=0,guxi-opt=30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["0.5"]}]}

## 取消抬头时重置计时
execute @s[scores={guxi-op=0,guxi-opt=1..},rxm=-88] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"中止"}]}
execute @s[scores={guxi-op=0,guxi-opt=1..},rxm=-88] ~ ~ ~ scoreboard players set @s guxi-opt 0

## 两秒后打开
execute @s[scores={guxi-op=0,guxi-opt=40..}] ~ ~ ~ scoreboard players set @s guxi-op 1

# 执行功能
execute @s[scores={guxi-op=1}] ~ ~ ~ function yoni/guxi/operation/1
execute @s[scores={guxi-op=2}] ~ ~ ~ function yoni/guxi/operation/2
