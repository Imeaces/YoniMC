#operation/rotate_y_offset_init

# 一个用于计算横轴视角偏移的函数
# 需要参数op:ory0，存储初始角度
# 返回参数op:ory1，执行者与初始角度的偏差
## 该函数用于初始化计算并设置op:ory0

scoreboard objectives add op:ry_start dummy

function entity/position/init
function entity/position/getRotateY

scoreboard players operation @s op:ry_start = @s pos:rotate_y
