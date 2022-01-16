
#say # 如果 位置 有 光块
#say ## 移除光块
fill ~ ~-10000 ~ ~ ~-10000 ~ air 0 replace light_block -1
#say # 放置 光块 亮度 plight
tp @s ~ ~-10000 ~ 0 0 false

execute @s[scores={plight=1}] ~ ~ ~ setblock ~ ~ ~ light_block 1
execute @s[scores={plight=2}] ~ ~ ~ setblock ~ ~ ~ light_block 2
execute @s[scores={plight=3}] ~ ~ ~ setblock ~ ~ ~ light_block 3
execute @s[scores={plight=4}] ~ ~ ~ setblock ~ ~ ~ light_block 4
execute @s[scores={plight=5}] ~ ~ ~ setblock ~ ~ ~ light_block 5
execute @s[scores={plight=6}] ~ ~ ~ setblock ~ ~ ~ light_block 6
execute @s[scores={plight=7}] ~ ~ ~ setblock ~ ~ ~ light_block 7
execute @s[scores={plight=8}] ~ ~ ~ setblock ~ ~ ~ light_block 8
execute @s[scores={plight=9}] ~ ~ ~ setblock ~ ~ ~ light_block 9
execute @s[scores={plight=10}] ~ ~ ~ setblock ~ ~ ~ light_block 10
execute @s[scores={plight=11}] ~ ~ ~ setblock ~ ~ ~ light_block 11
execute @s[scores={plight=12}] ~ ~ ~ setblock ~ ~ ~ light_block 12
execute @s[scores={plight=13}] ~ ~ ~ setblock ~ ~ ~ light_block 13
execute @s[scores={plight=14}] ~ ~ ~ setblock ~ ~ ~ light_block 14
execute @s[scores={plight=15}] ~ ~ ~ setblock ~ ~ ~ light_block 15

tp @s ~ ~10000 ~ 0 0 false
