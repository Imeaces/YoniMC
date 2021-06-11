#yoni/guxi/status/main

execute @s[scores={guxi-attack=1..4}] ~ ~ ~ function yoni/guxi/action/attack
execute @s[scores={guxi-attack=5..}] ~ ~ ~ function yoni/guxi/action/dig
execute @s[scores={guxi-attack=1..}] ~ ~ ~ scoreboard players add @s guxi-attack -1

execute @s[scores={guxi-jumping=1}] ~ ~ ~ scoreboard players add @s guxi-energy -50

execute @s[scores={guxi-hot=2}] ~ ~ ~ scoreboard players add @s guxi-energy 700
execute @s[scores={guxi-hot=1}] ~ ~ ~ scoreboard players add @s guxi-energy 200
execute @s[scores={guxi-hot=2}] ~ ~ ~ fill ~ ~ ~ ~ ~ ~ air 0 replace fire -1

execute @s[scores={guxi-moving=1}] ~ ~ ~ scoreboard players add @s guxi-energy -20

execute @s[scores={guxi-lighting=2}] ~ ~ ~ scoreboard players add @s guxi-energy 5
