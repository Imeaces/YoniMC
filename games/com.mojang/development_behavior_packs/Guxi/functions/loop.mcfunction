scoreboard players add guxi dummy GUXI
scoreboard players add guxi 0
execute @s[scores={guxi=0,alive=1}] ~ ~ ~ function spawn
execute @s[scores={guxi=1,alive=1}] ~ ~ ~ function alive
execute @s[scores={guxi=1,alive=-1}] ~ ~ ~ function dead
