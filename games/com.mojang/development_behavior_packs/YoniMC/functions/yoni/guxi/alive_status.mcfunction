scoreboard objectives add guxi:order dummy
scoreboard objectives add guxi:resistance dummy

# 能量附加的状态
## 能量恢复活跃
execute @s [scores={guxi:order=..0,guxi:sEnergy=!4}] ~ ~ ~ scoreboard players set @s guxi:order 1
## 能量瘫痪
execute @s [scores={guxi:order=!0,guxi:sEnergy=4}] ~ ~ ~ scoreboard players set @s guxi:order 0
## 主动能量附加
### 力量
### strength ~` strength[0,4]
### ? effective !~ "l +& -++ [2,4]
#### 能量恢复活跃
execute @s[scores={guxi:strength=..0,guxi:order=1..}] ~ ~ ~ scoreboard players set @s guxi:strength 1
#### 能量活跃提高
execute @s[scores={guxi:strength=2,guxi:order=..1}] ~ ~ ~ scoreboard players set @s guxi:order 2
execute @s[scores={guxi:strength=3,guxi:order=..2}] ~ ~ ~ scoreboard players set @s guxi:order 3
execute @s[scores={guxi:strength=4,guxi:order=..3}] ~ ~ ~ scoreboard players set @s guxi:order 4
### 采集
### mining ~` mining[0,2]
### ? effective !~ "l
#### 能量发散
execute @s[scores={guxi:mining=2..,guxi:resistance=..0}] ~ ~ ~ scoreboard players set @s guxi:resistance 1
#### 能量恢复活跃
execute @s[scores={guxi:mining=..0,guxi:order=1..}] ~ ~ ~ scoreboard players set @s guxi:mining 1
#### 能量活跃提高
execute @s[scores={guxi:mining=2,guxi:order=..2}] ~ ~ ~ scoreboard players set @s guxi:order 3
### 附加系统维持
### resistance ~` resistance[0,3] -++ [2,4]
#### 能量活跃提高
execute @s[scores={guxi:resistance=1,guxi:order=..1}] ~ ~ ~ scoreboard players set @s guxi:order 2
execute @s[scores={guxi:resistance=2,guxi:order=..2}] ~ ~ ~ scoreboard players set @s guxi:order 3
execute @s[scores={guxi:resistance=3,guxi:order=..3}] ~ ~ ~ scoreboard players set @s guxi:order 4


execute @s[scores={guxi:sEnergy=4..}] ~ ~ ~ scoreboard players set @s guxi:order 0
execute @s[scores={guxi:sEnergy=..3}] ~ ~ ~ scoreboard players set @s guxi:order 1

# 能量秩序混乱
# 无法调动能量附加序列
execute @s [scores={guxi:order=..0,guxi:strength=!0}] ~ ~ ~ scoreboard players set @s guxi:strength 0
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