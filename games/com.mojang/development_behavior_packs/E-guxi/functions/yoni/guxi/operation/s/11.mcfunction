#yoni/guxi/operation/s/11

# 返回上级（当前为第一层级，返回上级代表退出）
# if(player.rotate(x)>=-85){return()}
execute @s[rx=-85] ~ ~ ~ function yoni/guxi/operation/1/r

# 显示面板
function yoni/guxi/operation/1/d

# 根据角度转到下一面板
execute @s[rxm=-60] ~ ~ ~ function yoni/guxi/operation/1/j
