#energy/drop
scoreboard objectives add guxi:var001 dummy

scoreboard players operation @s guxi:var001 = @s guxi:energy
scoreboard players operation @s guxi:energy %= energy guxi:value
scoreboard players operation @s guxi:var001 /= energy guxi:value
scoreboard players operation @s guxi:energies += @s guxi:var001
scoreboard players operation @s guxi:energy += energy guxi:value
scoreboard players remove @s guxi:energies 1
