#yoni/thought/guxi/ths

# id thought settings, alias ths

scoreboard objectives add ths:enter dummy
scoreboard players add @s ths:enter 0
execute @s[scores={ths:enter=0}] ~ ~ ~ scoreboard players set @s ths:enter 1

scoreboard objectives add ths:energy dummy
scoreboard players add @s ths:energy 0
execute @s[scores={ths:energy=0}] ~ ~ ~ scoreboard players set @s ths:energy 1
