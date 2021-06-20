#yoni/guxi/operation/main

# some objcetives will be added in running

#initial
scoreboard players add @s guxi-opt 0
scoreboard players add @s guxi-op 0

#main
##exec

execute @s[scores={guxi-op=0}] ~ ~ ~ function yoni/guxi/operation/0/base
execute @s[scores={guxi-op=1}] ~ ~ ~ function yoni/guxi/operation/1/base
execute @s[scores={guxi-op=11}] ~ ~ ~ function yoni/guxi/operation/1/1
execute @s[scores={guxi-op=12}] ~ ~ ~ function yoni/guxi/operation/1/2
execute @s[scores={guxi-op=2}] ~ ~ ~ function yoni/guxi/operation/2/base
execute @s[scores={guxi-op=20}] ~ ~ ~ function yoni/guxi/operation/2/0
execute @s[scores={guxi-op=21}] ~ ~ ~ function yoni/guxi/operation/2/1
execute @s[scores={guxi-op=22}] ~ ~ ~ function yoni/guxi/operation/2/2
execute @s[scores={guxi-op=23}] ~ ~ ~ function yoni/guxi/operation/2/3
execute @s[scores={guxi-op=24}] ~ ~ ~ function yoni/guxi/operation/2/4
