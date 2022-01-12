#yoni/guxi/dead
# 保存死亡标志，在重生后处理是否要恢复
scoreboard players set @s guxi 4
# 如果物理死亡则爆炸
execute @s[scores={yoni:guxi=-1}] ~ ~ ~ summon guxi:explode ~ ~ ~ explode_true_small
