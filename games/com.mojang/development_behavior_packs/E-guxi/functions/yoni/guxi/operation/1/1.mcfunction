#yoni/guxi/operation/1/1
#op=11

# 0.5秒计时
execute @s[scores={guxi-opt=10..}] ~ ~ ~ scoreboard players set @s guxi-opt 0
scoreboard players add @s guxi-opt 1


# 退出面板
execute @s[rx=-85] ~ ~ ~ scoreboard players set @s guxi-op -11

# 显示面板
function yoni/guxi/operation/2/d0

# 根据角度转到下一面板

execute @s[rxm=-60] ~ ~ ~ scoreboard players set @s guxi-op -20
