#yoni/guxi/spawn

# 为咕西充能
scoreboard players operation @s guxi:energies = spawn_energies guxi:value
scoreboard players operation @s guxi:energy = spawn_energy guxi:value

# 让咕西有生命
## 初始化值/重置值
scoreboard players set @s guxi:effective -1
scoreboard players set @s guxi:strength -1
scoreboard players set @s guxi:mining -1
scoreboard players set @s guxi:resistance -1
scoreboard players set @s guxi:status -1
