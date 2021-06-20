#yoni/guxi/operation/main

# some objcetives will be added in running

#initial
scoreboard players add @s guxi-opt 0
scoreboard players add @s guxi-op 0

#main
##exec

execute @s[scores={guxi-op=0}] ~ ~ ~ function yoni/guxi/operation/0/base
execute @s[scores={guxi-op=1}] ~ ~ ~ function yoni/guxi/operation/1/base
