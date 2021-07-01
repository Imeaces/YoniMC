#yoni/guxi/op/gear/ry.base

# 设置初始角度
## 新增记分项
scoreboard objectives add v.ry dummy

## let var.ry.base = player.rotate(y)
function yoni/status/rotate_y
scoreboard players operation @s ry.base = @s rotate_y
