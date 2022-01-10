scoreboard objectives add mind dummy
scoreboard players add @s mind 0

execute @s[scores={mind=0}] ~ ~ ~ function yoni/guxi/mind/goto/t1
execute @s[scores={mind=1}] ~ ~ ~ function yoni/guxi/mind/th1
execute @s[scores={mind=2}] ~ ~ ~ function yoni/guxi/mind/th2
