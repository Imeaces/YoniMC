#yoni/thought/guxi/th_0_t1
scoreboard players set @s thought 10

# 计时
scoreboard objectives add tmp_194689138604 dummy
scoreboard players set @s tmp_194689138604 0

# 初始化相对角度
function operation/rotate_y_offset_init
