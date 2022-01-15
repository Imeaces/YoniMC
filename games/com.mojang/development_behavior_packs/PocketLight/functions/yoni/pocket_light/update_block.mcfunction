#say 光更新
# 当 更新光块

## 如果 flag0 = 0 且 位置 有 光块
### 设置 flag0 = -1
## 否则
### 设置 flag0 = 1
execute @s[scores={plight:flag0=0}] ~ ~-10000 ~ function yoni/pocket_light/check_location

## 如果 flag0 = 1
execute @s[scores={plight:flag0=1}] ~ ~-10000 ~ execute @e[r=1,c=1,scores={plight=1..}] ~ ~10000 ~ scoreboard players set @e[r=1,c=1,type=yoni:pocket_light,scores={plight:flag0=1}] plight:flag0 2
execute @s[scores={plight:flag0=2}] ~ ~-10000 ~ scoreboard players operation @s plight = @e[r=1,c=1,scores={plight=1..}] plight
#tellraw @a {"rawtext":[{"score":{"objective":"plight:flag0","name":"@s"}}]}
execute @s[scores={plight:flag0=2}] ~ ~ ~ function yoni/pocket_light/setblock
execute @s[scores={plight:flag0=2}] ~ ~ ~ scoreboard players set @s plight:flag0 1
