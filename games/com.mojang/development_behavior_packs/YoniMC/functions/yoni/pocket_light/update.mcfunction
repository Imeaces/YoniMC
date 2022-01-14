
#   如果 没有 光点
#     创建 光点
scoreboard players set @s plight:flag1 -2
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~-10000 ~ execute @e[r=1,c=1,scores={plight:flag1=-2}] ~ ~10000 ~ scoreboard players set @s plight:flag1 1
execute @s[scores={plight:flag1=-2}] ~ ~10000 ~ function yoni/pocket_light/create_point

# 同步 plight
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 1
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 2
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 3
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 4
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 5
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 6
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 7
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 8
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 9
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 10
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 11
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 12
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 13
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 14
execute @s ~ ~10000 ~ execute @e[r=1,c=1,type=yoni:pocket_light] ~ ~ ~ scoreboard players set @s plight 15
