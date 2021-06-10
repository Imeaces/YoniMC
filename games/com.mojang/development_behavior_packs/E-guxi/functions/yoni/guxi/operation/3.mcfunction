#yoni/guxi/operation/3

execute @s[scores={guxi-display=0}] ~ ~ ~ scoreboard players set @s guxi-display -1

execute @s[scores={guxi-display=1}] ~ ~ ~ scoreboard players set @s guxi-display 0

execute @s[scores={guxi-display=-1}] ~ ~ ~ scoreboard players set @s guxi-display 1

scoreboard players set @s guxi-op 2
scoreboard players set @s guxi-opt 0
