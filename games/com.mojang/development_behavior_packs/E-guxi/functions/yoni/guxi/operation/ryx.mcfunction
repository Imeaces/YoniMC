#yoni/guxi/operation/ryx

# 设置初始角度
## 新增记分项
scoreboard objectives add guxi-ryo dummy
scoreboard objectives add guxi-ryx dummy

## let var.guxi-ryx = player.rotate(y)
function yoni/status/rotate_y
scoreboard players operation @s guxi-ryx = @s rotate_y
