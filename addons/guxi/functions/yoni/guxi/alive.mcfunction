#yoni/guxi/alive

# energy operation
scoreboard objectives add energyp dummy

execute @s[scores={energys=1}] ~ ~ ~ function yoni/guxi/paralysis

execute @s[scores={energys=2..}] ~ ~ ~ function yoni/guxi/stable

execute @s[scores={health=1..19}] ~ ~ ~ function yoni/guxi/recover
execute @s[scores={health=20..59,energys=2..}] ~ ~ ~ function yoni/guxi/repair
