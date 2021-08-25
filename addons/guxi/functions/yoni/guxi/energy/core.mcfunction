#yoni/guxi/energy/core

execute @s[scores={guxi:energy=..0}] ~ ~ ~ function yoni/guxi/energy/drop
execute @s[scores={guxi:energy=360001..}] ~ ~ ~ function yoni/guxi/energy/raise

scoreboard players set @s[scores={guxi:energies=100001..}] guxi:energies 100000
scoreboard players set @s[scores={guxi:energies=..-1}] guxi:energies 0
