#yoni/guxi/operation/s/10

# 在检测到低头时开始处理
# if(player.rotate(x)<=-84){state(11)}
execute @s[rxm=-84] ~ ~ ~ scoreboard players set @s guxi-op 11

# 显示面板
# display
function yoni/guxi/operation/1/d

# 也就是说，你一直抬头是没办法退出菜单的
