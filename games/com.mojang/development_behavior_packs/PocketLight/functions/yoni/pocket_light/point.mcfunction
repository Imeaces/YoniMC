
# 初始化记分项
scoreboard players add @s plight:flag0 0
scoreboard players add @s plight:flag1 0
scoreboard players add @s plight:flag2 0


#say 查找光请求
##say 如果有请求
execute @s ~ ~-10000 ~ scoreboard players operation @s plight:flag1 -= @e[r=1,c=1,scores={plight=1..}] plight
execute @s[scores={plight:flag1=!0}] ~ ~-10000 ~ function yoni/pocket_light/update_block
##say 同步光度
scoreboard players set @s plight:flag1 0
execute @s ~ ~-10000 ~ scoreboard players operation @s plight:flag1 = @e[r=1,c=1,scores={plight=1..}] plight
    
#say # 当 plight:flag1 = 0
execute @s[scores={plight:flag1=0}] ~ ~ ~ scoreboard players add @s plight:flag2 1
execute @s[scores={plight:flag2=1..}] ~ ~ ~ function yoni/pocket_light/remove_point

