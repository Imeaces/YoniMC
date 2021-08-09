scoreboard objectives add guxi:health dummy

execute @s[scores={guxi:health=!0}] ~ ~ ~ scoreboard players operation @s guxi:health -= @s health
execute @s[scores={guxi:health=!0}] ~ ~ ~ tellraw @s {"rawtext":[{"score":{"objective":"guxi:health","name":"*"}}]}
execute @s[scores={guxi:health=1..}] ~ ~ ~ function yoni/guxi/damage

scoreboard players operation @s guxi:health = @s health
