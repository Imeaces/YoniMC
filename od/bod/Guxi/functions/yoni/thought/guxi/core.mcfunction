#yoni/thought/guxi/core

# setup default
function yoni/thought/guxi/ths

# add enter slot
execute @s[scores={ths:enter=1}] ~ ~ ~ replaceitem entity @s slot.hotbar 8 keep yoni:th_enter 1 0 {"minecraft:item_lock":{"mode":"lock_in_slot"},"minecraft:keep_on_death":{}}

# link
execute @s[scores={thought=-21..0}] ~ ~ ~ function yoni/thought/guxi/th_0
execute @s[scores={thought=1..100}] ~ ~ ~ function yoni/thought/guxi/th_1
