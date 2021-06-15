#yoni/guxi/operation/ryo

# 计算与原始角度的差距

function yoni/status/rotate_y
scoreboard players operation @s guxi-ryo = @s rotate_y
scoreboard players operation @s guxi-ryo -= @s guxi-ryx
execute @s[scores={guxi-ryo=180..}] ~ ~ ~ scoreboard players add @s guxi-ryo -360
execute @s[scores={guxi-ryo=..-180}] ~ ~ ~ scoreboard players add @s guxi-ryo 360
