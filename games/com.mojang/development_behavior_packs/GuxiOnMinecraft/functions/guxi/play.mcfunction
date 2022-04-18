#yoni/guxi/play

# 增加标识记分项
scoreboard objectives add yoni:guxi dummy
# 初始化标识
scoreboard players add @s yoni:guxi 0

# 当标识不为0，即物种已push时，开始运行play_behaviour
execute @s[scores={yoni:guxi=!0}] ~ ~ ~ function guxi/play_behaviour

execute @s[scores={yoni:guxi=0}] ~ ~ ~ function guxi/species/push
execute @s[scores={yoni:guxi=0}] ~ ~ ~ scoreboard players set @s yoni:guxi 1

# 菜单
execute @s[scores={yoni:guxi=!0}] ~ ~ ~ function guxi/play_mind

tag @s[tag=!test:health] add test:health
