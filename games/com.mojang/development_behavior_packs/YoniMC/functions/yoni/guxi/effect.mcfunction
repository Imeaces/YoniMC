#yoni/guxi/effect
################
# 附加
################

# 深瞳
# :#= {#}
effect @s night_vision 14 0 true


# ~` effective[0,4]
execute @s[scores={guxi:effective=0}] ~ ~ ~ effect @s hunger 4 255 true
execute @s[scores={guxi:effective=0}] ~ ~ ~ effect @s slowness 4 5 true
execute @s[scores={guxi:effective=1..}] ~ ~ ~ effect @s saturation 4 255 true
## 能量
execute @s[scores={guxi:effective=0..1}] ~ ~ ~ scoreboard players add @s guxi:energy -16
execute @s[scores={guxi:effective=2}] ~ ~ ~ scoreboard players add @s guxi:energy -31
execute @s[scores={guxi:effective=3}] ~ ~ ~ scoreboard players add @s guxi:energy -60
execute @s[scores={guxi:effective=4}] ~ ~ ~ scoreboard players add @s guxi:energy -125


# strength ~` strength[0,4]
# ? effective !~ "l +& -++ [2,4]
execute @s[scores={guxi:strength=0}] ~ ~ ~ effect @s weakness 4 255 true
#execute @s[scores={guxi:strength=1}] ~ ~ ~ (+0)
execute @s[scores={guxi:strength=2}] ~ ~ ~ effect @s strength 4 2 true
execute @s[scores={guxi:strength=3}] ~ ~ ~ effect @s strength 4 3 true
execute @s[scores={guxi:strength=4}] ~ ~ ~ effect @s strength 4 4 true
## 能量
#execute @s[scores={guxi:strength=0..1}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:strength=2}] ~ ~ ~ scoreboard players add @s guxi:energy -93
execute @s[scores={guxi:strength=3}] ~ ~ ~ scoreboard players add @s guxi:energy -139
execute @s[scores={guxi:strength=4}] ~ ~ ~ scoreboard players add @s guxi:energy -216


# mining ~` mining[0,4]
# ? effective !~ "l
execute @s[scores={guxi:mining=0}] ~ ~ ~ effect @s mining_fatigue 4 4 true
execute @s[scores={guxi:mining=1}] ~ ~ ~ effect @s mining_fatigue 4 2 true
execute @s[scores={guxi:mining=2}] ~ ~ ~ effect @s haste 4 0 true
## 能量
#execute @s[scores={guxi:mining=0..1}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:mining=2}] ~ ~ ~ scoreboard players add @s guxi:energy -50

# undefined
# absorption

# 能量附加:防护
## I 类 { 不可用 }
# resistance ~` resistance[0,4] -++ [2,4]
#execute @s[scores={guxi:resistance=1}] ~ ~ ~ effect @s resistance 4 0 true
#execute @s[scores={guxi:resistance=2}] ~ ~ ~ effect @s resistance 4 1 true
#execute @s[scores={guxi:resistance=3}] ~ ~ ~ effect @s resistance 4 2 true
#execute @s[scores={guxi:resistance=4}] ~ ~ ~ effect @s resistance 4 3 true
## II类
### 标志检测
scoreboard players add @s guxi:resi2 0
scoreboard players operation @s guxi:resi2 -= @s guxi:resistance
### 切换
execute @s[scores={guxi:resi2=!0}] ~ ~ ~ function yoni/guxi/resistance/being
### 同步
scoreboard players operation @s guxi:resi2 = @s guxi:resistance
## 能量
#execute @s[scores={guxi:resistance=0}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:resistance=1}] ~ ~ ~ scoreboard players add @s guxi:energy -49
execute @s[scores={guxi:resistance=2}] ~ ~ ~ scoreboard players add @s guxi:energy -290
execute @s[scores={guxi:resistance=3}] ~ ~ ~ scoreboard players add @s guxi:energy -918
execute @s[scores={guxi:resistance=4}] ~ ~ ~ scoreboard players add @s guxi:energy -2819
