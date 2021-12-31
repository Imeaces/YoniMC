#yoni/thought/guxi/th_1_10

# 计时 tmp_194689138604

# 计算偏移量
function operation/rotate_y_offset

# 穷举10种可能
execute @s[rx=-31,scores={op:ry_offset=..-31,tmp_161644884634=!1}] ~ ~ ~ scoreboard players set @s tmp_161644884634 1
execute @s[rx=-31,scores={op:ry_offset=-30..30,tmp_161644884634=!2}] ~ ~ ~ scoreboard players set @s tmp_161644884634 2
execute @s[rx=-31,scores={op:ry_offset=31..,tmp_161644884634=!3}] ~ ~ ~ scoreboard players set @s tmp_161644884634 3

execute @s[rxm=-30,rx=30,scores={op:ry_offset=..-31,tmp_161644884634=!4}] ~ ~ ~ scoreboard players set @s tmp_161644884634 4
execute @s[rxm=-30,rx=30,scores={op:ry_offset=-30..30,tmp_161644884634=!5}] ~ ~ ~ scoreboard players set @s tmp_161644884634 5
execute @s[rxm=-30,rx=30,scores={op:ry_offset=31..,tmp_161644884634=!6}] ~ ~ ~ scoreboard players set @s tmp_161644884634 6

execute @s[rxm=31,scores={op:ry_offset=..-31,tmp_161644884634=!7}] ~ ~ ~ scoreboard players set @s tmp_161644884634 7
execute @s[rxm=31,scores={op:ry_offset=-30..30,tmp_161644884634=!8}] ~ ~ ~ scoreboard players set @s tmp_161644884634 8
execute @s[rxm=31,scores={op:ry_offset=31..,tmp_161644884634=!9}] ~ ~ ~ scoreboard players set @s tmp_161644884634 9
## 第十种？初始化的就是

execute @s[scores={thought=1}] ~ ~ ~ titleraw @s actionbar {"rawtext":[{"with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]},"translate":"§r§o§7%%2|%%1§r\n"}]}
