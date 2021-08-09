#yoni/guxi/alive

execute @s[scores={guxi:health=!0}] ~ ~ ~ scoreboard players operation @s guxi:health -= @s health
execute @s[scores={guxi:health=1..}] ~ ~ ~ function yoni/guxi/damage
scoreboard players operation @s guxi:health = @s health

execute @s[scores={energys=1}] ~ ~ ~ function yoni/guxi/paralysis
execute @s[scores={energys=2..}] ~ ~ ~ function yoni/guxi/stable

execute @s[scores={health=1..19,energys=1..}] ~ ~ ~ function yoni/guxi/regenerate
execute @s[scores={health=20..59,energys=2..}] ~ ~ ~ function yoni/guxi/repair
