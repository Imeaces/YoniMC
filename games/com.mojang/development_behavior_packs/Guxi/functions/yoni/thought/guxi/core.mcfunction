#yoni/thought/guxi/core

# setup default
function yoni/thought/guxi/ths

# add enter slot
execute @s[scores={ths:enter=1}] ~ ~ ~ replaceitem entity @s slot.hotbar 8 keep yoni:th_enter 1 0 {"minecraft:item_lock":{"mode":"lock_in_slot"}}

# link
execute @s[scores={thought=-21..0}] ~ ~ ~ function yoni/thought/guxi/th0
execute @s[scores={thought=2695}] ~ ~ ~ function yoni/thought/guxi/th2695
