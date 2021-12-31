#mcfunction
# 能量瘫痪
execute @s [scores={guxi:effective=!0,guxi:status=4}] ~ ~ ~ scoreboard players set @s guxi:effective 0
## 无法调动能量附加序列
execute @s [scores={guxi:effective=0,guxi:strength=!0}] ~ ~ ~ scoreboard players set @s guxi:strength 0
execute @s [scores={guxi:effective=0,guxi:mining=!0}] ~ ~ ~ scoreboard players set @s guxi:mining 0
execute @s [scores={guxi:effective=0,guxi:resistance=!0}] ~ ~ ~ scoreboard players set @s guxi:resistance 0

# 能量恢复活跃
execute @s [scores={guxi:effective=0,guxi:status=!4}] ~ ~ ~ scoreboard players set @s guxi:effective 1

#####################
# 主动能量附加
#####################

# strength ~` strength[0,4]
# ? effective !~ "l +& -++ [2,4]
execute @s[scores={guxi:strength=0,guxi:effective=1..}] ~ ~ ~ scoreboard players set @s guxi:strength 1

execute @s[scores={guxi:strength=2,guxi:effective=..1}] ~ ~ ~ scoreboard players set @s guxi:effective 2
execute @s[scores={guxi:strength=3,guxi:effective=..2}] ~ ~ ~ scoreboard players set @s guxi:effective 3
execute @s[scores={guxi:strength=4,guxi:effective=..3}] ~ ~ ~ scoreboard players set @s guxi:effective 4


# mining ~` mining[0,2]
# ? effective !~ "l
execute @s[scores={guxi:mining=2..,guxi:resistance=..0}] ~ ~ ~ scoreboard players set @s guxi:resistance 1

execute @s[scores={guxi:mining=0,guxi:effective=1..}] ~ ~ ~ scoreboard players set @s guxi:mining 1
execute @s[scores={guxi:mining=2,guxi:effective=..2}] ~ ~ ~ scoreboard players set @s guxi:effective 3


# resistance ~` resistance[0,3] -++ [2,4]
execute @s[scores={guxi:resistance=1,guxi:effective=..1}] ~ ~ ~ scoreboard players set @s guxi:effective 2
execute @s[scores={guxi:resistance=2,guxi:effective=..2}] ~ ~ ~ scoreboard players set @s guxi:effective 3
execute @s[scores={guxi:resistance=3,guxi:effective=..3}] ~ ~ ~ scoreboard players set @s guxi:effective 4
