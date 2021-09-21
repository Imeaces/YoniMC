#yoni/species/guxi/energy/raise

scoreboard objectives add yoni:var00001 dummy

scoreboard players operation @s guxi:energy -= num100000000 const
scoreboard players add @s guxi:energies 1
scoreboard players operation @s yoni:var00001 = @s guxi:energy
scoreboard players operation @s guxi:energy %= num100000000 const
scoreboard players operation @s yoni:var00001 /= num100000000 const
scoreboard players operation @s guxi:energies += @s yoni:var00001
