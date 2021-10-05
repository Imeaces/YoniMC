#yoni/species/guxi/spawn
# guxi spawn

scoreboard players set @s yoni:species 2695
event entity @s yoni:being_guxi

scoreboard objectives add guxi dummy GUXI
scoreboard players set @s guxi 0

# energy
scoreboard objectives add const dummy
scoreboard players set num100000000 const 100000000

scoreboard objectives add guxi:energies dummy
scoreboard objectives add guxi:energy dummy

# health
scoreboard objectives add guxi:health dummy

# effects
scoreboard objectives add guxi:vision dummy
scoreboard objectives add guxi:strength dummy
scoreboard objectives add guxi:mining dummy
scoreboard objectives add guxi:effective dummy
scoreboard objectives add guxi:resistance dummy

# lively
scoreboard players operation @s guxi:health = @s health

scoreboard players set @s guxi:energies 360
scoreboard players set @s guxi:energy 100000000

scoreboard players set @s guxi:vision 1
scoreboard players set @s guxi:strength 0
scoreboard players set @s guxi:mining 0
scoreboard players set @s guxi:effective 0
scoreboard players set @s guxi:resistance 0
