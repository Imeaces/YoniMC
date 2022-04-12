#yoni/guxi/event_spawn

# 标记为实体生成初始化完毕[2]
scoreboard players set @s yoni:guxi 2

# 为咕西充能
scoreboard players operation @s guxi:energies = spawn_energies guxi:value
scoreboard players operation @s guxi:energy = spawn_energy guxi:value

# 让咕西有生命
## 初始化值/重置值
scoreboard players set @s guxi:mining 0
scoreboard players set @s guxi:resistance 0
scoreboard players set @s guxi:resi2 -1
scoreboard players set @s guxi:sEnergy -1
