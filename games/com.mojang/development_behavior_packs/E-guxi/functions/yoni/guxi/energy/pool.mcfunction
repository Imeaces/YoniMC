#yoni/guxi/energy/pool

# 能量充满
execute @s[scores={guxi-energy=3600001..}] ~ ~ ~ function yoni/guxi/energy/full

# 能量用尽
execute @s[scores={guxi-energy=..0}] ~ ~ ~ function yoni/guxi/energy/empty

# 当能量池l为特定的值
## 大于等于10000
execute @s[scores={guxi-energyl=10001..}] ~ ~ ~ scoreboard players set @s guxi-energy 3600000
execute @s[scores={guxi-energyl=10001..}] ~ ~ ~ scoreboard players set @s guxi-energyl 10000

## 小于等于0
execute @s[scores={guxi-energyl=..-1}] ~ ~ ~ scoreboard players set @s guxi-energyl 0
