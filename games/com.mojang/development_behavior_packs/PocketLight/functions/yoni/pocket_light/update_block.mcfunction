say 光更新
# 当 更新光块

## 如果 flag0 = 0 且 位置 有 光块
### 设置 flag0 = -1
## 否则
### 设置 flag0 = 1
execute @s[scores={plight:flag0=0}] ~ ~ ~ function yoni/pocket_light/check_location

## 如果 flag0 = 1
execute @s[scores={plight:flag0=1}] ~ ~-10000 ~ execute @e[r=1,c=1,scores={plight=1..}] ~ ~ ~ function yoni/pocket_light/setblock
