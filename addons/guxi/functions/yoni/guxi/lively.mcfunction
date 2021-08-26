#yoni/guxi/lively
scoreboard players set @s guxi 1

event entity @s guxi:alive

scoreboard players operation @s guxi:health = @s health

scoreboard players set @s guxi:energies 100000
scoreboard players set @s guxi:energy 360000

scoreboard players set @s guxi:vision 1
scoreboard players set @s guxi:strength 0
scoreboard players set @s guxi:mining 0
scoreboard players set @s guxi:effective 0
scoreboard players set @s guxi:resistance 0
