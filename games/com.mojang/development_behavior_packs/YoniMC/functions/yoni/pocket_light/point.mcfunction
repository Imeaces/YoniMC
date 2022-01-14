
#  当 plight 更新
#    更新光块
scoreboard players operation @a plight:flag1 -= @s plight
execute @s[scores={plight:flag1=!0}] ~ ~ ~ function yoni/pocket_light/update_block
scoreboard players operation @a plight:flag1 = @s plight
    
#  当 没有 玩家
#    设置 plight = 0
scoreboard players set @s plight:flag2 -2
execute @s ~ ~-10000 ~ execute @e[r=1,c=1,scores={plight=1..}] ~ ~10000 ~ execute @e[r=1,c=1,scores={plight:flag2=-2}] ~ ~ ~ scoreboard players set @s plight:flag2 1
execute @s[scores={plight:flag2=-2}] ~ ~10000 ~ scoreboard players set @s plight 0

#  当 光度 0
#    移除 自己
execute @s[scores={plight=..0}] ~ ~ ~ function yoni/pocket_light/remove_point
