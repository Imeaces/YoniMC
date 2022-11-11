tag @e[tag=entity:point] remove entity:point
summon minecraft:bat "Point"
tag @e[r=0,c=-1] add entity:point

# 在执行后，会创建唯一一个拥有标签`entity:point`的实体，可用`@e[tag=entity:point]`选择
# 使用完毕后，记得使用`function entity/removePoint`将其移除