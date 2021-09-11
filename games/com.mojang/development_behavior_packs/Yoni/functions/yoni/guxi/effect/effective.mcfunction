#yoni/guxi/effect/effective
execute @s[scores={guxi:effective=..-2}] ~ ~ ~ scoreboard players add @s guxi:energy -2
execute @s[scores={guxi:effective=-1}] ~ ~ ~ scoreboard players add @s guxi:energy -7
execute @s[scores={guxi:effective=0}] ~ ~ ~ scoreboard players add @s guxi:energy -16
execute @s[scores={guxi:effective=1}] ~ ~ ~ scoreboard players add @s guxi:energy -50
execute @s[scores={guxi:effective=2}] ~ ~ ~ scoreboard players add @s guxi:energy -100
execute @s[scores={guxi:effective=3}] ~ ~ ~ scoreboard players add @s guxi:energy -192
execute @s[scores={guxi:effective=4..}] ~ ~ ~ scoreboard players add @s guxi:energy -233
