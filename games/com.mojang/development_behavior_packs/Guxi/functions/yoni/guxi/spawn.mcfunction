#yoni/guxi/spawn
function yoni/values/default/guxi

scoreboard players set @s guxi 1

event entity @s yoni:being_guxi

scoreboard objectives add guxi:energies dummy
scoreboard objectives add guxi:energy dummy

scoreboard objectives add guxi:effective dummy
scoreboard objectives add guxi:vision dummy
scoreboard objectives add guxi:strength dummy
scoreboard objectives add guxi:mining dummy
scoreboard objectives add guxi:resistance dummy

scoreboard players operation @s guxi:energies = energies guxi:value
scoreboard players operation @s guxi:energy = energy guxi:value

scoreboard objectives add guxi:health dummy

scoreboard players operation @s guxi:health = @s health
