#operation/rotate_y_offset_init

# 一个用于计算横轴视角偏移的函数
# 需要参数op:ory0，存储初始角度
# 返回参数op:ory1，执行者与初始角度的偏差
## 该函数用于初始化计算并设置op:ory0

scoreboard objectives add op:ory0 dummy
scoreboard objectives add op:ory1 dummy

function yonimc/species/guxi/mind_old/entity/position/init
function yonimc/species/guxi/mind_old/entity/position/getRotateY

scoreboard players operation @s op:ory0 = @s pos:rotateY
