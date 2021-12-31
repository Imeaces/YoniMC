#yoni/guxi/spawn
# 赋值
function yoni/values/default/guxi
# 标记为已初始化
scoreboard players set @s guxi 1
# 实体初始化
event entity @s yoni:being_guxi
# 为咕西充能
scoreboard objectives add guxi:energies dummy
scoreboard objectives add guxi:energy dummy
scoreboard players operation @s guxi:energies = energies guxi:value
scoreboard players operation @s guxi:energy = energy guxi:value
# 让咕西有生命
scoreboard objectives add guxi:effective dummy
scoreboard objectives add guxi:strength dummy
scoreboard objectives add guxi:mining dummy
scoreboard objectives add guxi:resistance dummy
# 增加变量用于记录血量，用于转换为能量
scoreboard objectives add guxi:health dummy
## 赋初始值，防止有生命就死了
scoreboard players operation @s guxi:health = @s health

# 复合实体能量标记
scoreboard objectives add guxi:resi2 dummy
# 生命状态记录
scoreboard objectives add guxi:status dummy
## 设为初始化值
scoreboard players set @s guxi:status -1
