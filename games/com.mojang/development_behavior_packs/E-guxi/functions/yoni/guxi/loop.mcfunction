#yoni/guxi/loop

# 执行
scoreboard objectives add guxi dummy "GUXI"
scoreboard players add @s guxi 0
execute @s[scores={guxi=0}] ~ ~ ~ function yoni/guxi/init
execute @s[scores={guxi=!0}] ~ ~ ~ function yoni/guxi/exec
