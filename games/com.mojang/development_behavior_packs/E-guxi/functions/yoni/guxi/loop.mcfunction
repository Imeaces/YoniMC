#yoni/guxi/loop

# 添加函数执行标签
tag @a remove self
tag @e remove self
tag @s add self

# 记分板 检测是否为咕西
execute @s[tag=!exec:guxi-obj] ~ ~ ~ tag @s add exec:guxi-obj
execute @s[scores={guxi=-1..}] ~ ~ ~ tag @s remove exec:guxi-obj
execute @s[tag=exec:guxi-obj] ~ ~ ~ function yoni/guxi/objectives
execute @s[family=guxi] ~ ~ ~ scoreboard players set @s guxi 1
execute @s[family=!guxi] ~ ~ ~ scoreboard players set @s guxi -1
execute @s[tag=exec:guxi-obj] ~ ~ ~ tag @s remove exec:guxi-obj
execute @s[scores={guxi=-1},tag=self] ~ ~ ~ tag @s remove self

# 检测存活状态
## 设置标记为活着的为1
scoreboard players set @s[scores={guxi-ailve=1}] guxi-ailve 0
## 设置活着的自己为0
scoreboard players set @e[tag=self] guxi-dead 1

# 执行
execute @s[scores={guxi=1}] ~ ~ ~ function yoni/guxi/exec
## 如果状态为-1


execute @s[tag=self] ~ ~ ~ tag @s remove self
