#yoni/guxi/energy/freed

# 取guxi-energyf绝对值的相反数
## 处理特殊数据
execute @s [scores={guxi-energyf=-2147483648}] ~ ~ ~ scoreboard players add @s guxi-energyf -1
## 设置用于取相反数的变量
scoreboard players set "-1" guxi-energyp -1
## 如果为正数，取相反数
execute @s[scores={guxi-energyp=1..}] ~ ~ ~ scoreboard players operation @s guxi-energyf *= "-1" guxi-energyp

# 初始化变量p
scoreboard players add @s guxi-energyp 0
# 如果f未释放
## 将p等于energy
execute @s[scores={guxi-energyf=..-1}] ~ ~ ~ scoreboard players operation @s guxi-energyp = @s guxi-energy
## 在p中释放f
execute @s[scores={guxi-energyf=..-1}] ~ ~ ~ scoreboard players operation @s guxi-energyp += @s guxi-energyf
### 如果已经抵消
execute @s[scores={guxi-energyp=0..}] ~ ~ ~ scoreboard players set @s guxi-energyf 0
execute @s[scores={guxi-energyp=0..}] ~ ~ ~ scoreboard players operation @s guxi-energy = @s guxi-energyp
### 如果p不足以抵消f释放
#### 设置状态为5
execute @s[scores={guxi-energyp=..-1}] ~ ~ ~ scoreboard players set @s guxi-energys 5
#### 从能量池l抽取1
execute @s[scores={guxi-energys=5}] ~ ~ ~ scoreboard players add @s guxi-energyl -1
#### 添加到操作变量p
execute @s[scores={guxi-energys=5}] ~ ~ ~ scoreboard players add @s guxi-energy 3600000
#### 重新执行
execute @s[scores={guxi-energys=5}] ~ ~ ~ function yoni/guxi/energy/freed
#### 设置状态默认
execute @s[scores={guxi-energys=5}] ~ ~ ~ scoreboard players set @s guxi-energys 5
