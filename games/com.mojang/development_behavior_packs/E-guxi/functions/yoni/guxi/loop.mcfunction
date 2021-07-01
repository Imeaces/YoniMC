#yoni/guxi/loop

# 添加记分项
scoreboard objectives add guxi dummy "GUXI"

# 初始化
scoreboard players add @s guxi 0
execute @s[scores={guxi=0}] ~ ~ ~ function yoni/guxi/init
execute @s[scores={guxi=0}] ~ ~ ~ scoreboard players set @s guxi 1

# 执行
execute @s[scores={guxi=!0},type=player,family=guxi] ~ ~ ~ function yoni/guxi/main
execute @s[scores={guxi=!0},type=yoni:guxi] ~ ~ ~ function yoni/guxi/alive
