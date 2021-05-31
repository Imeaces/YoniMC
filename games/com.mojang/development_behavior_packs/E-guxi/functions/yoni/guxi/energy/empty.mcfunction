# 能量用尽

scoreboard players add @s guxi-energyl -1
scoreboard players add @s energy 3600000
execute @s[scores={guxi-energy=..-1}] ~ ~ ~ function yoni/guxi/energy/empty
