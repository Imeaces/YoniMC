scoreboard objectives add var_0 dummy
scoreboard players set @s var_0 0

# 扩展elytra消耗能量
#var guxi:cre_ely 记录是否打开了鞘翅
scoreboard objectives add arg_0 dummy
scoreboard objectives add arg_1 dummy
execute if score @s guxi:cre_ely matches 2 run scoreboard players set @s arg_0 67064
execute if score @s guxi:cre_ely matches 2 run scoreboard players set @s arg_1 920842
execute if score @s guxi:cre_ely matches 2 run function yonimc/guxi/energy/drop_randomly

#elytra需要修复
function yonimc/guxi/creation/elytra/repair
