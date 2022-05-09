scoreboard objectives add guxi:op200 dummy
scoreboard objectives add guxi:op201 dummy

scoreboard players operation @s guxi:op200 = @s guxi:energy
scoreboard players operation @s guxi:op200 /= energy_stack guxi:value
scoreboard players operation @s guxi:op201 = @s guxi:energy
scoreboard players operation @s guxi:op201 %= energy_stack guxi:value
execute @s[scores={guxi:op200=!0}] ~ ~ ~ scoreboard players operation @s guxi:energies += @s guxi:op200
execute @s[scores={guxi:op200=!0}] ~ ~ ~ scoreboard players operation @s guxi:energy = @s guxi:op201

execute @s[scores={guxi:op201=..-1}] ~ ~ ~ scoreboard players remove @s guxi:energies 1
execute @s[scores={guxi:op201=..-1}] ~ ~ ~ scoreboard players operation @s guxi:energy += energy_stack guxi:value

execute @e[type=guxi:energy,r=7] ~ ~ ~ scoreboard players add @e[family=guxi,family=energy_entity,r=7,c=1] guxi:energy 5000000
execute @e[type=guxi:energy,r=7] ~ ~ ~ function suicide
