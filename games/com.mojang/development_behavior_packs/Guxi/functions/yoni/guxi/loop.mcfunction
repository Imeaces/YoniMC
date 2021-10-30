#yoni/guxi/loop
scoreboard objectives add guxi dummy GUXI
scoreboard players add @s guxi 0

function yoni/thought/guxi

execute @s[scores={guxi=0,alive=1}] ~ ~ ~ function yoni/guxi/spawn
execute @s[scores={guxi=1,alive=1}] ~ ~ ~ function yoni/guxi/alive
execute @s[scores={guxi=1,alive=-1}] ~ ~ ~ function yoni/guxi/dead
