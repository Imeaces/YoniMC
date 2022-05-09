#yoni/guxi/resistance/being
execute @s[scores={guxi:resistance=0}] ~ ~ ~ event entity @s guxi:detach_resistance
execute @s[scores={guxi:resistance=2}] ~ ~ ~ event entity @s guxi:attach_resistance
tellraw @s {"rawtext":[{"translate":"护盾等级：%%s","with":{"rawtext":[{"score":{"objective":"guxi:resistance","name":"@s"}}]}}]}
