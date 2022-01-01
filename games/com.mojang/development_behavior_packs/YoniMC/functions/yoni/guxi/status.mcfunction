#yoni/guxi/status
# 能量导致的状态
## 能量 高于 90%
##: 无任何攻击欲望
execute @s[scores={guxi:energies=325..,guxi:status=!0}] ~ ~ ~ scoreboard players set @s guxi:status 0
## 能量 在 60%~90% 之间
##: 不会主动攻击可动物体。
execute @s[scores={guxi:energies=217..324,guxi:status=!1}] ~ ~ ~ scoreboard players set @s guxi:status 1
# 能量 在 20%~60% 之间
## 会主动攻击靠近的物体，吸取能量
##: 随能量降低，恶魔的攻击欲望逐增
execute @s[scores={guxi:energies=73..216,guxi:status=!2}] ~ ~ ~ scoreboard players set @s guxi:status 2
## 能量 在 3%~20% 之间
##: 会主动寻找可吸收的能量，捕猎可吸收能量的物体
execute @s[scores={guxi:energies=11..72,guxi:status=!3}] ~ ~ ~ scoreboard players set @s guxi:status 3
## 能量 低于 3%
##: 失去全部能力
### 状态: 半瘫痪
execute @s[scores={guxi:energies=1..10,guxi:status=!4}] ~ ~ ~ scoreboard players set @s guxi:status 4
## 能量 耗尽
##: 死亡
execute @s[scores={guxi:energies=0,guxi:status=!5}] ~ ~ ~ scoreboard players set @s guxi:status 5

# 能量附加的状态
## 能量恢复活跃
execute @s [scores={guxi:effective=..0,guxi:status=!4}] ~ ~ ~ scoreboard players set @s guxi:effective 1
## 能量瘫痪
execute @s [scores={guxi:effective=!0,guxi:status=4}] ~ ~ ~ scoreboard players set @s guxi:effective 0
### 无法调动能量附加序列
execute @s [scores={guxi:effective=0,guxi:strength=!0}] ~ ~ ~ scoreboard players set @s guxi:strength 0
execute @s [scores={guxi:effective=0,guxi:mining=!0}] ~ ~ ~ scoreboard players set @s guxi:mining 0
execute @s [scores={guxi:effective=0,guxi:resistance=!0}] ~ ~ ~ scoreboard players set @s guxi:resistance 0
## 主动能量附加
### 力量
### strength ~` strength[0,4]
### ? effective !~ "l +& -++ [2,4]
#### 能量恢复活跃
execute @s[scores={guxi:strength=0,guxi:effective=1..}] ~ ~ ~ scoreboard players set @s guxi:strength 1
#### 能量活跃提高
execute @s[scores={guxi:strength=2,guxi:effective=..1}] ~ ~ ~ scoreboard players set @s guxi:effective 2
execute @s[scores={guxi:strength=3,guxi:effective=..2}] ~ ~ ~ scoreboard players set @s guxi:effective 3
execute @s[scores={guxi:strength=4,guxi:effective=..3}] ~ ~ ~ scoreboard players set @s guxi:effective 4
### 采集
### mining ~` mining[0,2]
### ? effective !~ "l
#### 能量发散
execute @s[scores={guxi:mining=2..,guxi:resistance=..0}] ~ ~ ~ scoreboard players set @s guxi:resistance 1
#### 能量恢复活跃
execute @s[scores={guxi:mining=0,guxi:effective=1..}] ~ ~ ~ scoreboard players set @s guxi:mining 1
#### 能量活跃提高
execute @s[scores={guxi:mining=2,guxi:effective=..2}] ~ ~ ~ scoreboard players set @s guxi:effective 3
### 附加系统维持
### resistance ~` resistance[0,3] -++ [2,4]
#### 能量活跃提高
execute @s[scores={guxi:resistance=1,guxi:effective=..1}] ~ ~ ~ scoreboard players set @s guxi:effective 2
execute @s[scores={guxi:resistance=2,guxi:effective=..2}] ~ ~ ~ scoreboard players set @s guxi:effective 3
execute @s[scores={guxi:resistance=3,guxi:effective=..3}] ~ ~ ~ scoreboard players set @s guxi:effective 4
