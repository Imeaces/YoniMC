#yoni/guxi/operation/main

# some objcetives will be added in running

#initial
scoreboard players add @s guxi-opt 0
scoreboard players add @s guxi-op 0

#main
##exec

execute @s[scores={guxi-op=-11}] ~ ~ ~ function yoni/guxi/operation/1/c
execute @s[scores={guxi-op=-3}] ~ ~ ~ function yoni/guxi/operation/0/1j
execute @s[scores={guxi-op=-2}] ~ ~ ~ function yoni/guxi/operation/0/j
execute @s[scores={guxi-op=-1}] ~ ~ ~ function yoni/guxi/operation/0/1c

execute @s[scores={guxi-op=0}] ~ ~ ~ function yoni/guxi/operation/0/base

execute @s[scores={guxi-op=1}] ~ ~ ~ function yoni/guxi/operation/0/1
execute @s[scores={guxi-op=10}] ~ ~ ~ function yoni/guxi/operation/1/base
execute @s[scores={guxi-op=11}] ~ ~ ~ function yoni/guxi/operation/0/11

execute @s[scores={guxi-op=21}] ~ ~ ~ function yoni/guxi/operation/21/base
execute @s[scores={guxi-op=11}] ~ ~ ~ function yoni/guxi/operation/22/base
execute @s[scores={guxi-op=11}] ~ ~ ~ function yoni/guxi/operation/23/base
execute @s[scores={guxi-op=11}] ~ ~ ~ function yoni/guxi/operation/24/base
