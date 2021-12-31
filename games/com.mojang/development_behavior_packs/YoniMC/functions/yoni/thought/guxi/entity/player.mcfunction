#yoni/thought/guxi/core

# 设置第九槽位用于发出指令
replaceitem entity @s slot.hotbar 8 keep yoni:th_enter 1 0 {"minecraft:item_lock":{"mode":"lock_in_slot"},"minecraft:keep_on_death":{}}

# 思考
execute @s[scores={thought=0}] ~ ~ ~ function yoni/thought/guxi/th_0
execute @s[scores={thought=1..10}] ~ ~ ~ function yoni/thought/guxi/th_1_10
