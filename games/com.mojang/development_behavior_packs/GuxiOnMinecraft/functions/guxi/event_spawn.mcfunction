scoreboard objectives add guxi:value dummy
scoreboard players set energy_stack guxi:value 10000000
scoreboard players set health guxi:value 60

scoreboard players set para_energy guxi:value 10

scoreboard players set spawn_energy guxi:value 100
scoreboard players set spawn_memory guxi:value 1000

# 基础
scoreboard objectives add guxi:energies dummy
scoreboard objectives add guxi:energy dummy
scoreboard objectives add guxi:memory dummy
# 功能
scoreboard objectives add guxi:mining dummy
scoreboard objectives add guxi:force dummy
scoreboard objectives add guxi:resistance dummy
# 状态 可能没用
scoreboard objectives add guxi:order dummy
scoreboard objectives add guxi:status dummy
scoreboard objectives add guxi:pool dummy
# 运算
scoreboard objectives add guxi:op0 dummy
scoreboard objectives add guxi:ti0 dummy
scoreboard objectives add guxi:v100 dummy
scoreboard objectives add guxi:v101 dummy
scoreboard objectives add guxi:v102 dummy
scoreboard objectives add guxi:v103 dummy

# 值初始化
scoreboard players set @s guxi:mining 0
scoreboard players set @s guxi:resistance 0
scoreboard players set @s guxi:force 0

scoreboard players operation @s guxi:energies = spawn_energy guxi:value
scoreboard players operation @s guxi:energy = energy_stack guxi:value
scoreboard players operation @s guxi:memory = spawn_memory guxi:value

scoreboard players reset @s guxi:op0
scoreboard players reset @s guxi:ti0
scoreboard players reset @s guxi:v0
scoreboard players reset @s guxi:v100
scoreboard players reset @s guxi:v101
scoreboard players reset @s guxi:v102
scoreboard players reset @s guxi:v103

# 增加检测器
tag @s add test:health

