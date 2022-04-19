# 计算有关血量的值，并根据结果执行能量损失以及血量回复
## v100 上次执行时，与基础生命值的差距
## v101 与上次执行时相比，损失的生命值
## v102 与基础生命值的差距
## v103 上次执行时的生命值

## 根据上次执行留下的数据，以及固定的value，计算损失血量与血量差距
## 建议不用管逻辑，照着输出结果用就行
scoreboard players operation @s guxi:v101 = @s guxi:v103
scoreboard players operation @s guxi:v101 -= @s HEALTH
scoreboard players operation @s guxi:v102 = health guxi:value
scoreboard players operation @s guxi:v102 -= @s HEALTH

## 当检测到血量损失，根据损失失去能量
execute @s[scores={guxi:v101=1..}] ~ ~ ~ function guxi/action_lost_health
## 添加护盾
execute @s[scores={guxi:v100=..0,guxi:v101=1..}] ~ ~ ~ function guxi/event_first_lost_health
## 满足一定条件时，恢复血量
execute @s[scores={guxi:status=..3}] ~ ~ ~ function guxi/play_cure_health

## 保存数据用于下次执行计算
scoreboard players operation @s guxi:v103 = @s HEALTH
scoreboard players operation @s guxi:v100 = @s guxi:v102

# 能量附加
function guxi/play_effect

scoreboard players add @s guxi:memory 1

