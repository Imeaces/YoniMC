#yoni/guxi/alive

# energy operation
scoreboard objectives add energyp dummy
# energy random drop
scoreboard players random @s energyp 0 16
execute @s ~ ~ ~ scoreboard players operation @s energies -= @s energys
