scoreboard objectives add guxi:order dummy
scoreboard objectives add guxi:resistance dummy
scoreboard objectives add guxi:mining dummy

scoreboard players set @s guxi:order 1
scoreboard players add @s guxi:resistance 0
scoreboard players add @s guxi:mining 0

# 计算需要的待用能量等级
scoreboard players operation @s guxi:order += @s guxi:resistance
scoreboard players operation @s guxi:order += @s guxi:mining

# 能量秩序混乱
execute @s[scores={guxi:sEnergy=4..}] ~ ~ ~ scoreboard players set @s guxi:order 0
# 无法调动能量附加序列
execute @s [scores={guxi:order=..0,guxi:mining=!0}] ~ ~ ~ scoreboard players set @s guxi:mining 0
execute @s [scores={guxi:order=..0,guxi:resistance=!0}] ~ ~ ~ scoreboard players set @s guxi:resistance 0

# 电器有待机电流，咕西有待用能量
# 待用能量在不用时会缓慢消耗
# 在特定条件下释放以作出行为
# 以下是准备设置的行为列表，将会在action中实现
## 快速挖掘
## 爆炸攻击
# 未来计划
## 快速下坠时缓冲
## 快速逃离
## 变形