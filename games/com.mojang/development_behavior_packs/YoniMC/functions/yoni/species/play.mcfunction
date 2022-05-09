#yoni/species/play

# 为物种系统创建需要的记分项
scoreboard objectives add species dummy "物种"
## 为自己设置初始状态
scoreboard players add @s species 0
execute @s[scores={alive=1,species=..0}] ~ ~ ~ scoreboard players add @s species -1

# 当实体为活着的时候，初始化实体的物种
# function yoni/species/spawn
execute @s[scores={alive=1,species=..-20}] ~ ~ ~ function yoni/species/spawn
