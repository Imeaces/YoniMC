
# 建个记分项，然后赋值
scoreboard objectives add spec:random dummy
scoreboard players random @s spec:random 0 1

# 抱歉哦，现在只能随机咕西，因为咕西还没测试完
execute @s[scores={spec:random=!2695}] ~ ~ ~ scoreboard players set @s species 2695
