#yoni/guxi/check_energy_status

# 根据剩余能量的高低，咕西会有不同的行为
## 以下代码用于识别能量状态
execute @s[scores={guxi:energies=325..,guxi:sEnergy=!0}] ~ ~ ~ scoreboard players set @s guxi:sEnergy 0
execute @s[scores={guxi:energies=217..324,guxi:sEnergy=!1}] ~ ~ ~ scoreboard players set @s guxi:sEnergy 1
execute @s[scores={guxi:energies=73..216,guxi:sEnergy=!2}] ~ ~ ~ scoreboard players set @s guxi:sEnergy 2
execute @s[scores={guxi:energies=11..72,guxi:sEnergy=!3}] ~ ~ ~ scoreboard players set @s guxi:sEnergy 3
execute @s[scores={guxi:energies=1..10,guxi:sEnergy=!4}] ~ ~ ~ scoreboard players set @s guxi:sEnergy 4
execute @s[scores={guxi:energies=0,guxi:sEnergy=!5}] ~ ~ ~ scoreboard players set @s guxi:sEnergy 5
