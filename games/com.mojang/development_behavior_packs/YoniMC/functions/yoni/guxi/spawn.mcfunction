#yoni/guxi/spawn
# 标记为已初始化
scoreboard players set @s yoni:guxi 2

# 为咕西充能
scoreboard players operation @s guxi:energies = energies guxi:value
scoreboard players operation @s guxi:energy = energy guxi:value
# 让咕西有生命
## 赋初始值，防止有生命就死了
scoreboard players operation @s guxi:health = @s health

# 初始化值/重置值
scoreboard players set @s guxi:effective -1
scoreboard players set @s guxi:strength -1
scoreboard players set @s guxi:mining -1
scoreboard players set @s guxi:resistance -1
scoreboard players set @s guxi:status -1
