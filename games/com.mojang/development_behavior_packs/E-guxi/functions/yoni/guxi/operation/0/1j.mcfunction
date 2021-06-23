#yoni/guxi/operation/0/1j
#op=-3

# 清空计时器
scoreboard players set @s guxi-opt 0

# 打开2号面板
scoreboard players set @s guxi-op 10

# 获取当前ry旋转角并赋值
scoreboard objectives add guxi-ryo dummy
scoreboard objectives add guxi-ryx dummy
function yoni/status/rotate_y
scoreboard players operation @s guxi:ryx = @s rotate_y

# 设置
scoreboard objectives add guxi-opdp dummy
scoreboard players add @s guxi-opdp 0
