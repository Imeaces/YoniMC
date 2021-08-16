#yoni/guxi/regenerate
scoreboard players add @s energy -100000

# guxi regenerate
# count time
scoreboard players add @s guxi:regenerate 1
execute @s[scores={guxi:regenerate=1}] ~ ~ ~ effect @s regeneration 5 0 true
execute @s[scores={guxi:regenerate=81}] ~ ~ ~ scoreboard players set @s guxi:regenerate 0
