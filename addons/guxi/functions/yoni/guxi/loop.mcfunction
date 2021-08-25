#yoni/guxi/loop

execute @s[scores={guxi=0}] ~ ~ ~ function yoni/guxi/light
execute @s[scores={guxi=-1,alive=1}] ~ ~ ~ function yoni/guxi/lively
execute @s[scores={guxi=1}] ~ ~ ~ function yoni/guxi/alive
execute @s[scores={guxi=-2,alive=1}] ~ ~ ~ function yoni/guxi/dying


