#yoni/guxi/effect/energy
execute @s[scores={guxi:effective=..-2}] ~ ~ ~ scoreboard players add @s guxi:energy -2
execute @s[scores={guxi:effective=-1}] ~ ~ ~ scoreboard players add @s guxi:energy -7
execute @s[scores={guxi:effective=0}] ~ ~ ~ scoreboard players add @s guxi:energy -16
execute @s[scores={guxi:effective=1}] ~ ~ ~ scoreboard players add @s guxi:energy -50
execute @s[scores={guxi:effective=2}] ~ ~ ~ scoreboard players add @s guxi:energy -100
execute @s[scores={guxi:effective=3}] ~ ~ ~ scoreboard players add @s guxi:energy -192
execute @s[scores={guxi:effective=4..}] ~ ~ ~ scoreboard players add @s guxi:energy -233


#execute @s[scores={guxi:mining=0}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:mining=1}] ~ ~ ~ scoreboard players add @s guxi:energy -50
execute @s[scores={guxi:mining=2..}] ~ ~ ~ scoreboard players add @s guxi:energy -100


#execute @s[scores={guxi:resistance=0}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:resistance=1}] ~ ~ ~ scoreboard players add @s guxi:energy -1024
execute @s[scores={guxi:resistance=2}] ~ ~ ~ scoreboard players add @s guxi:energy -2233
execute @s[scores={guxi:resistance=3}] ~ ~ ~ scoreboard players add @s guxi:energy -3172
execute @s[scores={guxi:resistance=4..}] ~ ~ ~ scoreboard players add @s guxi:energy -7777


#execute @s[scores={guxi:strength=..-2}] ~ ~ ~ scoreboard players add @s guxi:energy 0
execute @s[scores={guxi:strength=-1}] ~ ~ ~ scoreboard players add @s guxi:energy -7
execute @s[scores={guxi:strength=0}] ~ ~ ~ scoreboard players add @s guxi:energy -31
execute @s[scores={guxi:strength=1}] ~ ~ ~ scoreboard players add @s guxi:energy -72
execute @s[scores={guxi:strength=2}] ~ ~ ~ scoreboard players add @s guxi:energy -91
execute @s[scores={guxi:strength=3}] ~ ~ ~ scoreboard players add @s guxi:energy -8192
execute @s[scores={guxi:strength=4..}] ~ ~ ~ scoreboard players add @s guxi:energy -16384
