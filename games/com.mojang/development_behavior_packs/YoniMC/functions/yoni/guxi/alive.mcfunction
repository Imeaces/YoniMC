#yoni/guxi/alive

# 检测是否受到伤害
scoreboard players operation @s guxi:health -= @s health
## 有伤害，转为能量损失
execute @s[scores={guxi:health=1..}] ~ ~ ~ function yoni/guxi/alive/damage
scoreboard players operation @s guxi:health = @s health
# 能量循环
function yoni/guxi/energy/cycle
# 生命状态
function yoni/guxi/status
# 能量附加
function yoni/guxi/effect
