#yoni/guxi/operation/2/0


# 0.5秒计时
execute @s[scores={guxi-opt=10..}] ~ ~ ~ scoreboard players set @s guxi-opt 0
scoreboard players add @s guxi-opt 1


# 退出面板
execute @s[scores={guxi-opt=1..},rx=-85] ~ ~ ~ scoreboard players set @s guxi-op 4

# 显示面板
function yoni/guxi/operation/2/0d

# 根据角度转到下一面板

execute @s[rxm=-60] ~ ~ ~ function yoni/guxi/operation/2/0j
