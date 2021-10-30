
# guxi resistance 2
scoreboard players add @s guxi:resi2 0
scoreboard players operation @s guxi:resi2 -= @s guxi:resistance
execute @s[scores={guxi:resi2=!0}] ~ ~ ~ function yoni/guxi/resistance/being
scoreboard players operation @s guxi:resi2 = @s guxi:resistance


# resistance ~` resistance[0,4] -++ [2,4]
#execute @s[scores={guxi:resistance=1}] ~ ~ ~ effect @s resistance 4 0 true
#execute @s[scores={guxi:resistance=2}] ~ ~ ~ effect @s resistance 4 1 true
#execute @s[scores={guxi:resistance=3}] ~ ~ ~ effect @s resistance 4 2 true
#execute @s[scores={guxi:resistance=4}] ~ ~ ~ effect @s resistance 4 3 true

