scoreboard objectives add var_0 dummy
scoreboard players set @s var_0 0

# 扩展elytra消耗能量
#var guxi:cre_ely 记录是否打开了鞘翅
scoreboard objectives add arg_0 dummy
scoreboard objectives add arg_1 dummy
execute if score @s guxi:cre_ely matches 2 run scoreboard players set @s arg_0 120 
execute if score @s guxi:cre_ely matches 2 run scoreboard players set @s arg_1 2400
execute if score @s guxi:cre_ely matches 2 run function yonimc/guxi/energy/drop_randomly

#elytra需要修复
scoreboard players set @s var_0 367
execute if entity @s[scores={guxi:cre_ely=2},hasitem=[{location=slot.armor.chest,item=elytra,data=0}]] run scoreboard players set @s var_0 0
execute if score @s var_0 matches 367 run replaceitem entity @s slot.armor.chest 0 elytra 1 0 {"item_lock":{"mode":"lock_in_slot"},"keep_on_death":{}}
