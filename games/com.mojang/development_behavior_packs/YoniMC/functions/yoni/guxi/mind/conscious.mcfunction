scoreboard objectives add mind dummy
scoreboard players add @s mind 0

execute @s[scores={mind=0}] ~ ~ ~ function yoni/guxi/mind/init

execute @s[scores={mind=1}] ~ ~ ~ function yoni/guxi/mind/th0
execute @s[scores={mind=2}] ~ ~ ~ function yoni/guxi/mind/th1
