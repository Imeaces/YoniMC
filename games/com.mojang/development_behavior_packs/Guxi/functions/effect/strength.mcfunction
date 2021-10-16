#effect/strength

#execute @s[scores={guxi:strength=..-2}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:strength=-1}] ~ ~ ~ scoreboard players add @s guxi:energy -7
execute @s[scores={guxi:strength=0}] ~ ~ ~ scoreboard players add @s guxi:energy -31
execute @s[scores={guxi:strength=1}] ~ ~ ~ scoreboard players add @s guxi:energy -72
execute @s[scores={guxi:strength=2}] ~ ~ ~ scoreboard players add @s guxi:energy -91
execute @s[scores={guxi:strength=3}] ~ ~ ~ scoreboard players add @s guxi:energy -8192
execute @s[scores={guxi:strength=4..}] ~ ~ ~ scoreboard players add @s guxi:energy -16384
