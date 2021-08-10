#yoni/guxi/loop

scoreboard objectives add guxi dummy
scoreboard players add @s guxi 0

execute @s[scores={guxi=1..}] ~ ~ ~ function yoni/guxi/alive

execute @s[scores={guxi=-1,alive=1}] ~ ~ ~ event entity @s guxi:alive

execute @s[scores={guxi=-1,alive=1}] ~ ~ ~ scoreboard players set @s energys -1

function yoni/guxi/energy/core

execute @s[scores={guxi=0,alive=1}] ~ ~ ~ scoreboard players set @s guxi -1

execute @s[scores={guxi=1..,energys=0}] ~ ~ ~ event entity @s guxi:dying
execute @s[scores={guxi=1..,energys=0}] ~ ~ ~ tellraw @s {"rawtext":[{"text":"你消散了"}]}
execute @s[scores={guxi=1..,energys=0}] ~ ~ ~ scoreboard players set @s guxi 0

execute @s[scores={guxi=0}] ~ ~ ~ function yoni/guxi/init

execute @s[scores={guxi=-1,alive=1,health=60,energys=1..}] ~ ~ ~ scoreboard players set @s guxi:health 60
execute @s[scores={guxi=-1,alive=1,health=60,energys=1..}] ~ ~ ~ scoreboard players set @s guxi 1
