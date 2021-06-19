#yoni/guxi/operation/main

# some objcetives will be added in running

#initial
scoreboard players add @s guxi-opt 0
scoreboard players add @s guxi-op 0

#main
##exec

execute @s[scores={guxi-op=1}] ~ ~ ~ function yoni/guxi/operation/1
execute @s[scores={guxi-op=2}] ~ ~ ~ function yoni/guxi/operation/2
execute @s[scores={guxi-op=3}] ~ ~ ~ function yoni/guxi/operation/3
execute @s[scores={guxi-op=4}] ~ ~ ~ function yoni/guxi/operation/4
execute @s[scores={guxi-op=21}] ~ ~ ~ function yoni/guxi/operation/2/1
