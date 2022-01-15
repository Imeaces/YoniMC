
scoreboard objectives add plight dummy
scoreboard objectives add plight:flag0 dummy
scoreboard objectives add plight:flag1 dummy


# 当 物品 切换
#   更新 plight
function yoni/pocket_light/select/play

# 如果 没有 光点
#   创建 光点
scoreboard players set @s plight:flag0 -2
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~-10000 ~ execute @e[r=1,c=1,scores={plight:flag0=-2}] ~ ~ ~ scoreboard players set @s plight:flag0 1
execute @s[scores={plight:flag0=-2,plight=1..}] ~ ~10000 ~ function yoni/pocket_light/create_point
