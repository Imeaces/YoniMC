#yoni/guxi/energy/fill

scoreboard players add @s guxi-energyl 1
scoreboard players add @s guxi-energy -3600000

execute @s[scores={guxi-energy=3600001..}] ~ ~ ~ function yoni/guxi/energy/full
