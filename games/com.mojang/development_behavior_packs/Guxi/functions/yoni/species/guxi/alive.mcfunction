#yoni/species/guxi/alive

scoreboard players operation @s guxi:health -= @s health
execute @s[scores={guxi:health=1..}] ~ ~ ~ function yoni/species/guxi/damage
scoreboard players operation @s guxi:health = @s health

function yoni/species/guxi/effects

function yoni/species/guxi/energy/core

execute @s[scores={guxi:energies=0}] ~ ~ ~ function yoni/species/guxi/dying
