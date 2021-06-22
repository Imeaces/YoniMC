#yoni/guxi/operation/1/base
#op=10

# 进入时应该是抬头状态
# 在检测到低头时开始显示
execute @s[rxm=-84] ~ ~ ~ scoreboard players set @s guxi-op 11

# 显示面板
function yoni/guxi/operation/1/d
