#yoni/guxi/exec

# 操作行为管理
# function yoni/guxi/operation/main
# 制作中

# 能量管理
function yoni/guxi/energy/main
## 如果能量状态为2
execute @s[scores={guxi-energys=2}] ~ ~ ~ scoreboard players set @s guxi 2
## 如果能量状态为3
execute @s[scores={guxi-energys=3}] ~ ~ ~ scoreboard players set @s guxi 3
