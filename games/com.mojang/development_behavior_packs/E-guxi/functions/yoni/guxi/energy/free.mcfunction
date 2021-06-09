#yoni/guxi/energy/free

# 如果f未释放
## 将p等于energy
execute @s[scores={guxi-energyf=..-1}] ~ ~ ~ scoreboard players operation @s guxi-energyp = @s guxi-energy

## 在p中释放f
execute @s[scores={guxi-energyf=..-1}] ~ ~ ~ scoreboard players operation @s guxi-energyp += @s guxi-energyf

### 如果已经抵消
execute @s[scores={guxi-energyp=0..}] ~ ~ ~ scoreboard players set @s guxi-energyf 0
execute @s[scores={guxi-energyp=0..}] ~ ~ ~ scoreboard players operation @s guxi-energy = @s guxi-energyp
execute @s[scores={guxi-energyp=0..}] ~ ~ ~ scoreboard players set @s guxi-energyp 0

### 如果p不足以抵消f释放
#### 执行附加命令
execute @s[scores={guxi-energyp=..-1}] ~ ~ ~ function yoni/guxi/energy/free_not_success
