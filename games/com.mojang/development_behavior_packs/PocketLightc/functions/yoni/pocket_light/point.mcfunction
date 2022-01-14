
#  当 plight 更新
#    更新光块
execute @s ~ ~-10000 ~ scoreboard players operation @s plight:flag1 -= @e[r=1,c=1,scores={plight=1..}] plight
execute @s[scores={plight:flag1=!0}] ~ ~-10000 ~ function yoni/pocket_light/update_block
scoreboard players set @s plight:flag1 0
execute @s ~ ~-10000 ~ scoreboard players operation @s plight:flag1 = @e[r=1,c=1,scores={plight=1..}] plight
    
#  当 没有 玩家
#    设置 plight = 0
#scoreboard players set @s plight:flag2 0
#execute @s ~ ~-10000 ~ execute @e[r=1,c=1,scores={plight=1..}] ~ ~10000 ~ execute @e[r=1,c=1,scores={plight:flag2=0}] ~ ~ ~ scoreboard players set @s plight:flag2 1
execute @s[scores={plight:flag1=0}] ~ ~ ~ function yoni/pocket_light/remove_point
