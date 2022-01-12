
# 自由实体部分
## 第一部分：某些特殊效果
execute @s[name="Silvigarabis"] ~ ~ ~ scoreboard players set @s species 2695

## 第二部分：随机器
execute @s[scores={species=0}] ~ ~ ~ function species/random
