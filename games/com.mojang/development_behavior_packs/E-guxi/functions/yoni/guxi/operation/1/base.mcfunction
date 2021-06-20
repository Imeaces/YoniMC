#yoni/guxi/operation/1/base

scoreboard players add @s guxi-opt 1

# text
execute @s[scores={guxi-opt=10}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["1.5"]}]}
execute @s[scores={guxi-opt=20}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["1.0"]}]}
execute @s[scores={guxi-opt=30}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"将会在%%s秒后打开操作中心","with":["0.5"]}]}

execute @s[rxm=-84] ~ ~ ~ scoreboard players set @s guxi-op 11

## 两秒后打开
execute @s[scores={guxi-opt=40..}] ~ ~ ~ scoreboard players set @s guxi-op 12
