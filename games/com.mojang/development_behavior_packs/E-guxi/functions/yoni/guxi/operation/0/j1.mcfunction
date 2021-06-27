#yoni/guxi/operation/0/j1

# 清空计时器
scoreboard players set @s guxi-opt 0

# 打开2号面板
scoreboard players set @s guxi-op 10

# 获取当前ry旋转角并赋值
function yoni/guxi/operation/ryx

# 设置
scoreboard objectives add guxi-opr dummy
scoreboard players add @s guxi-opr 0
