#yoni/guxi/resistance/being
execute @s[scores={guxi:resistance=0}] ~ ~ ~ event entity @s guxi:resistance_0
execute @s[scores={guxi:resistance=1}] ~ ~ ~ event entity @s guxi:resistance_1
execute @s[scores={guxi:resistance=2}] ~ ~ ~ event entity @s guxi:resistance_2
execute @s[scores={guxi:resistance=3}] ~ ~ ~ event entity @s guxi:resistance_3
execute @s[scores={guxi:resistance=4}] ~ ~ ~ event entity @s guxi:resistance_4
tellraw @s {"rawtext":[{"translate":"护盾等级：%%s","with":{"rawtext":[{"score":{"objective":"guxi:resistance","name":"@s"}}]}}]}
