#yoni/guxi/alive

function yoni/guxi/energy/core

scoreboard players operation @s guxi:health -= @s health
execute @s[scores={guxi:health=1..}] ~ ~ ~ function yoni/guxi/damage
scoreboard players operation @s guxi:health = @s health

execute @s[scores={energys=1}] ~ ~ ~ function yoni/guxi/paralysis
execute @s[scores={energys=2..}] ~ ~ ~ function yoni/guxi/stable

execute @s[scores={health=1..19,energys=1..}] ~ ~ ~ function yoni/guxi/regenerate
execute @s[scores={health=20..59,energys=2..}] ~ ~ ~ function yoni/guxi/repair

function yoni/guxi/energy/core

execute @s[scores={energys=0}] ~ ~ ~ scoreboard players set @s guxi 10

execute @s[scores={energys=1,guxi=5}] ~ ~ ~ event entity @s guxi:paralysis
execute @s[scores={energys=1,guxi=5}] ~ ~ ~ scoreboard players set @s guxi 6

execute @s[scores={energys=2..,guxi=6}] ~ ~ ~ event entity @s guxi:alive
execute @s[scores={energys=2..,guxi=6}] ~ ~ ~ scoreboard players set @s guxi 5
