#yoni/thought/guxi/ths

# id thought settings, alias ths
scoreboard objectives add ths:enter dummy
scoreboard players add @s ths:enter 0
execute @s[scores={ths:enter=0}] ~ ~ ~ scoreboard players set @s ths:enter 1
