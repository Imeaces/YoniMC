
#execute @s[scores={guxi:resistance=0}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:resistance=1}] ~ ~ ~ scoreboard players add @s guxi:energy -1024
execute @s[scores={guxi:resistance=2}] ~ ~ ~ scoreboard players add @s guxi:energy -2233
execute @s[scores={guxi:resistance=3}] ~ ~ ~ scoreboard players add @s guxi:energy -3172
execute @s[scores={guxi:resistance=4..}] ~ ~ ~ scoreboard players add @s guxi:energy -7777
