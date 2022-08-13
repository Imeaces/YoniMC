#yoni/guxi/action_cure_health

execute @s[scores={guxi:v102=1..}] ~ ~ ~ scoreboard players add @s guxi:ti0 -1

execute @s[scores={guxi:ti0=..-1}] ~ ~ ~ scoreboard players operation @s guxi:ti0 = @s guxi:v102

execute @s[scores={guxi:v102=1..,guxi:ti0=0}] ~ ~ ~ function yoni/guxi/action_cure_health


execute @s[scores={guxi:ti0=..0}] ~ ~ ~ scoreboard players reset @s guxi:ti0
execute @s[scores={guxi:v102=..0}] ~ ~ ~ scoreboard players reset @s guxi:ti0
