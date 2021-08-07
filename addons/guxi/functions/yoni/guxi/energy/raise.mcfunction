#yoni/guxi/energy/raise

# energy operation
scoreboard objectives add energyp dummy
# variable store
scoreboard objectives add var dummy

scoreboard players add @s energies -360000
scoreboard players add @s energy 1
scoreboard players operation @s energyp = @s energies
scoreboard players operation @s energies %= num360000 var
scoreboard players operation @s energyp /= num360000 var
scoreboard players operation @s energy += @s energyp
