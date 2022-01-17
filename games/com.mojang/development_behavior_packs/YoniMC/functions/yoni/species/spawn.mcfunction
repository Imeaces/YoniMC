
# 自由实体部分（怎么感觉不太对）
## 第一部分：某些特殊效果
function yoni/species/spawn_fixed

## 第二部分：随机器
execute @s[scores={species=0}] ~ ~ ~ function yoni/species/spawn_random

# 然后更新种族
function yoni/species/flush
