#yoni/guxi/alive

# energy operation
scoreboard objectives add energyp dummy
# energy random drop
scoreboard players random @s energyp 0 16
execute @s ~ ~ ~ scoreboard players operation @s energies -= @s energys

execute @s[scores={energys=1}] ~ ~ ~ effect @s slowness 1 2 true
execute @s[scores={energys=1}] ~ ~ ~ effect @s hunger 1 255 true

execute @s[scores={energys=2..}] ~ ~ ~ effect @s saturation 1 255 true
