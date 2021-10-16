#alive

scoreboard players operation @s guxi:health -= @s health
execute @s[scores={guxi:health=1..}] ~ ~ ~ function damage
scoreboard players operation @s guxi:health = @s health

function effects

function energy/core

execute @s[scores={guxi:energies=0}] ~ ~ ~ function dying
