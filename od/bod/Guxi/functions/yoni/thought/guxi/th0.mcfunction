#yoni/thought/guxi/th0

# 显示能量
execute @s[scores={thought=0}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"translate":"§o§7%%2§r§l§f%%1","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}}]}

# 低头后，开始计时，1秒内抬头则进入菜单
## 提示时间
execute @s[scores={thought=-21..0},rxm=85] ~ ~ ~ function yoni/guxi/thought/core/form_1
## 计时
execute @s[scores={thought=-20..0},rxm=85] ~ ~ ~ scoreboard players add @s thought -1
execute @s[scores={thought=-21},rx=84] ~ ~ ~ scoreboard players set @s thought 0
execute @s[scores={thought=-20..-1},rx=84] ~ ~ ~ scoreboard players set @s thought 2695
