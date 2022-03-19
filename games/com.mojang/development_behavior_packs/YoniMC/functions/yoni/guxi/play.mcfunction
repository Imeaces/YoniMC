#yoni/guxi/play

# 增加标识记分项
scoreboard objectives add yoni:guxi dummy
# 初始化标识
scoreboard players add @s yoni:guxi 0
# 当标识不为0，即物种已push时，开始运行play_behaviour
execute @s[scores={yoni:guxi=!0}] ~ ~ ~ function yoni/guxi/play_behaviour
