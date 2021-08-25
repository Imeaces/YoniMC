#yoni/guxi/lively
scoreboard players set @s guxi 1

scoreboard objectives add guxi:health dummy

scoreboard players operation @s guxi:health = @s health
