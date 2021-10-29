#yoni/guxi/energy/raise
scoreboard objectives add guxi:var001 dummy

scoreboard players operation @s guxi:energy -= energy guxi:value
scoreboard players add @s guxi:energies 1
scoreboard players operation @s guxi:var001 = @s guxi:energy
scoreboard players operation @s guxi:energy %= energy guxi:value
scoreboard players operation @s guxi:var001 /= energy guxi:value
scoreboard players operation @s guxi:energies += @s guxi:var001
