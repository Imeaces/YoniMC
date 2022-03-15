#yoni/guxi/dead
## 意外死亡
execute @s[scores={alive=-1,yoni:guxi=2,alive=-1}] ~ ~ ~ scoreboard players set @s yoni:guxi 101
## 思维随能量消散
execute @s[scores={alive=-1,yoni:guxi=10,alive=-1}] ~ ~ ~ scoreboard players set @s yoni:guxi 102

# 如果物理死亡则爆炸
execute @s[scores={yoni:guxi=101}] ~ ~ ~ summon guxi:explode ~ ~ ~ explode_true_small
