#yoni/guxi/operation/main

# some objcetives will be added in running

# initial
scoreboard players add @s guxi-opt 0
scoreboard players add @s guxi-op 0

# main
## status bar
execute @s[scores={guxi-display=1,guxi-opt=0,guxi-op=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"能量：%%s, %%s","with":{"rawtext":[{"score":{"objective":"guxi-energy","name":"*"}},{"score":{"objective":"guxi-energyl","name":"*"}}]}}]}

## timer when 抬头
execute @s[scores={guxi-op=0},rx=-85] ~ ~ ~ scoreboard players add @s guxi-opt 1

## 文字提示
execute @s[scores={guxi-op=0,guxi-opt=10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["1.5"]}]}
execute @s[scores={guxi-op=0,guxi-opt=20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["1.0"]}]}
execute @s[scores={guxi-op=0,guxi-opt=30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["0.5"]}]}

## 取消抬头时重置计时
execute @s[scores={guxi-op=0,guxi-opt=1..},rxm=-84] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"中止"}]}
execute @s[scores={guxi-op=0,guxi-opt=1..},rxm=-84] ~ ~ ~ scoreboard players set @s guxi-opt 0

## 两秒后打开
execute @s[scores={guxi-op=0,guxi-opt=40..}] ~ ~ ~ scoreboard players set @s guxi-op 1

# 执行功能
execute @s[scores={guxi-op=1}] ~ ~ ~ function yoni/guxi/operation/1
execute @s[scores={guxi-op=2}] ~ ~ ~ function yoni/guxi/operation/2
execute @s[scores={guxi-op=3}] ~ ~ ~ function yoni/guxi/operation/3
execute @s[scores={guxi-op=4}] ~ ~ ~ function yoni/guxi/operation/4
execute @s[scores={guxi-op=21}] ~ ~ ~ function yoni/guxi/operation/2/1
