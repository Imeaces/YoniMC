#yoni/guxi/alive

# 计算有关血量的值，并根据结果执行能量损失以及血量回复
## lastHealth 上次执行时的生命值
## lostHealth 与上次执行时相比，损失的生命值
## disHealth 与基础生命值的差距
## lastDisHealth 上次执行时，与基础生命值的差距

## 根据上次执行留下的数据，以及固定的value，计算损失血量与血量差距
scoreboard players operation @s guxi:lostHealth = @s guxi:lastHealth
scoreboard players operation @s guxi:lostHealth -= @s health
scoreboard players operation @s guxi:disHealth = base_health guxi:value
scoreboard players operation @s guxi:disHealth -= @s health

## 当检测到血量损失，根据损失失去能量
execute @s[scores={guxi:lostHealth=1..}] ~ ~ ~ function yoni/guxi/event_lost_health
## 满足一定条件时，恢复血量
execute @s[scores={guxi:disHealth=1..,guxi:sEnergy=..3}] ~ ~ ~ function yoni/guxi/action_cure_health
execute @s[scores={guxi:disHealth=..0,guxi:cureTimer=-2147483648..}] ~ ~ ~ scoreboard players reset @s guxi:cureTimer

## 保存数据用于下次执行计算
scoreboard players operation @s guxi:lastHealth = @s health
scoreboard players operation @s guxi:lstDisHea = @s guxi:disHealth

# 能量循环
function yoni/guxi/energy/cycle
# 能量附加
function yoni/guxi/effect
