#yoni/guxi/energy/cycle
# 根据能量消耗及补充对能量进行管理
## 消耗过大
execute @s[scores={guxi:energy=..0}] ~ ~ ~ function guxi/energy/drop
## 补充完成
execute @s[scores={guxi:energy=100000001..}] ~ ~ ~ function guxi/energy/raise
# 到达极值
## 最大
execute @s[scores={guxi:energies=361..}] ~ ~ ~ function guxi/energy/full
## 最小
execute @s[scores={guxi:energies=..-1}] ~ ~ ~ function guxi/energy/empty
