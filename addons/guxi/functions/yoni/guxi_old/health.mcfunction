#yoni/guxi_old/health
execute @s[scores={guxi:health=!0}] ~ ~ ~ scoreboard players operation @s guxi:health -= @s health
execute @s[scores={guxi:health=1..}] ~ ~ ~ function yoni/guxi/damage

scoreboard players operation @s guxi:health = @s health
