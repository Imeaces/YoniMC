#yoni/guxi/energy/pool

# 能量充满
execute @s[scores={guxi-energy=3600000..}] ~ ~ ~ function yoni/guxi/energy/fill

# 能量用尽
execute @s[scores={guxi-energy=..-1}] ~ ~ ~ function yoni/guxi/energy/empty

# 能量池已空
execute @s[scores={guxi-energyf=..-1}] ~ ~ ~ scoreboard players set @s guxi-energys -1
