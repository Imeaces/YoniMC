#yoni/guxi/energy/pool

# 能量充满
execute @s[scores={guxi-energy=3600000..}] ~ ~ ~ function yoni/guxi/energy/fill

# 能量用尽
execute @s[scores={guxi-energy=..-1}] ~ ~ ~ function yoni/guxi/energy/empty

