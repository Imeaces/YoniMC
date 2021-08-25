#yoni/guxi/lively
scoreboard players set @s guxi 1

event entity @s guxi:alive

scoreboard objectives add guxi:health dummy

scoreboard players operation @s guxi:health = @s health

scoreboard objectives add guxi:energies dummy
scoreboard objectives add guxi:energy dummy

scoreboard players set @s guxi:energies 100000
scoreboard players set @s guxi:energy 360000
