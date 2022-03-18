#yoni/guxi/species/push

# 咕西物种 push
# 增加记分项
scoreboard objectives add yoni:guxi dummy
## 标记为初始化完毕
scoreboard players add @s yoni:guxi 0
execute @s[scores={yoni:guxi=0}] ~ ~ ~ scoreboard players set @s yoni:guxi 1

# 触发实体事件，添加组件
event entity @s yoni:being_guxi

#yoni/guxi/spawn
# 设置某些变量
function yoni/guxi/values/default

# 用于能量的记分项
scoreboard objectives add guxi:energies dummy
scoreboard objectives add guxi:energy dummy

# 用于能量效果的记分项
scoreboard objectives add guxi:effective dummy
scoreboard objectives add guxi:strength dummy
scoreboard objectives add guxi:mining dummy
scoreboard objectives add guxi:resistance dummy

# 存储上一个能量盾状态的记分项
scoreboard objectives add guxi:resi2 dummy
# 能量状态记录
scoreboard objectives add guxi:sEnergy dummy
