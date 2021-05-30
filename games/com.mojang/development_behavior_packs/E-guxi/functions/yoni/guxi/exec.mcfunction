#yoni/guxi/exec

# 操作行为管理
function yoni/guxi/operation/main
# 能量管理
function yoni/guxi/energy/main
## 如果能量状态为-1
execute @s[scores={guxi-energys=-1}] ~ ~ ~ scoreboard players set @s guxi -1
