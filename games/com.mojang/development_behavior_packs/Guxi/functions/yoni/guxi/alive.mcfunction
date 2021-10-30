#yoni/guxi/alive

# damage
scoreboard players operation @s guxi:health -= @s health
execute @s[scores={guxi:health=1..}] ~ ~ ~ function yoni/guxi/alive/damage
scoreboard players operation @s guxi:health = @s health

function yoni/guxi/energy

function yoni/guxi/status

function yoni/guxi/effect
