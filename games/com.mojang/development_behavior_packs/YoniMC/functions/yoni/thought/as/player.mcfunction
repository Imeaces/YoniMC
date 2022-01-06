#
scoreboard objectives add ths:enter_item dummy
scoreboard players add @s ths:enter_item 0
execute @s[scores={ths:enter_item=!1..2}] ~ ~ ~ scoreboard players set @s ths:enter_item -1

scoreboard objectives add ths:focus dummy
scoreboard players add @s ths:focus 0
