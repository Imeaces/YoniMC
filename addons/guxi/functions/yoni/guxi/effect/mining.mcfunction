
#execute @s[scores={guxi:mining=0}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:mining=1}] ~ ~ ~ scoreboard players add @s guxi:energy -50
execute @s[scores={guxi:mining=2..}] ~ ~ ~ scoreboard players add @s guxi:energy -100
