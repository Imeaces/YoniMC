#yoni/guxi/check_energy_status

#旧行为已经弃用，且新的行为尚未完成
# 为了暂时兼容旧行为，仍使用之前的状态码
scoreboard objectives add guxi:op3 dummy
scoreboard players operation @s guxi:op3 /= para_energy guxi:value
execute @s[scores={guxi:op3=1..,guxi:status=!0}] ~ ~ ~ scoreboard players set @s guxi:status 0
execute @s[scores={guxi:op3=0,guxi:status=!4}] ~ ~ ~ scoreboard players set @s guxi:status 4
execute @s[scores={guxi:energies=0,guxi:status=!5}] ~ ~ ~ scoreboard players set @s guxi:status 5

# 根据剩余能量的高低，咕西会有不同的行为
## 以下代码用于识别能量状态
#execute @s[scores={guxi:energies=325..,guxi:status=!0}] ~ ~ ~ scoreboard players set @s guxi:status 0
#execute @s[scores={guxi:energies=217..324,guxi:status=!1}] ~ ~ ~ scoreboard players set @s guxi:status 1
#execute @s[scores={guxi:energies=73..216,guxi:status=!2}] ~ ~ ~ scoreboard players set @s guxi:status 2
#execute @s[scores={guxi:energies=11..72,guxi:status=!3}] ~ ~ ~ scoreboard players set @s guxi:status 3
#execute @s[scores={guxi:energies=1..10,guxi:status=!4}] ~ ~ ~ scoreboard players set @s guxi:status 4
#execute @s[scores={guxi:energies=0,guxi:status=!5}] ~ ~ ~ scoreboard players set @s guxi:status 5

