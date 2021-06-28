#yoni/guxi/operation/1/j

# 跳转
execute @s[scores={guxi-ryo=-180..-31}] ~ ~ ~  scoreboard players set @s guxi-op 21
execute @s[scores={guxi-ryo=-30..-11}] ~ ~ ~  scoreboard players set @s guxi-op 22
execute @s[scores={guxi-ryo=11..30}] ~ ~ ~  scoreboard players set @s guxi-op 23
execute @s[scores={guxi-ryo=31..180}] ~ ~ ~  scoreboard players set @s guxi-op 24

# 重置计时器
scoreboard players set @s guxi-opt 0

# 设置初始角度
function yoni/guxi/operation/ryx
