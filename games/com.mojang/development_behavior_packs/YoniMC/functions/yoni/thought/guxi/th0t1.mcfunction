#yoni/thought/guxi/th_0_t1

#goto 10
scoreboard players set @s thought 10

# 计时
scoreboard objectives add thought:timer0 dummy
scoreboard players set @s thought:timer0 0

# 初始化相对角度
function operation/rotate_y_offset_init

