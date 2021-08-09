#yoni/guxi/alive

execute @s[scores={energys=1..}] ~ ~ ~ function yoni/guxi/health

execute @s[scores={energys=1}] ~ ~ ~ function yoni/guxi/paralysis

execute @s[scores={energys=2..}] ~ ~ ~ function yoni/guxi/stable

execute @s[scores={health=1..19,energys=1..}] ~ ~ ~ function yoni/guxi/regenerate
execute @s[scores={health=20..59,energys=2..}] ~ ~ ~ function yoni/guxi/repair
