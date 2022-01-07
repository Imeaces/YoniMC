#yoni/thought/guxi/as_player
scoreboard objectives add ths:enter_item dummy
scoreboard players add @s ths:enter_item 0
execute @s[scores={ths:enter_item=!-1,ths:enter_item=!1}] ~ ~ ~ scoreboard players set @s ths:enter_item -1
execute @s[scores={ths:enter_item=1}] ~ ~ ~ replaceitem entity @s slot.hotbar 8 keep yoni:th_enter 1 0 {"minecraft:item_lock":{"mode":"lock_in_inventory"},"minecraft:keep_on_death":{}}
scoreboard objectives add ths:focus dummy
scoreboard players add @s ths:focus 0

# 设{menuWait:[ths:enter]}的默认值，并限定范围到5-60
scoreboard objectives add ths:enter dummy
scoreboard players add @s ths:enter 0
execute @s[scores={ths:enter=!5..60}] ~ ~ ~ scoreboard players set @s ths:enter 20


execute @s[scores={thought=0}] ~ ~ ~ function yoni/thought/guxi/th0
execute @s[scores={thought=1..10}] ~ ~ ~ function yoni/thought/guxi/th1_10

tag @s remove th:enter
