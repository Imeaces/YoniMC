#yoni/guxi/recover
scoreboard players add @s energies -100000

# guxi regenerate
# add an objective to operator
scoreboard objectives add guxi:regenerate dummy
# count time
scoreboard players add @s guxi:regenerate 1
execute @s[scores={guxi:regenerate=1}] ~ ~ ~ effect @s regeneration 5 0 true
execute @s[scores={guxi:regenerate=81}] ~ ~ ~ scoreboard players set @s guxi:regenerate 0
