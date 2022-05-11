#yoni/guxi/resistance/being
execute @s[scores={guxi:resistance=..1}] ~ ~ ~ event entity @s guxi:detach_resistance
execute @s[scores={guxi:resistance=2..}] ~ ~ ~ event entity @s guxi:attach_resistance
titleraw @s actionbar {"rawtext":[{"translate":"由能量构建的防御：%%s","with":{"rawtext":[{"score":{"objective":"guxi:resistance","name":"@s"}}]}}]}

execute @s[scores={guxi:resistance=3..}] ~ ~ ~ scoreboard players set @s guxi:resistance 2
execute @s[scores={guxi:resistance=..-1}] ~ ~ ~ scoreboard players set @s guxi:resistance 0
