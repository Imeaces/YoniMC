#yoni/guxi/energy/core

execute @s[scores={guxi:energy=..0}] ~ ~ ~ function yoni/guxi/energy/drop
execute @s[scores={guxi:energy=360001..}] ~ ~ ~ function yoni/guxi/energy/raise

execute @s[scores={guxi:energies=100001..}] ~ ~ ~ scoreboard players set @s guxi:energies 100000
execute @s[scores={guxi:energies=..-1}] ~ ~ ~ scoreboard players set @s guxi:energies 0
