#yoni/guxi/alive
function yoni/guxi/energy/core

execute @s[scores={guxi:energies=0}] ~ ~ ~ scoreboard players set @s guxi -2
execute @s[scores={alive=-1}] ~ ~ ~ scoreboard players set @s guxi -2

titleraw @s actionbar {"rawtext":[{"with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]},"translate":"%%2, %%1"}]}
