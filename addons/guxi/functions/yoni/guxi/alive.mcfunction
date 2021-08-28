#yoni/guxi/alive

scoreboard players add @s guxi:async -1
execute @s[scores={guxi:async=..-1}] ~ ~ ~ scoreboard players operation @s guxi:async = yoni_var_guxi_async const

scoreboard players operation @s guxi:health -= @s health
execute @s[scores={guxi:health=1..}] ~ ~ ~ function yoni/guxi/damage
scoreboard players operation @s guxi:health = @s health

execute @s[scores={guxi:async=0}] ~ ~ ~ function yoni/guxi/effects

function yoni/guxi/energy/core

execute @s[scores={guxi:energies=0}] ~ ~ ~ scoreboard players set @s guxi -2
execute @s[scores={alive=-1}] ~ ~ ~ scoreboard players set @s guxi -2

titleraw @s actionbar {"rawtext":[{"with":{"rawtext":[{"score":{"objective":"guxi:energies","name":"*"}},{"score":{"objective":"guxi:energy","name":"*"}}]},"translate":"%%2, %%1"}]}
