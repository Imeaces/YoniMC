#yoni/guxi/effect/energy
execute @s[scores={guxi:effective=0..1}] ~ ~ ~ scoreboard players add @s guxi:energy -16
execute @s[scores={guxi:effective=2}] ~ ~ ~ scoreboard players add @s guxi:energy -31
execute @s[scores={guxi:effective=3}] ~ ~ ~ scoreboard players add @s guxi:energy -60
execute @s[scores={guxi:effective=4}] ~ ~ ~ scoreboard players add @s guxi:energy -125


#execute @s[scores={guxi:mining=0..1}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:mining=2}] ~ ~ ~ scoreboard players add @s guxi:energy -50



#execute @s[scores={guxi:strength=0..1}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:strength=2}] ~ ~ ~ scoreboard players add @s guxi:energy -93
execute @s[scores={guxi:strength=3}] ~ ~ ~ scoreboard players add @s guxi:energy -139
execute @s[scores={guxi:strength=4}] ~ ~ ~ scoreboard players add @s guxi:energy -216
