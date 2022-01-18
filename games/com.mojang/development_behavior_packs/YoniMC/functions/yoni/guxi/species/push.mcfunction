scoreboard objectives add yoni:guxi dummy
scoreboard players add @s yoni:guxi 0
execute @s[scores={yoni:guxi=0}] ~ ~ ~ scoreboard players set @s yoni:guxi 1

event entity @s yoni:being_guxi

#yoni/guxi/spawn
# 赋值
function yoni/guxi/values/default

scoreboard objectives add guxi:energies dummy
scoreboard objectives add guxi:energy dummy

scoreboard objectives add guxi:effective dummy
scoreboard objectives add guxi:strength dummy
scoreboard objectives add guxi:mining dummy
scoreboard objectives add guxi:resistance dummy

# 增加变量用于记录血量，用于转换为能量
scoreboard objectives add guxi:health dummy

# 复合实体能量标记
scoreboard objectives add guxi:resi2 dummy
# 生命状态记录
scoreboard objectives add guxi:status dummy
# 标记为已初始化
scoreboard players set @s yoni:guxi 2
