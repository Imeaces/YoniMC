#yoni/thought/guxi/th_1_10

# 计时 thought:timer0

# 计算偏移量
function operation/rotate_y_offset

# 穷举10种可能
execute @s[rx=-31,scores={op:ry_offset=..-31,thought=!1}] ~ ~ ~ scoreboard players set @s thought 1
execute @s[rx=-31,scores={op:ry_offset=-30..30,thought=!2}] ~ ~ ~ scoreboard players set @s thought 2
execute @s[rx=-31,scores={op:ry_offset=31..,thought=!3}] ~ ~ ~ scoreboard players set @s thought 3

execute @s[rxm=-30,rx=30,scores={op:ry_offset=..-31,thought=!4}] ~ ~ ~ scoreboard players set @s thought 4
execute @s[rxm=-30,rx=30,scores={op:ry_offset=-30..30,thought=!5}] ~ ~ ~ scoreboard players set @s thought 5
execute @s[rxm=-30,rx=30,scores={op:ry_offset=31..,thought=!6}] ~ ~ ~ scoreboard players set @s thought 6

execute @s[rxm=31,scores={op:ry_offset=..-31,thought=!7}] ~ ~ ~ scoreboard players set @s thought 7
## thought=10 为初始位置
execute @s[rxm=31,scores={op:ry_offset=-30..30,thought=!8,thought=!10}] ~ ~ ~ scoreboard players set @s thought 8
execute @s[rxm=31,scores={op:ry_offset=31..,thought=!9}] ~ ~ ~ scoreboard players set @s thought 9
## 第十种？初始化的就是
# 修正偏移中心(因为还没有这么多选项)
execute @s[scores={op:ry_offset=!-30..30}] ~ ~ ~ function operation/rotate_y_offset_init

#execute @s[scores={ths:focus=!0,thought=10}] ~ ~ ~ execute @s[scores={}] ~ ~ ~ 
# 显示
execute @s[scores={thought=10}] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"§r§o§7%%s|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r[%%s]  [%%s]  [%%s]\n\n§r[%%s]  [%%s]  [%%s]\n\n§r[%%s]  [%%s]  [%%s]","with":{"rawtext":[{"translate":""},{"translate":"做法"},{"translate":""},{"translate":""},{"translate":"能量附加"},{"translate":""},{"translate":""},{"translate":"####"},{"translate":""}]}}]}
execute @s[scores={thought=2}] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"§r§o§7%%s|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r[%%s]  [%%s]  [%%s]\n\n§r[%%s]  [%%s]  [%%s]\n\n§r[%%s]  [%%s]  [%%s]","with":{"rawtext":[{"translate":""},{"translate":"做法"},{"translate":""},{"translate":""},{"translate":"能量附加"},{"translate":""},{"translate":""},{"translate":"放弃"},{"translate":""}]}}]}
execute @s[scores={thought=5}] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"§r§o§7%%s|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r[%%s]  [%%s]  [%%s]\n\n§r[%%s]  [%%s]  [%%s]\n\n§r[%%s]  [%%s]  [%%s]","with":{"rawtext":[{"translate":""},{"translate":"做法"},{"translate":""},{"translate":""},{"translate":"能量附加"},{"translate":""},{"translate":""},{"translate":"放弃"},{"translate":""}]}}]}
execute @s[scores={thought=8}] ~ ~ ~ tellraw @s {"rawtext":[{"translate":"§r§o§7%%s|%%s","with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]}},{"translate":"\n\n§r[%%s]  [%%s]  [%%s]\n\n§r[%%s]  [%%s]  [%%s]\n\n§r[%%s]  [%%s]  [%%s]","with":{"rawtext":[{"translate":""},{"translate":"做法"},{"translate":""},{"translate":""},{"translate":"能量附加"},{"translate":""},{"translate":""},{"translate":"放弃"},{"translate":""}]}}]}

