#yoni/species/spawn

# 当实体没有设置物种时，会执行此函数
# 此函数会根据一定的条件，为实体指定一个物种，并刷新实体物种

## 设定物种

### 第一部分：某些特殊效果
# fixed spawn
function yoni/species/spawn_fixed

### 第二部分：随机器
# spawn randomly
execute @s[scores={species=0}] ~ ~ ~ function yoni/species/spawn_random
