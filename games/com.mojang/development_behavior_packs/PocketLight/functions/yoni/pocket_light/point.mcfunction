
# 查找光请求
execute @s ~ ~-10000 ~ scoreboard players operation @s plight:flag1 -= @e[r=1,c=1,scores={plight=1..}] plight
execute @s[scores={plight:flag1=!0}] ~ ~-10000 ~ function yoni/pocket_light/update_block
scoreboard players set @s plight:flag1 0
execute @s ~ ~-10000 ~ scoreboard players operation @s plight:flag1 = @e[r=1,c=1,scores={plight=1..}] plight
    
#  当 plight:flag1 = 0
execute @s[scores={plight:flag1=0}] ~ ~ ~ function yoni/pocket_light/remove_point