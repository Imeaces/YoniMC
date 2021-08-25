#yoni/guxi_old/loop

scoreboard objectives add guxi dummy
scoreboard players add @s guxi 0

execute @s[scores={guxi=2..,alive=-1}] ~ ~ ~ scoreboard players set @s guxi -1
execute @s[scores={guxi=12..,alive=1}] ~ ~ ~ scoreboard players set @s guxi 1

execute @s[scores={guxi=11..}] ~ ~ ~ kill @s

execute @s[scores={guxi=10..}] ~ ~ ~ event entity @s guxi:dying
execute @s[scores={guxi=10}] ~ ~ ~ scoreboard players add @s guxi 1

execute @s[scores={guxi=5..9}] ~ ~ ~ function yoni/guxi/alive

execute @s[scores={guxi=4}] ~ ~ ~ scoreboard players operation @s guxi:health = @s health
execute @s[scores={guxi=4}] ~ ~ ~ scoreboard players add @s guxi 1

execute @s[scores={guxi=3}] ~ ~ ~ event entity @s guxi:alive
execute @s[scores={guxi=3}] ~ ~ ~ scoreboard players add @s guxi 1

execute @s[scores={guxi=2}] ~ ~ ~ function yoni/guxi/energy/spawn
execute @s[scores={guxi=2}] ~ ~ ~ scoreboard players add @s guxi 1

execute @s[scores={guxi=1,alive=1}] ~ ~ ~ scoreboard players add @s guxi 1

execute @s[scores={guxi=0}] ~ ~ ~ function yoni/guxi/init
execute @s[scores={guxi=0}] ~ ~ ~ scoreboard players add @s guxi 1

execute @s[scores={guxi=..-1}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"你消散了"}]}
execute @s[scores={guxi=..-1}] ~ ~ ~ scoreboard players set @s guxi 0
