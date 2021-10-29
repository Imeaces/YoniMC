#yoni/guxi/alive

# damage
scoreboard players operation @s guxi:health -= @s health
execute @s[scores={guxi:health=1..}] ~ ~ ~ function yoni/guxi/alive/damage
scoreboard players operation @s guxi:health = @s health

# effect
function yoni/guxi/effect

function yoni/guxi/energy

execute @s[scores={guxi:energies=0}] ~ ~ ~ function yoni/guxi/dying
