
#  当 移除自己
#    如果 flag0 = 1
#      清理 光块
#    kill @s
execute @s[scores={plight:flag0=1}] ~ ~-10000 ~ fill ~ ~ ~ ~ ~ ~ air 0 replace light_block -1
kill @s