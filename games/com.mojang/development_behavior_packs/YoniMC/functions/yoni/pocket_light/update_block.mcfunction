
#  当 更新光块
#    如果 flag0 = 0 且 位置 有 光块
#      设置 flag0 = -1
#    否则
#      设置 flag0 = 1
execute @s[scores={plight:flag0=0}] ~ ~ ~ function yoni/pocket_light/check_locaton
#    如果 flag0 = 1
execute @s[scores={plight:flag0=1}] ~ ~ ~ function yoni/pocket_light/setblock
