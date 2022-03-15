#yoni/guxi/play

# 增加标识记分项
scoreboard objectives add yoni:guxi dummy
# 设置初始标识
scoreboard players add @s yoni:guxi 0
# 当标识不为0，即物种已push时，开始运行loop
execute @s[scores={yoni:guxi=!0}] ~ ~ ~ function yoni/guxi/behaviours
